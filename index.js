import express from "express";
import { dbConnection } from "./databaseConnection/dbConnection.js";
import projectRouter from "./src/modules/project/project.router.js";
import * as dotenv from "dotenv";
import cors from 'cors';
import profileRouter from "./src/modules/profile/profile.router.js";
import certificateRouter from "./src/modules/certificate/certificate.router.js";

dotenv.config()
const app = express();

const port = 3001;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//  app.use(express.static('public'));
app.use("/projects", projectRouter);
app.use("/profiles", profileRouter);
app.use("/certificates", certificateRouter);


app.get("/", (req, res) => {
  res.send("Hello world");
});

dbConnection();

app.listen(port,"0.0.0.0", () => {
  console.log("Connected successfully");
});


