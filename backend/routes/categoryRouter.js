import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { isValidToken } from "../middlewares/isValidToken.js";
import { sortFilterPagination } from "../middlewares/sortSelectPage.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(isValidToken, categoryController.createCategory)
  .get(isValidToken, categoryController.readAllCategory);

categoryRouter
  .route("/:id")
  .patch(isValidToken, categoryController.updateCategory)
  .get(isValidToken, categoryController.readSpecificCategory)
  .delete(isValidToken, categoryController.deleteSpecificCategory);

export default categoryRouter;
