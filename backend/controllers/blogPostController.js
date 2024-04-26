import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { blogPostService } from "../services/index.js";

export let createBlogPost = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await blogPostService.createBlogPostService({ body: body });

  successResponseData({
    res,
    message: "Tags created successfully.",
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
    message: "Tags updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificBlogPost = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await blogPostService.detailSpecificBlogPostService({ id });

  successResponseData({
    res,
    message: "Tags read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllBlogPosts = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = blogPostService.listAllBlogPostService;

  next();
});

export let deleteSpecificBlogPost = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await blogPostService.detailSpecificBlogPostService({ id });
  successResponseData({
    res,
    message: "tags deleted successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
