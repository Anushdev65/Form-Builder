import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { tagsService } from "../services/index.js";

export let createtags = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await tagsService.createTagsService({ body: body });

  successResponseData({
    res,
    message: "Tags created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let updatetags = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await tagsService.updateSpecificTagsService({ id, body });

  successResponseData({
    res,
    message: "Tags updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecifictags = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await tagsService.detailSpecificTagsService({ id });

  successResponseData({
    res,
    message: "Tags read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAlltags = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = tagsService.readAllTagsService;

  next();
});

export let deleteSpecifictags = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await tagsService.deleteSpecificTagsService({ id });
  successResponseData({
    res,
    message: "tags deleted successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
