import { Lesson } from "./Lesson";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens, RootScreens } from "..";
import { useLazyGetUserQuery } from "@/Services";
import { RootStackParamList } from "@/Navigation";

type LessonScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, RootScreens.LESSON>,
  NativeStackScreenProps<MainBottomBarParamList>
>;

export const LessonContainer = ({ navigation }: LessonScreenNavigatorProps) => {
  // const [userId, setUserId] = useState("9");

  // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
  //   useLazyGetUserQuery();

  // useEffect(() => {
  //   fetchOne(userId);
  // }, [fetchOne, userId]);

  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  return <Lesson onNavigate={onNavigate} />
  // return <Lesson data={data} onNavigate={onNavigate} />;
};
