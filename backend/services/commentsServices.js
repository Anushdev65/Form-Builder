import { Comments } from "../model/model.js";

export const createCommentsService = async ({ body }) => Comments.create(body);

export const listAllCommentsService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) =>
  Comments.find(find)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select(select)
    .populate("user")
    .populate("blogPost");

export const detailSpecificCommentsService = async ({ id }) =>
  Comments.findById(id).populate("user").populate("blogPost");

export const deleteSpecificCommentsService = async ({ id }) =>
  Comments.findByIdAndDelete(id);

export const updateSpecificCommentsService = async ({ id, body }) =>
  Comments.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
