import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetTestDetailQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { TestDetail } from "./TestDetail";

type TestDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.TESTDETAIL
>;

export const TestDetailContainer = ({ navigation, route }: TestDetailScreenNavigatorProps) => {
  const [testId, setTestId] = useState(String(route.params.testId));

  // test = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const test = useLazyGetTestDetailQuery();

  useEffect(() => {
    test[0](testId);
  }, [test[1].data, testId]);

  const goBack = () => {
    navigation.goBack();
};

  return <TestDetail isLoading={test[1].isLoading} test={test[1].data?.data.test} goBack={goBack} />;
};