import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetTestDetailQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { TestDetail } from "./TestDetail";

type TestDetailScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, RootScreens.TESTDETAIL>,
  NativeStackScreenProps<MainBottomBarParamList>
>;

export const TestDetailContainer = ({ navigation, route }: TestDetailScreenNavigatorProps) => {
  // const { id } = route.params;

  // const [testId, setTestId] = useState(id);

  // const [testId, setTestId] = useState("1");

  // // test = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  // const test = useLazyGetTestDetailQuery();

  // useEffect(() => {
  //   test[0](testId);
  // }, [test[0], testId]);

  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  // return <TestDetail isLoading={test[1].isLoading} test={test[1].data?.data.test} onNavigate={onNavigate} />;
  return <TestDetail onNavigate={onNavigate} />
};