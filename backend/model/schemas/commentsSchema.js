import { Schema } from "mongoose";

const commentSchema = Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "BlogPost",
    },
  },
  { timestamps: true }
);

export default commentSchema;
