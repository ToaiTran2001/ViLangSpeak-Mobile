import { API } from "../base";

export interface User {
  id: number;
  name: string;
  birthday: string;
  username: string;
  role: number;
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `app/account/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery } = userApi;