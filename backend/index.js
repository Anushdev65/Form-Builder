import express, { json } from "express";
import { config } from "dotenv";
import { apiVersion, port } from "./config/config.js";
// import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./connectDb/db.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import limiter from "./middlewares/rateLimiter.js";
const expressApp = express();

config();

expressApp.use(limiter);
expressApp.use(cors());

expressApp.use(json());

expressApp.use(`${apiVersion}`, apiRouter);

expressApp.use(errorHandler);
connectDb();

expressApp.listen(port, () => {
  console.log(`The port is listening at ${port}`);
});
