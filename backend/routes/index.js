import { Router } from "express";

import userRouter from "./userRouter.js";
import tagsRouter from "./tagsRouter.js";
import categoryRouter from "./categoryRouter.js";
import commentsRouter from "./commentsRouter.js";
import blogPostRouter from "./blogPostRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/user`,
    router: userRouter,
  },

  {
    path: `/category`,
    router: categoryRouter,
  },

  {
    path: `/tags`,
    router: tagsRouter,
  },

  {
    path: `/comments`,
    router: commentsRouter,
  },
  {
    path: `/blog-post`,
    router: blogPostRouter,
  },
];

// Map defined routes to their respective routers

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
