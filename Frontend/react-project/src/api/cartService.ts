import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type {ICartAddRecipeRequest, ICartData} from "../types/cart/ICartData.ts";

export const cartService = createApi({
  reducerPath: "cartService",
  baseQuery: createBaseQuery("carts"),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<ICartData, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    addRecipeToCart: builder.mutation<void, ICartAddRecipeRequest>({
      query: (body) => ({
        url: "add-recipe",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useAddRecipeToCartMutation } = cartService;
