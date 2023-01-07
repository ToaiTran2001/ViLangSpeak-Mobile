import { API_APP } from "../baseApp";

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ListCategory {
  categories: Category[];
  total: number;
}

export interface ListCategoryResponse {
  data: ListCategory;
  timestamp: number;
}

export interface LessonInfo {
  id: number;
  name: string;
  visible: boolean;
  category: number;
}

export interface ListLessonInfo {
  lessons: LessonInfo[];
  total: number;
}

export interface ListLessonInfoResponse {
  data: ListLessonInfo;
  timestamp: number;
}

export interface Item {
  type: string;
  order: number;
  content: string;
}

export interface Card {
  id: number;
  type: string;
  audio_url: string;
  content: string;
  translation: string;
  items: Item[];
}

export interface ListCard {
  value: Card[];
  total: number;
}

export interface LessonDetail {
  id: number;
  name: string;
  visible: boolean;
  category: Category;
  test: number;
  cards: ListCard;
}

export interface LessonDetailResponse {
  data: {
    lesson: LessonDetail;
  };
  timestamp: number;
}

export interface Progress {
  lesson: number;
  progress: {
    value: number;
    last_date: number;
  }
}

export interface ListProgress {
  progresses: Progress[];
  total: number;
}

export interface ProgressResponse {
  data: Progress;
  timestamp: number;
}

export interface ListProgressResponse {
  data: ListProgress;
  timestamp: number;
}

type LessonIds = {
  lesson_id: string;
  account_id: string;
}

const allCategoriesApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<ListCategoryResponse, string>({
      query: () => `app/category/all`,
    }),
  }),
  overrideExisting: true,
});

const allLessonsApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getAllLessons: build.query<ListLessonInfoResponse, string>({
      query: () => `app/lesson/all`,
    }),
  }),
  overrideExisting: true,
});

const recommendLessonsApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getRmdLessons: build.query<ListLessonInfoResponse, string>({
      query: (id) => `app/lesson/recommend?account_id=${id}`,
    }),
  }),
  overrideExisting: true,
});

const lessonApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getLesson: build.query<LessonDetailResponse, string>({
      query: (id) => `app/lesson/${id}`,
    }),
  }),
  overrideExisting: true,
});

const allProgressesApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getAllProgresses: build.query<ListProgressResponse, string>({
      query: (id) => `app/lesson/all/progress?account_id=${id}`,
    }),
  }),
  overrideExisting: true,
});

const progressApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getProgress: build.query<ProgressResponse, LessonIds>({
      query: ({ lesson_id, account_id }) => `app/lesson/${lesson_id}/progress?account_id=${account_id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllCategoriesQuery } = allCategoriesApi;

export const { useLazyGetRmdLessonsQuery } = recommendLessonsApi;

export const { useLazyGetAllLessonsQuery } = allLessonsApi;

export const { useLazyGetLessonQuery } = lessonApi;

export const { useLazyGetAllProgressesQuery } = allProgressesApi;

export const { useLazyGetProgressQuery } = progressApi;
