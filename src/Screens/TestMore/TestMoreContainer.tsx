import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { TestMore } from "./TestMore";
import { useLazyGetAllCategoriesQuery, useLazyGetAllProgressesTestQuery, useLazyGetAllTestsQuery } from "@/Services";
import { useIsFocused } from "@react-navigation/native";

type TestMoreScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.TESTMORE
>;

export const TestMoreContainer = ({
    navigation,
    route
}: TestMoreScreenProps) => {
    const [accountId, setAccountId] = useState(route.params.accountId);
    
    // allCategories = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allCategories = useLazyGetAllCategoriesQuery();

    // allLessons = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allTests = useLazyGetAllTestsQuery();

    // allProgresses = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const allProgressesTest = useLazyGetAllProgressesTestQuery();

    const isLoading =
        allCategories[1].isLoading ||
        allTests[1].isLoading ||
        allProgressesTest[1].isLoading;

    useEffect(() => {
        if (accountId) {
            const accountIdString = accountId.toString();
            allCategories[0](accountIdString);
            allTests[0](accountIdString);
            allProgressesTest[0](accountIdString);
        }
    }, [accountId]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            if (accountId) {
                const accountIdString = accountId.toString();
                allProgressesTest[0](accountIdString);
            }
        }
    }, [isFocused]);

    const onNavigateTestDetail = (accountId: number | undefined, testId: number) => {
        navigation.push(RootScreens.TESTDETAIL, { accountId: accountId, testId: testId });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <TestMore
            accountId={accountId}
            allCategories={allCategories[1].data?.data}
            allTests={allTests[1].data?.data}
            allProgressesTest={allProgressesTest[1].data?.data}
            onNavigateTestDetail={onNavigateTestDetail}
            goBack={goBack}
        />
    );
};