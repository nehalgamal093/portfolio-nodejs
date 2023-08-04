import express from "express";
import { dbConnection } from "./databaseConnection/dbConnection.js";
import projectRouter from "./src/modules/project/project.router.js";
import * as dotenv from "dotenv";
import cors from 'cors';
dotenv.config()
const app = express();

const port = 3001;
app.use(cors())
app.use(express.json());

 app.use(express.static("uploads"));
app.use("/projects", projectRouter);
app.get("/", (req, res) => {
  res.send("Hello world");
});

dbConnection();

app.listen(port, () => {
  console.log("Connected successfully");
});
