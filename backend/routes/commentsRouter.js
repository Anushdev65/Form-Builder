import { Router } from "express";
import { commentsController } from "../controllers/index.js";
import { isValidToken } from "../middlewares/isValidToken.js";
import { sortFilterPagination } from "../middlewares/sortSelectPage.js";

const commentsRouter = Router();

commentsRouter
  .route("/")
  .post(isValidToken, commentsController.createComment)
  .get(isValidToken, commentsController.readAllComments, sortFilterPagination);

commentsRouter
  .route("/:id")
  .patch(isValidToken, commentsController.updateComment)
  .get(isValidToken, commentsController.readSpecificComment)
  .delete(isValidToken, commentsController.deleteSpecificComment);

export default commentsRouter;
