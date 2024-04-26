import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { commentsService } from "../services/index.js";

export let createComment = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await commentsService.createCommentsService({ body: body });

  successResponseData({
    res,
    message: "Tags created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let updateComment = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await commentsService.updateSpecificCommentsService({ id, body });

  successResponseData({
    res,
    message: "Tags updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificComment = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await commentsService.deleteSpecificCommentsService({ id });

  successResponseData({
    res,
    message: "Tags read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllComments = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = commentsService.listAllCommentsService;

  next();
});

export let deleteSpecificComment = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await commentsService.deleteSpecificCommentsService({ id });
  successResponseData({
    res,
    message: "tags deleted successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
