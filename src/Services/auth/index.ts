import { API_APP } from "../baseApp";
import { API_AUTH } from "../baseAuth";

export interface LoginInfo {
    username: string;
    password: string;
}

export interface CredentialResponse {
    access_token: string;
    refresh_token: string;
}

export interface LogoutResponse {
    status: string;
}

export interface RefreshInfo {
    refresh_token: string;
}

export const authApi = API_AUTH.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<CredentialResponse, LoginInfo>({
      query: (loginInfo) => ({
        url: "auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
  }),
  overrideExisting: true,
});

export const logOutApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    logOut: build.mutation<LogoutResponse, void>({
      query: () => ({
          url: "auth/logout",
          method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});