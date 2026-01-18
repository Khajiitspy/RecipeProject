import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";
import { serialize } from "object-to-formdata";
import type {ITokenResponse} from "../types/user/ITokenResponse.ts";
import type {IRegisterUser} from "../types/user/IRegisterUser.ts";
import type {ILoginUser} from "../types/user/ILoginUser.ts";
import { loginSuccess } from "../store/authSlice.ts";
import type { Dispatch } from '@reduxjs/toolkit';
import type {IAuthResponse} from "../types/user/IAuthResponse.ts";


const handleAuthSuccess = async (
    queryFulfilled: Promise<{ data: IAuthResponse }>,
    dispatch: Dispatch,
) => {
  try {
    const { data } = await queryFulfilled;
    if (data?.token) {
      dispatch(loginSuccess(data.token));
    }
  } catch (error) {
    console.error('Auth error:', error);
  }
};


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
      })
      }),

      loginByGoogle: builder.mutation<{token: string}, string>({
        query: (token) => ({
          url: 'GoogleLogin',
          method: 'POST',
          body: {token}
        }),
        onQueryStarted: async (_arg, { dispatch, queryFulfilled }) =>
            handleAuthSuccess(queryFulfilled, dispatch)
      }),
    }),
  });


export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginByGoogleMutation,
} = userService;
