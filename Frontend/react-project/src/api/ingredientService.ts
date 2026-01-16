import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type { IngredientItemModel } from "../types/recipe/IIngredientItem";

export const ingredientService = createApi({
  reducerPath: "ingredientService",
  baseQuery: createBaseQuery("ingredients"),
  tagTypes: ["Ingredient"],
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientItemModel[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Ingredient"],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientService;
