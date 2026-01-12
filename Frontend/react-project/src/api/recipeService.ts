import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
// import type { IRecipeItem } from "../types/countries/ICountryItem";
// import type { IRecipeCreate } from "../types/countries/ICountryCreate";
import { serialize } from "object-to-formdata";

export const recipeService = createApi({
  reducerPath: "recipeService",
  baseQuery: createBaseQuery("recipe"),
  tagTypes: ["Recipe"],

  endpoints: (builder) => ({
    // getRecipes: builder.query<IRecipeItem[], void>({
    //   query: () => ({
    //     url: "",
    //     method: "GET"
    //   }),
    //   providesTags: ["Recipe"]
    // }),

    // getRecipeBySlug: builder.query<IRecipeItem, string>({
    //   query: (slug) => ({
    //     url: slug,
    //     method: "GET"
    //   }),
    //   providesTags: (result) =>
    //     result ? [{ type: "Recipe", id: result.slug }] : ["Recipe"]
    // }),

    // createRecipe: builder.mutation<IRecipeItem, IRecipeCreate>({
    //   query: (body) => {
    //     const formData = serialize(body, { indices: false });

    //     return {
    //       url: "",
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["Recipe"]
    // })
  })
});

export const {
  // useGetRecipesQuery,
  // useGetRecipeBySlugQuery,
  // useCreateRecipeMutation
} = recipeService;
