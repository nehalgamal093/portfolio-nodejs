import express from "express";
import * as certificate from "./certificate.controller.js";
// import { uploadSingleFile } from "../middleware/fileUpload.js";
import {imageCoverUpload} from '../middleware/imageCoverUpload.js';
const certificateRouter = express.Router();


// certificateRouter
//   .route("/")
//   .post(uploadSingleFile('image','/public'), certificate.createcertificate)
//   .get(certificate.getAllCertificate);

certificateRouter
  .route("/")
  .post(imageCoverUpload,certificate.createcertificate)
  .get(certificate.getAllCertificate);
certificateRouter
  .route("/:id")
  .delete(certificate.deleteCertificate)

export default certificateRouter;
