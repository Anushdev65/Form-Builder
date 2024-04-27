import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apiSlice/user";
import authReducer from "../features/auth/authSlice";
import { categoryApi } from "../apiSlice/category";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, categoryApi.middleware]),
});

export default store;
