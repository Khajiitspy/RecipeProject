import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type { ICategoryItem } from "../types/recipe/ICategoryItem";

export const categoryService = createApi({
  reducerPath: "categoryService",
  baseQuery: createBaseQuery("categories"),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoryItem[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryService;
