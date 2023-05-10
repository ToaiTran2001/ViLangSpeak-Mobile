import React, { useEffect } from "react";
import {
    useLazyGetAllCategoriesQuery,
    useLazyGetAllTestsQuery,
    useLazyGetRmdTestsQuery,
    useLazyGetAllProgressesTestQuery,
    useLazyGetUserProfileQuery,
} from "@/Services";
import { MainScreens, RootScreens } from "..";
import { Test, TestInfoUser } from "./Test";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "@/Navigation";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TestScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MainBottomBarParamList, MainScreens.TEST>,
    NativeStackScreenProps<RootStackParamList>
>;

export const TestContainer = ({
    navigation
}: TestScreenProps) => {
    const userId = useSelector(selectAuth()).userId;

    // profile = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const profile = useLazyGetUserProfileQuery();

    // allCategories = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allCategories = useLazyGetAllCategoriesQuery();

    // recommendTests = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const recommendTests = useLazyGetRmdTestsQuery();

    // allLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allTests = useLazyGetAllTestsQuery();

    // allProgresses = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allProgressesTest = useLazyGetAllProgressesTestQuery();

    const isLoading =
        allCategories[1].isLoading ||
        recommendTests[1].isLoading ||
        allTests[1].isLoading ||
        allProgressesTest[1].isLoading;

    useEffect(() => {
        if (userId) {
            const userIdString = userId.toString();
            profile[0](userIdString);
            allCategories[0](userIdString);
            recommendTests[0](userIdString);
            allTests[0](userIdString);
            allProgressesTest[0](userIdString);
        }
    }, [
        userId,
    ]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // Update the state you want to be updated
            if (userId) {
                const userIdString = userId.toString();
                recommendTests[0](userIdString);
                allTests[0](userIdString);
                allProgressesTest[0](userIdString);
            }
        }
    }, [isFocused])

    const onNavigateTestDetail = (accountId: number | undefined, testId: number) => {
        navigation.push(RootScreens.TESTDETAIL, { accountId: accountId, testId: testId });
    };

    const onNavigateTestMore = (accountId: number | undefined, allTestsUser: TestInfoUser[]) => {
        navigation.push(RootScreens.TESTMORE, { accountId: accountId, allTestsUser: allTestsUser });
    }

    return (
        <Test
            isLoading={isLoading}
            profile={profile[1].data?.data}
            allCategories={allCategories[1].data?.data}
            recommendTests={recommendTests[1].data?.data}
            allTests={allTests[1].data?.data}
            allProgressesTest={allProgressesTest[1].data?.data}
            onNavigateTestDetail={onNavigateTestDetail}
            onNavigateTestMore={onNavigateTestMore}
        />
    );
};
