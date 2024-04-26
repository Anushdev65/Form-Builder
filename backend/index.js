import express from "express";
import { config } from "dotenv";
import { apiVersion, port } from "./config/config.js";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./connectDb/db.js";
import apiRouter from "./routes/index.js";

config();

const expressApp = express();

expressApp.use(cors());

expressApp.use(bodyParser.urlencoded({ extended: false }));

expressApp.use(bodyParser.json());

expressApp.use(`${apiVersion}`, apiRouter);

connectDb();

expressApp.get("/", (req, res) => {
  res.send("Hello world");
});

expressApp.listen(port, () => {
  console.log(`The port is listening at ${port}`);
});
