import multer from "multer";
import { accountStorage } from "../../../config/cloudinaryAccountStorage.js";

// import path from "path";

// let options = () => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');

//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//       console.log(`🚀 SUFFIC ${uniqueSuffix + "-" + file.originalname}`);
//     },
//   });

//   function fileFilter(req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb("Error pic", false);
//     }
//   }
//   return multer({ storage, fileFilter });
// };
// export const uploadSingleFile = (fieldName, folderName) =>
//   options().single(fieldName);
// export const uploadMixOfFiles = (arrayOfFields, folderName) =>
//   options().fields(arrayOfFields);

export const imageUploader = (
  allowed_file_types,
  max_file_size,
  max_number_of_upload_file,
  error_msg
) => {
  const upload = multer({
    storage: accountStorage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (req.files.length > max_number_of_upload_file) {
        cb(
          new Error(
            `Maximum ${max_number_of_upload_file} files are allowed to upload`
          )
        );
      } else {
        if (allowed_file_types.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(error_msg));
        }
      }
    },
  });
  return upload;
};
