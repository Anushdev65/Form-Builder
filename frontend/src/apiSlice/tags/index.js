import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { getLevelInfo } from "../../localStorage/localStorage";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
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
    createTags: builder.mutation({
      query: (body) => {
        return {
          url: `/tags`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["getAllTags"],
    }),

    getAllTags: builder.query({
      query: (query) => {
        return {
          url: `/tags`,
          method: "GET",
        };
      },
      providesTags: ["getAllTags"],
    }),

    updateTags: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/tags/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["getAllTags"],
    }),

    getTagsById: builder.query({
      query: (id) => {
        return {
          url: `/tags/${id}`,
          method: "GET",
        };
      },
    }),

    deleteTags: builder.mutation({
      query: (id) => {
        return {
          url: `/tags/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllTags"],
    }),
  }),
});

export const {
  useCreateTagsMutation,
  useGetAllTagsQuery,
  useDeleteTagsMutation,
  useUpdateTagsMutation,
  useGetTagsByIdQuery,
} = tagsApi;
