import multer from "multer";
import { getGCSStorage } from "./gcs-uploader";

/** MULTER IMAGE UPLOADER WITH GOOGLE CLOUD STORAGE **/
const makeUploader = (address: string) => {
  const storage = getGCSStorage(address);
  return multer({ storage: storage as any });
};

export default makeUploader;
