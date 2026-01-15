import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseQuery = (controller: string) =>
  fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/${controller}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
