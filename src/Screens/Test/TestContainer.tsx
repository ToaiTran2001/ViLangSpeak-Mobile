import { Test } from "./Test";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";
import { useLazyGetAllCategoriesQuery, useLazyGetAllTestsQuery, useLazyGetRmdTestsQuery, useLazyGetAllProgressesTestQuery } from "@/Services";

type TestScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.TEST
>;

export const TestContainer = ({ navigation }: TestScreenNavigatorProps) => {
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

  const onNavigate = (screen: MainScreens) => {
      navigation.navigate(screen);
  };

  return <Test isLoading={isLoading} allCategories={allCategories[1].data?.data} recommendTests={recommendTests[1].data?.data} allTests={allTests[1].data?.data} allProgressesTest={allProgressesTest[1].data?.data} onNavigate={onNavigate} />;
};
