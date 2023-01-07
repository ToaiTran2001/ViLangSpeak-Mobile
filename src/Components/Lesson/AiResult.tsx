import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
} from "react-native";
import { Colors, FontSize, IconSize } from "@/Theme";
import { AudioTypeResponse, useAiPredictionMutation } from "@/Services";
import { Heading, HStack, Spinner } from "native-base";

export interface IAiProps {
  transcript: string;
  uri: string;
}

export const AiResult = (props: IAiProps) => {

  const { transcript, uri } = props;

  const [uploadRecord, { data, isSuccess, isLoading, error }] = useAiPredictionMutation();

  const [dataResponse, setDataResponse] = useState<AudioTypeResponse | undefined>();

  useEffect(() => {
    const fileUri =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append("transcript", transcript);
    formData.append("audio", {
      uri: fileUri,
      name: `record.${fileType}`,
      type: `audio/${fileType}`,
    } as any);
    uploadRecord(formData);
  }, [uri]);

  useEffect(() => {
    setDataResponse(data);
  }, [data])

  const mapText = (element: number, index: number) => {
    return (
      <Text
        key={index}
        style={{ fontSize: FontSize.REGULAR, color: element === 0 ? Colors.TEXT_ERROR : Colors.TEXT_CORRECT }}
      >
        {transcript.split(" ")[index]}{" "}
      </Text>
    )
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Scoring
          </Heading>
        </HStack>
      ) : (
        dataResponse ? dataResponse.data.scores.map(mapText as any) : null
      )}
    </View>
  );
}