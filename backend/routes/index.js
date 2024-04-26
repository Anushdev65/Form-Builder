import { Router } from "express";

import userRouter from "./userRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/user`,
    router: userRouter,
  },
];

// Map defined routes to their respective routers

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
