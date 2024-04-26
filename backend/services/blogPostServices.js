import { BlogPost } from "../model/model.js";

export const createBlogPostService = async ({ body }) => BlogPost.create(body);

export const listAllBlogPostService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) =>
  BlogPost.find(find)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select(select)
    .populate("user")
    .populate("category")
    .populate("tags")
    .populate("comments");

export const detailSpecificBlogPostService = async ({ id }) =>
  BlogPost.findById(id)
    .populate("user")
    .populate("category")
    .populate("tags")
    .populate("comments");

export const deleteSpecificBlogPostService = async ({ id }) =>
  BlogPost.findByIdAndDelete(id);

export const updateSpecificBlogPostService = async ({ id, body }) =>
  BlogPost.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
