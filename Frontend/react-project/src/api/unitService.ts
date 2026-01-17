import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type { IUnitItem } from "../types/recipe/IUnitItem";

export const unitService = createApi({
  reducerPath: "unitService",
  baseQuery: createBaseQuery("recipes"),
  endpoints: (builder) => ({
    getUnits: builder.query<IUnitItem[], void>({
      query: () => ({
        url: "units",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUnitsQuery } = unitService;
