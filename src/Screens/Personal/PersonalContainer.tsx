import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { useLazyGetUserProfileQuery, useLazyGetUserAchievementsQuery } from "@/Services";
import { MainScreens } from "..";
import { Personal } from "./Personal";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";

type PersonalScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.PERSONAL
>;

export const PersonalContainer = ({ navigation, route }: PersonalScreenNavigatorProps) => {
  // const { id } = route.params;

  // const [userId, setUserId] = useState(id);

  const userId = useSelector(selectAuth()).userId;

  // profile = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const profile = useLazyGetUserProfileQuery();

  // achievements: [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
  const listAchievement = useLazyGetUserAchievementsQuery();

  const isLoading = profile[1].isLoading || listAchievement[1].isLoading;

  useEffect(() => {
    if (userId) {
      const userIdString = userId.toString();
      profile[0](userIdString);
      listAchievement[0](userIdString);
    }
  }, [profile[0], listAchievement[0], userId]);

  const onNavigate = (screen: MainScreens) => {
      navigation.navigate(screen);
  };

  return <Personal isLoading={isLoading} profile={profile[1].data?.data} listAchievement={listAchievement[1].data?.data} onNavigate={onNavigate} />;
};
