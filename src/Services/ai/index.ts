import { API } from "../base";

export interface AudioType {
    transcript: string;
    audio: string;
}

const aiApi = API.injectEndpoints({
    endpoints: (build) => ({
      aiPrediction: build.mutation<AudioType, FormData>({
        query: (data) => ({
          url: "ai/predict-score",
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: data,
        }),
      }),
    }),
    overrideExisting: true,
  });
  
export const { useAiPredictionMutation } = aiApi;