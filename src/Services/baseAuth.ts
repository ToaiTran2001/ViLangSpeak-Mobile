import { Config } from "@/Config";
import { RootState } from "@/Store";
import { AuthState, doneRefreshToken, logIn, logOut, refreshingToken } from "@/Store/reducers";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { CredentialResponse, RefreshInfo } from "./auth";

const baseQuery = fetchBaseQuery({ baseUrl: Config.API_APP_URL });

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const API_AUTH = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiAuth',
});

export const refreshToken = async (getState: any, dispatch: any) => {
  const token = (getState() as RootState).auth.refreshToken;

  if (token) {
    const refreshInfo: RefreshInfo = {
      refresh_token: token,
    }
    const refreshTokenPromise = axios.post<CredentialResponse>(
      (new URL("auth/refresh", Config.API_APP_URL)).href,
      refreshInfo, {
        headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => {
      const tokens: AuthState = {
        userId: result.data.id,
        token: result.data.access_token,
        refreshToken: result.data.refresh_token,
      };
      dispatch(logIn(tokens));

      dispatch(doneRefreshToken());

      return tokens.token ? Promise.resolve(tokens) : Promise.reject('failed to refresh token');
    }).catch(e => {
      console.log('error refreshing token');
      if (axios.isAxiosError(e) && e.response?.status == 401) {
        // refresh token is expired
        dispatch(logOut());
      }
      dispatch(doneRefreshToken());

      return Promise.reject(e);
    });

    dispatch(refreshingToken({
      promise: refreshTokenPromise,
    }));

    return refreshTokenPromise; 
  }

  return Promise.reject({ message: 'not login yet' });
}