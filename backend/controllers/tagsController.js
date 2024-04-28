import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { Tags } from "../model/model.js";
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

export let readAlltags = async (req, res) => {
  try {
    const getTags = await Tags.find();
    res.json(getTags);
  } catch (error) {
    res.json({
      message: "Error occured",
      data: error,
    });
  }
};

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
