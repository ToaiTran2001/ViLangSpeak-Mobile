import { API_APP } from "../baseApp";

export interface TestInfo {
  id: number;
  name: string;
  visible: boolean;
  category: number;
}

export interface ListTestInfo {
  tests: TestInfo[];
  total: number;
}

export interface ListTestInfoResponse {
  data: ListTestInfo;
  total: number;
}

export interface ProgressTest {
  test: number;
  progress: {
    score: number;
    times: number;
    last_date: number;
  };
}

export interface ProgressTestResponse {
  data: ProgressTest;
  timestamp: number;
}

export interface ListProgressTest {
  progresses: ProgressTest[];
  total: number;
}

export interface ListProgressTestResponse {
  data: ListProgressTest;
  timestamp: number;
}

type TestIds = {
  test_id: string;
  account_id: string;
}

const allTestsApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getAllTests: build.query<ListTestInfoResponse, string>({
      query: () => `app/test/all`,
    }),
  }),
  overrideExisting: true,
});

const recommendTestsApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getRmdTests: build.query<ListTestInfoResponse, string>({
      query: (id) => `app/test/recommend?account_id=${id}`,
    }),
  }),
  overrideExisting: true,
});

const allProgressesTestApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getAllProgressesTest: build.query<ListProgressTestResponse, string>({
      query: (id) => `app/test/all/progress?account_id=${id}`,
    }),
  }),
  overrideExisting: true,
});

const progressTestApi = API_APP.injectEndpoints({
  endpoints: (build) => ({
    getProgressTest: build.query<ProgressTestResponse, TestIds>({
      query: ({ test_id, account_id }) => `app/test/${test_id}/progress?account_id=${account_id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetRmdTestsQuery } = recommendTestsApi;

export const { useLazyGetAllTestsQuery } = allTestsApi;

export const { useLazyGetAllProgressesTestQuery } = allProgressesTestApi;

export const { useLazyGetProgressTestQuery } = progressTestApi;