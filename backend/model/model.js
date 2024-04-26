import { model } from "mongoose";
import userSchema from "./schemas/userSchema.js";
import { tokenSchema } from "./schemas/tokenSchema.js";
import commentSchema from "./schemas/commentsSchema.js";
import tagsSchema from "./schemas/tagsSchema.js";
import categorySchema from "./schemas/categorySchema.js";
import blogPostSchema from "./schemas/blogPostSchema.js";

export const User = model("User", userSchema);
export const TokenData = model("TokenData", tokenSchema);
export const Comments = model("Comments", commentSchema);
export const Tags = model("Tags", tagsSchema);
export const Category = model("Category", categorySchema);
export const BlogPost = model("BlogPost", blogPostSchema);
