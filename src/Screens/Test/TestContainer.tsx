import React, { useEffect } from "react";
import {
    useLazyGetAllCategoriesQuery,
    useLazyGetAllTestsQuery,
    useLazyGetRmdTestsQuery,
    useLazyGetAllProgressesTestQuery,
} from "@/Services";
import { RootScreens } from "..";
import { Test } from "./Test";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";
import { MainScreenProps } from "../Home";

export const TestContainer = ({
    navigation
}: MainScreenProps) => {
    const userId = useSelector(selectAuth()).userId;

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
            allCategories[0](userIdString);
            recommendTests[0](userIdString);
            allTests[0](userIdString);
            allProgressesTest[0](userIdString);
        }
    }, [
        allCategories[0],
        recommendTests[0],
        allTests[0],
        allProgressesTest[0],
        userId,
    ]);

    const onNavigateTestDetail = (id: number) => {
        navigation.push(RootScreens.TESTDETAIL, { testId: id });
    };

    return (
        <Test
            isLoading={isLoading}
            allCategories={allCategories[1].data?.data}
            recommendTests={recommendTests[1].data?.data}
            allTests={allTests[1].data?.data}
            allProgressesTest={allProgressesTest[1].data?.data}
            onNavigateTestDetail={onNavigateTestDetail}
        />
    );
};
