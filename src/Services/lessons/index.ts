import { API } from "../base";

export interface Category {
  id: number;
  name: string;
  image: number;
}

export interface LessonCard {
  id: number;
  name: string;
  visible: boolean;
  category: Category;
}

export interface LessonCardUser {
  id: number;
  name: string;
  visible: boolean;
  category: Category;
  progress: number,
}

export interface TestCard {
  id: number;
  name: string;
  visible: boolean;
  category: Category;
}

export interface AchievementCard {
  id: number;
  name: string;
  image: number;
  date: number;
}

export interface Item {
  type: string;
  order: number;
  content: string;
}

export interface FlashCard {
  id: number;
  type: string;
  audio_url: number;
  content: string;
  translation: string;
  items: Item[];
}

export interface Lesson {
  id: number;
  name: string;
  visible: true;
  category: Category;
  test: number;
  cards: {
    value: FlashCard[];
    total: number;
  };
}

export interface Lessons {
  lessons: LessonCard[];
  total: number;
}

const allLessonsApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllLessons: build.query<Lessons, string>({
      query: () => `/app/lesson/all`,
    }),
  }),
  overrideExisting: true,
});

const rmdLessonsApi = API.injectEndpoints({
  endpoints: (build) => ({
    getRmdLessons: build.query<Lessons, string>({
      query: () => `/app/lesson/recommend`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllLessonsQuery } = allLessonsApi;

export const { useLazyGetRmdLessonsQuery } = rmdLessonsApi;
