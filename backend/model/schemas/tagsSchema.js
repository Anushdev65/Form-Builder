import { Schema } from "mongoose";

const tagsSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default tagsSchema;
