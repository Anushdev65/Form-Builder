import { Router } from "express";

import { userController } from "../controllers/index.js";
import { isValidToken } from "../middlewares/isValidToken.js";

const userRouter = Router();

userRouter.route("/register").post(userController.createUser);

userRouter.route("/login").post(userController.loginUser);

userRouter.route("/logout").patch(isValidToken, userController.logoutUser);

userRouter
  .route("/update-password")
  .patch(isValidToken, userController.updateUserPassword);

export default userRouter;
