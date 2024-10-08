import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { getLevelInfo } from "../../localStorage/localStorage";

export const blogPostApi = createApi({
  reducerPath: "blogPostApi",
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
    createBlogPost: builder.mutation({
      query: (body) => {
        return {
          url: `/blog-post`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllBlogPost"],
    }),

    getAllBlogPost: builder.query({
      query: (query) => {
        return {
          url: `/blog-post`,
          method: "GET",
        };
      },
      providesTags: ["getAllBlogPost"],
    }),

    updateBlogPost: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/blog-post/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllBlogPost"],
    }),

    getBlogPostById: builder.query({
      query: (id) => {
        return {
          url: `/blog-post/${id}`,
          method: "GET",
        };
      },
    }),

    deleteBlogPost: builder.mutation({
      query: (id) => {
        return {
          url: `/blog-post/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllBlogPost"],
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useGetAllBlogPostQuery,
  useDeleteBlogPostMutation,
  useUpdateBlogPostMutation,
  useGetBlogPostByIdQuery,
} = blogPostApi;
