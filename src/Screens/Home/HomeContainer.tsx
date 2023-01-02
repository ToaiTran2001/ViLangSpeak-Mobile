import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { Lessons } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { useLazyGetRmdLessonsQuery, useLazyGetAllLessonsQuery } from "@/Services";
import { RootStackParamList } from "@/Navigation";

type HomeScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<MainBottomBarParamList, MainScreens.HOME>,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  // const [userId, setUserId] = useState("9");

  // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
  //   useLazyGetAllLessonsQuery();

  // useEffect(() => {
  //   fetchOne(userId);
  // }, [fetchOne, userId]);

  const recommendLessonsData: Lessons | undefined = useLazyGetRmdLessonsQuery()[1].data;

  const allLessonsData: Lessons | undefined = useLazyGetAllLessonsQuery()[1].data;

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Home onNavigate={onNavigate} />
  // return <Home recommendLessons={recommendLessonsData} allLessons={allLessonsData} onNavigate={onNavigate} />;
};
