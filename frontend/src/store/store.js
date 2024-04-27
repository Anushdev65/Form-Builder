import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apiSlice/user";
import authReducer from "../features/auth/authSlice";
import { categoryApi } from "../apiSlice/category";
import { blogPostApi } from "../apiSlice/blogPost";
import { tagsApi } from "../apiSlice/tags";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [blogPostApi.reducerPath]: blogPostApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      categoryApi.middleware,
      blogPostApi.middleware,
      tagsApi.middleware,
    ]),
});

export default store;
