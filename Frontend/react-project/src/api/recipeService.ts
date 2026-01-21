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
        url: "myRecipes",
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
    getRecipeById: builder.query<IRecipeItem, number>({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
      }),
    }),
    updateRecipe: builder.mutation<IRecipeItem, FormData>({
      query: (body) => ({
        url: "edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
    searchRecipes: builder.query<RecipeItemModel[], RecipeSearchRequest>({
      query: (params) => ({
        url: "search",
        method: "GET",
        params,
      }),
    }),
    togglePublish: builder.mutation<void, number>({
      query: (id) => ({
        url: `togglePublish/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
  useDeleteRecipeMutation,
  useTogglePublishMutation,
  useSearchRecipesQuery,
} = recipeService;
