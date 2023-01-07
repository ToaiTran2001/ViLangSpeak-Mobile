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

export const { useLazyGetUserProfileQuery } = userProfileApi;

export const { useLazyGetUserAchievementsQuery } = userAchievementsApi;