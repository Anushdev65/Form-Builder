import { Router } from "express";
import { tagsController } from "../controllers/index.js";
import { isValidToken } from "../middlewares/isValidToken.js";
import { sortFilterPagination } from "../middlewares/sortSelectPage.js";

const tagsRouter = Router();

tagsRouter.route("/").post(isValidToken, tagsController.createtags);

tagsRouter.get("/", tagsController.readAlltags);

tagsRouter
  .route("/:id")
  .patch(isValidToken, tagsController.updatetags)
  .get(isValidToken, tagsController.readSpecifictags)
  .delete(isValidToken, tagsController.deleteSpecifictags);

export default tagsRouter;
