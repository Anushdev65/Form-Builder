import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { Category } from "../model/model.js";
import { categoryService } from "../services/index.js";

export let createCategory = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await categoryService.createCategoryService({ body: body });

  successResponseData({
    res,
    message: "Category created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let updateCategory = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await categoryService.updateSpecificCategoryService({ id, body });

  successResponseData({
    res,
    message: "Category updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificCategory = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await categoryService.detailSpecificCategoryService({ id });

  successResponseData({
    res,
    message: "Read  category successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export const readAllCategory = async (req, res) => {
  try {
    const categoryData = await Category.find();
    res.json(categoryData);
  } catch (error) {
    res.json({
      message: "Error occured",
      data: error,
    });
  }
};

export let deleteSpecificCategory = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await categoryService.deleteSpecificCategoryService({ id });
  successResponseData({
    res,
    message: "Category delete successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
