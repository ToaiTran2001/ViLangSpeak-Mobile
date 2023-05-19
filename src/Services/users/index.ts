import { API_APP } from "../baseApp";

export interface Account {
  id: number;
  name: string;
  birthday: string;
  username: string;
  role: number;
};

export interface Profile {
  account: Account;
};

export interface ProfileResponse {
  data: Profile;
  timestamp: number;
};

export interface Achievement {
  id: number;
  name: string;
  image: string;
  date: number;
};

export interface ListAchievement {
  account: number;
  achievements: Achievement[];
  total: number;
};

export interface ListAchievementResponse {
  data: ListAchievement;
  timestamp: number;
};

export interface RegisterInfo {
  name: string;
  birthday: string;
  username: string;
  password: string;
};

const userProfileApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<ProfileResponse, string>({
      query: (id) => `app/account/${id}/info`,
    }),
  }),
  overrideExisting: true,
});

const userAchievementsApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getUserAchievements: build.query<ListAchievementResponse, string>({
      query: (id) => `app/account/${id}/achievement`,
    }),
  }),
  overrideExisting: true,
});

const registerApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<ProfileResponse, RegisterInfo>({
      query: (registerInfo) => ({
        url: "app/account/register",
        method: "POST",
        body: registerInfo,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserProfileQuery } = userProfileApi;

export const { useLazyGetUserAchievementsQuery } = userAchievementsApi;

export const { useRegisterMutation } = registerApi;