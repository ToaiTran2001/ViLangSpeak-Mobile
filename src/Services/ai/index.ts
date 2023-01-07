import { API_AI } from "../baseAi";

export interface AudioType {
  transcript: string;
  scores: number[];
  total: number;
}

export interface AudioTypeResponse {
  data: AudioType;
  timestamp: number;
}

const aiApi = API_AI.injectEndpoints({
  endpoints: (build) => ({
    aiPrediction: build.mutation<AudioTypeResponse, FormData>({
      query: (data) => ({
        url: "ai/predict-score",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});
  
export const { useAiPredictionMutation } = aiApi;