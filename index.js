import express from "express";
import { dbConnection } from "./databaseConnection/dbConnection.js";
import projectRouter from "./src/modules/project/project.router.js";
import * as dotenv from "dotenv";
import cors from "cors";
import profileRouter from "./src/modules/profile/profile.router.js";
import certificateRouter from "./src/modules/certificate/certificate.router.js";

dotenv.config();
const app = express();

const port = 3001;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://portfolio-panel-rho.vercel.app/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  app.use(express.static('public'));
app.use("/projects", projectRouter);
app.use("/profiles", profileRouter);
app.use("/certificates", certificateRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

dbConnection();

app.listen(port, "0.0.0.0", () => {
  console.log("Connected successfully");
});
