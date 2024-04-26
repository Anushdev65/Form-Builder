import { Schema } from "mongoose";

const userSchema = Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    dateOfBirth: {
      type: Date,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    roles: [
      {
        type: String,
        enum: ["user", "admin"],
      },
    ],
  },
  { timestamps: true }
);

export default userSchema;
