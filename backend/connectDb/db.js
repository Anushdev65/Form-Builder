import mongoose from "mongoose";
import { dbUrl } from "../config/config.js";

export const connectDb = async () => {
  mongoose.set("strictQuery", false);

  try {
    mongoose.connect(dbUrl);
    console.log(
      `expressApp is connected to mongodb at port ${dbUrl} successfully.`
    );
  } catch (error) {
    console.log(error.message);
  }
};
