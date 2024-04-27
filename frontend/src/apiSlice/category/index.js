import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { getLevelInfo } from "../../localStorage/localStorage";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const levelInfo = getLevelInfo();
      const token = levelInfo && levelInfo.token ? levelInfo.token : "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/category`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    getAllCategory: builder.query({
      query: (query) => {
        return {
          url: `/category`,
          method: "GET",
        };
      },
      providesTags: ["getAllCategory"],
    }),

    updateCategory: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllCategory"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
