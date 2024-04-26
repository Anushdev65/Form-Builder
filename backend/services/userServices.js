import { User } from "../model/model.js";
export const createUserService = async ({ body }) => User.create(body);

export const listAllUserService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) => User.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const detailSpecificUserService = async ({ id }) => User.findById(id);

export const detailSpecificUserByAny = async ({ email }) =>
  User.findOne({ email });

export const editSpecificUserService = async ({ id, body }) =>
  User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

export const deleteSpecficUserService = async ({ id }) =>
  User.findByAndDelete(id);
