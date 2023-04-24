import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import {
    useLazyGetRmdLessonsQuery,
    useLazyGetAllLessonsQuery,
    useLazyGetAllProgressesQuery,
    useLazyGetUserProfileQuery,
    useLazyGetAllCategoriesQuery,
} from "@/Services";
import { RootScreens } from "..";
import { Home } from "./Home";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";

export type MainScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.MAIN
>;

export const HomeContainer = ({
    navigation
}: MainScreenProps) => {
    const userId = useSelector(selectAuth()).userId;

    // profile = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const profile = useLazyGetUserProfileQuery();

    // allCategories = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allCategories = useLazyGetAllCategoriesQuery();

    // recommendLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const recommendLessons = useLazyGetRmdLessonsQuery();

    // allLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allLessons = useLazyGetAllLessonsQuery();

    // allProgresses = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allProgresses = useLazyGetAllProgressesQuery();

    const isLoading =
        profile[1].isLoading ||
        allCategories[1].isLoading ||
        recommendLessons[1].isLoading ||
        allLessons[1].isLoading ||
        allProgresses[1].isLoading;

    useEffect(() => {
        if (userId) {
            const userIdString = userId.toString();
            profile[0](userIdString);
            allCategories[0](userIdString);
            recommendLessons[0](userIdString);
            allLessons[0](userIdString);
            allProgresses[0](userIdString);
        }
    }, [
        profile[0],
        allCategories[0],
        recommendLessons[0],
        allLessons[0],
        allProgresses[0],
        userId,
    ]);

    const onNavigateLesson = (id: number) => {
        navigation.push(RootScreens.LESSON, { lessonId: id });
    };

    return (
        <Home
            isLoading={isLoading}
            profile={profile[1].data?.data}
            allCategories={allCategories[1].data?.data}
            recommendLessons={recommendLessons[1].data?.data}
            allLessons={allLessons[1].data?.data}
            allProgresses={allProgresses[1].data?.data}
            onNavigateLesson={onNavigateLesson}
        />
    );
};
