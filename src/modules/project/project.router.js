import express from "express";
import * as project from "./project.controller.js"
import {uploadMixOfFiles} from '../middleware/fileUpload.js';
const projectRouter = express.Router()
let fieldsArray=[{name:'images',maxCount:10}]
projectRouter.route("/").post(uploadMixOfFiles(fieldsArray,"project"),project.createProject);

export default projectRouter;

