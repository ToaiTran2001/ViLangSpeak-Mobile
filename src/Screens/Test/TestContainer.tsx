import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { useLazyGetAllCategoriesQuery, useLazyGetAllTestsQuery, useLazyGetRmdTestsQuery, useLazyGetAllProgressesTestQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { Test } from "./Test";
import { RootStackParamList } from "@/Navigation";

type TestScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<MainBottomBarParamList, MainScreens.TEST>,
  NativeStackScreenProps<RootStackParamList>
>;

export const TestContainer = ({ navigation, route }: TestScreenNavigatorProps) => {
  // const { id } = route.params;

  // const [userId, setUserId] = useState(id);

  const [userId, setUserId] = useState("1");

  // allCategories = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const allCategories = useLazyGetAllCategoriesQuery();

  // recommendTests = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const recommendTests = useLazyGetRmdTestsQuery();

  // allLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const allTests = useLazyGetAllTestsQuery();

  // allProgresses = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const allProgressesTest = useLazyGetAllProgressesTestQuery();

  const isLoading = allCategories[1].isLoading || recommendTests[1].isLoading || allTests[1].isLoading || allProgressesTest[1].isLoading;

  useEffect(() => {
    allCategories[0](userId)
    recommendTests[0](userId);
    allTests[0](userId);
    allProgressesTest[0](userId);
  }, [allCategories[0], recommendTests[0], allTests[0], allProgressesTest[0], userId]);

  const onNavigate = (screen: RootScreens) => {
      navigation.navigate(screen);
  };

  return <Test isLoading={isLoading} allCategories={allCategories[1].data?.data} recommendTests={recommendTests[1].data?.data} allTests={allTests[1].data?.data} allProgressesTest={allProgressesTest[1].data?.data} onNavigate={onNavigate} />;
};
