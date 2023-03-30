import { Config } from "@/Config";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from '@/Store';
import { refreshToken } from "./baseAuth";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_APP_URL,
  prepareHeaders: (headers, { getState }) => {
    // inject authorization header to every request
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshTokenPromise = (api.getState() as RootState).authRefresh.promise;
    try {
      // refresh token or wait for it to complete
      refreshTokenPromise ? (await refreshTokenPromise) : (await refreshToken(api.getState, api.dispatch));

      const newResult = await baseQuery(args, api, extraOptions);

      return newResult;
    }
    catch (e) {
      // cannot refresh token
      console.log(e)
      console.log("cannot refresh token");
    }
  }
  return result;
};

export const API_APP = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'api',
});
