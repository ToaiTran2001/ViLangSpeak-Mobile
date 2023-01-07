import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { useLazyGetUserProfileQuery, useLazyGetUserAchievementsQuery } from "@/Services";
import { MainScreens } from "..";
import { Personal } from "./Personal";

type PersonalScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.PERSONAL
>;

export const PersonalContainer = ({ navigation }: PersonalScreenNavigatorProps) => {
  const [userId, setUserId] = useState("1");

  // profile = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const profile = useLazyGetUserProfileQuery();

  // achievements: [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const listAchievement = useLazyGetUserAchievementsQuery();

  const isLoading = profile[1].isLoading || listAchievement[1].isLoading;

  useEffect(() => {
    profile[0](userId);
    listAchievement[0](userId);
  }, [profile[0], listAchievement[0], userId]);

  const onNavigate = (screen: MainScreens) => {
      navigation.navigate(screen);
  };

  return <Personal isLoading={isLoading} profile={profile[1].data?.data} listAchievement={listAchievement[1].data?.data} onNavigate={onNavigate} />;
};
