import { Schema } from "mongoose";

const blogPostSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],

    creationDate: {
      type: Date,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { timestamps: true }
);

export default blogPostSchema;
