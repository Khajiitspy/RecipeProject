import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import { serialize } from "object-to-formdata";
import type { IRecipeItem } from "../types/recipe/IRecipeItem";
import type { IRecipeCreate } from "../types/recipe/IRecipeCreate";

export const recipeService = createApi({
  reducerPath: "recipeService",
  baseQuery: createBaseQuery("recipes"),
  tagTypes: ["Recipe"],

  endpoints: (builder) => ({
    getRecipes: builder.query<IRecipeItem[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),

    createRecipe: builder.mutation<IRecipeItem, IRecipeCreate>({
      query: (body) => {
        const formData = serialize(body, {
          indices: false,
          nullsAsUndefineds: true,
        });

        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useCreateRecipeMutation,
} = recipeService;
