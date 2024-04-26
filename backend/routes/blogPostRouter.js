import { Router } from "express";
import { blogPostController } from "../controllers/index.js";
import { isValidToken } from "../middlewares/isValidToken.js";
import { sortFilterPagination } from "../middlewares/sortSelectPage.js";

const blogPostRouter = Router();

commentsRouter
  .route("/")
  .post(isValidToken, blogPostController.createBlogPost)
  .get(isValidToken, blogPostController.readAllBlogPosts, sortFilterPagination);

commentsRouter
  .route("/:id")
  .patch(isValidToken, blogPostController.updateBlogPost)
  .get(isValidToken, blogPostController.readSpecificBlogPost)
  .delete(isValidToken, blogPostController.deleteSpecificBlogPost);

export default blogPostRouter;
