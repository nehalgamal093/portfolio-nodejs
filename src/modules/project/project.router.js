import express from "express";
import * as project from "./project.controller.js";
import { uploadMixOfFiles } from "../middleware/fileUpload.js";

const projectRouter = express.Router();

let fieldsArray = [{ name: "images", maxCount: 10 }];

projectRouter
  .route("/")
  .post(uploadMixOfFiles(fieldsArray,'/public'), project.createProject)
  .get(project.getAllProjects);


projectRouter
  .route("/:id")
  .delete(project.deleteProject)
  .put(project.updateProject).get(project.getProject);
export default projectRouter;
