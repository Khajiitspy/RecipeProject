import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";

import { serialize } from "object-to-formdata";
import type {ITokenResponse} from "../types/user/ITokenResponse.ts";
import type {IRegisterUser} from "../types/user/IRegisterUser.ts";
import type {ILoginUser} from "../types/user/ILoginUser.ts";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: createBaseQuery("account"),
  endpoints: (builder) => ({
    register: builder.mutation<ITokenResponse, IRegisterUser>({
      query: (body) => {
        const formData = serialize(body, { indices: false });
        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
    }),

    login: builder.mutation<ITokenResponse, ILoginUser>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = userService;
