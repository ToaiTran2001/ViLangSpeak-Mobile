import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { HomeMore } from "./HomeMore";
import { useIsFocused } from "@react-navigation/native";
import { useLazyGetAllCategoriesQuery, useLazyGetAllLessonsQuery, useLazyGetAllProgressesQuery } from "@/Services";

type HomeMoreScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.HOMEMORE
>;

export const HomeMoreContainer = ({
    navigation,
    route
}: HomeMoreScreenProps) => {
    const [accountId, setAccountId] = useState(route.params.accountId);

    // allCategories = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allCategories = useLazyGetAllCategoriesQuery();

    // allLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allLessons = useLazyGetAllLessonsQuery();

    // allProgresses = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allProgresses = useLazyGetAllProgressesQuery();

    const isLoading =
        allCategories[1].isLoading ||
        allLessons[1].isLoading ||
        allProgresses[1].isLoading;

    useEffect(() => {
        if (accountId) {
            const accountIdString = accountId.toString();
            allCategories[0](accountIdString);
            allLessons[0](accountIdString);
            allProgresses[0](accountIdString);
        }
    }, [accountId]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            if (accountId) {
                const accountIdString = accountId.toString();
                allProgresses[0](accountIdString);
            }
        }
    }, [isFocused]);

    const onNavigateLesson = (accountId: number | undefined, id: number) => {
        navigation.push(RootScreens.LESSON, { accountId: accountId, lessonId: id });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <HomeMore
            isLoading={isLoading}
            accountId={accountId}
            allCategories={allCategories[1].data?.data}
            allLessons={allLessons[1].data?.data}
            allProgresses={allProgresses[1].data?.data}
            onNavigateLesson={onNavigateLesson}
            goBack={goBack}
        />
    );
};