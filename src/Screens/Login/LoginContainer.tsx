import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import { MainBottomBarParamList } from "@/Navigation/Main";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetRmdLessonsQuery, useLazyGetAllLessonsQuery, useLazyGetAllProgressesQuery, useLazyGetUserProfileQuery, useLazyGetAllCategoriesQuery } from "@/Services";
import { MainScreens, RootScreens } from "..";
import { Login } from "./Login";

type LoginScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, RootScreens.LOGIN>,
  NativeStackScreenProps<MainBottomBarParamList>
>;

export const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Login onNavigate={onNavigate} />
};