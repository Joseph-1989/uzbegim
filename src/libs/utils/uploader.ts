import path from "path";
import multer from "multer";
import { v4 } from "uuid";

/** MULTER IMAGE UPLOADER **/
function getTargetImageStorage(address: any) {
  console.log("#1", 1);
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
      console.log("#2", 2);
    },

    filename: function (req, file, cb) {
      console.log("#3", 3);
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address: string) => {
  console.log("#4", 4);
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

console.log("#5", 5);

export default makeUploader;

//   destination: function (req, file, cb) {
//     cb(null, "./uploads/products");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const extention = path.parse(file.originalname).ext;
//     const random_name = v4() + extention;
//     cb(null, random_name);
//   },
// });

// export const uploadProductImage = multer({ storage: product_storage });
