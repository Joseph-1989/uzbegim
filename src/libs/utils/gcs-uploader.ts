import { Storage } from "@google-cloud/storage";
import { Request } from "express";
import path from "path";
import { v4 } from "uuid";

// Initialize Google Cloud Storage client
const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
});

const bucketName = process.env.GCS_BUCKET_NAME || "uzbegim-product-images";
const bucket = storage.bucket(bucketName);

console.log(`GCS Uploader initialized for bucket: ${bucketName}`);

/**
 * Custom Multer Storage Engine for Google Cloud Storage
 * This implements the StorageEngine interface that Multer expects
 */
class GCSStorage {
    private address: string;

    constructor(address: string) {
        this.address = address;
    }

    _handleFile(
        req: Request,
        file: Express.Multer.File,
        cb: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): void {
        const extension = path.parse(file.originalname).ext;
        const filename = v4() + extension;
        const gcsPath = `${this.address}/${filename}`;

        console.log(`Uploading file to GCS: ${gcsPath}`);

        const blob = bucket.file(gcsPath);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on("error", (err) => {
            console.error("GCS Upload Error:", err);
            cb(err);
        });

        blobStream.on("finish", async () => {
            // Make the file publicly accessible
            try {
                await blob.makePublic();

                // Generate the public URL
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsPath}`;

                console.log(`File uploaded successfully: ${publicUrl}`);

                cb(null, {
                    filename: filename,
                    path: publicUrl,
                });
            } catch (err) {
                console.error("Error making file public:", err);
                cb(err);
            }
        });

        file.stream.pipe(blobStream);
    }

    _removeFile(
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null) => void
    ): void {
        // Extract filename from the path
        const filename = file.filename;
        const gcsPath = `${this.address}/${filename}`;

        bucket
            .file(gcsPath)
            .delete()
            .then(() => {
                console.log(`File deleted from GCS: ${gcsPath}`);
                cb(null);
            })
            .catch((err) => {
                console.error("GCS Delete Error:", err);
                cb(err);
            });
    }
}

/**
 * Create a GCS storage instance for a specific address/folder
 * @param address - The folder path within the bucket (e.g., "products", "members")
 */
export function getGCSStorage(address: string) {
    return new GCSStorage(address);
}
