import { Test } from "./Test";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";
import { useLazyGetUserQuery } from "@/Services";

type TestScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.TEST
>;

export const TestContainer = ({ navigation }: TestScreenNavigatorProps) => {
    // const [userId, setUserId] = useState("9");

    // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = 
    //     useLazyGetUserQuery();

    // useEffect(() => {
    //     fetchOne(userId);
    // }, [fetchOne, userId]);

    const onNavigate = (screen: MainScreens) => {
        navigation.navigate(screen);
    };

    return <Test onNavigate={onNavigate} />;
};
