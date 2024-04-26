import { Schema } from "mongoose";

const tagsSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default tagsSchema;
