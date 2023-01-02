import { Personal } from "./Personal";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";
import { useLazyGetUserQuery } from "@/Services";

type PersonalScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.PERSONAL
>;

export const PersonalContainer = ({ navigation }: PersonalScreenNavigatorProps) => {
    // const [userId, setUserId] = useState("9");

    // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    //     useLazyGetUserQuery();

    // useEffect(() => {
    //     fetchOne(userId);
    // }, [fetchOne, userId]);

    const onNavigate = (screen: MainScreens) => {
        navigation.navigate(screen);
    };

    return <Personal onNavigate={onNavigate} />;
};
