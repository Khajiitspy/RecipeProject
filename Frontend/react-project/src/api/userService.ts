import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import type { ITokenResponse } from "../types/account/ITokenResponse";
import type { IRegisterUser } from "../types/account/IRegisterUser";
import { serialize } from "object-to-formdata";

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
    }),
});


export const { useRegisterMutation } = userService;
