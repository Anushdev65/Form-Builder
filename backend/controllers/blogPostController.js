import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { BlogPost } from "../model/model.js";
import { blogPostService } from "../services/index.js";

export let createBlogPost = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await blogPostService.createBlogPostService({ body: body });

  successResponseData({
    res,
    message: "Blog post created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let updateBlogPost = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await blogPostService.updateSpecificBlogPostService({ id, body });

  successResponseData({
    res,
    message: "Blog post updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificBlogPost = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await blogPostService.detailSpecificBlogPostService({ id });

  successResponseData({
    res,
    message: "BlogPost read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllBlogPosts = async (req, res) => {
  try {
    const getBlogPost = await BlogPost.find();
    res.json(getBlogPost);
  } catch (error) {
    res.json({
      message: "Error occurent",
      data: error,
    });
  }
};
export let deleteSpecificBlogPost = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await blogPostService.deleteSpecificBlogPostService({ id });
  successResponseData({
    res,
    message: "Blog post deleted successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
