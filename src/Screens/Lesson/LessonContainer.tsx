import { Lesson } from "./Lesson";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens, RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetLessonQuery } from "@/Services";

type LessonScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, RootScreens.LESSON>,
  NativeStackScreenProps<MainBottomBarParamList>
>;

export const LessonContainer = ({ navigation }: LessonScreenNavigatorProps) => {
  const [lessonId, setLessonId] = useState("1");

  // lesson = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const lesson = useLazyGetLessonQuery();

  useEffect(() => {
    lesson[0](lessonId);
  }, [lesson[0], lessonId]);

  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  return <Lesson isLoading={lesson[1].isLoading} lesson={lesson[1].data?.data.lesson} onNavigate={onNavigate} />;
};
