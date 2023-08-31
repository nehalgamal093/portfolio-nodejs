import { imageUploader } from "./fileUpload.js";

export function imagesUpload(req, res, next) {
  const upload = imageUploader(
    ["image/jpeg", "image/jpg", "image/png"],
    25000000,
    10,
    "ONLY .jpeg .jpg or .png format allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      console.log(`errrrr ${err}`);
      console.log(`errrrr ${process.env.CLOUDINARY_API_KEY}`);
      res.status(500).json({
        errors: {
          images: {
            msg: err,
          },
        },
      });
    } else {
      next();
    }
  });
}
