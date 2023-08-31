import express from "express";
import * as profile from "./profile.controller.js";
// import { uploadSingleFile } from "../middleware/fileUpload.js";

const profileRouter = express.Router();



// profileRouter
//   .route("/")
//   .post(uploadSingleFile('image','/public'),profile.createProfile)
//   .get(profile.getAllProfile);

  
profileRouter
  .route("/")
  .post(profile.createProfile)
  .get(profile.getAllProfile);
profileRouter
  .route("/:id")
  .delete(profile.deleteProfile)
  .put(profile.updateProfile);
export default profileRouter;
