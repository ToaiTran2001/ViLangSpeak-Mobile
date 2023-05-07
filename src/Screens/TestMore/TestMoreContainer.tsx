import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { TestMore } from "./TestMore";

type TestMoreScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.TESTMORE
>;

export const TestMoreContainer = ({
    navigation,
    route
}: TestMoreScreenProps) => {
    const [accountId, setAccountId] = useState(route.params.accountId);
    const [allTestsUser, setAllTestsUser] = useState(route.params.allTestsUser);

    useEffect(() => {
        setAccountId(route.params.accountId);
        setAllTestsUser(route.params.allTestsUser);
    }, [
        accountId,
        allTestsUser,
    ]);

    const onNavigateTestDetail = (accountId: number | undefined, testId: number) => {
        navigation.push(RootScreens.TESTDETAIL, { accountId: accountId, testId: testId });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <TestMore
            accountId={accountId}
            allTestsUser={allTestsUser}
            onNavigateTestDetail={onNavigateTestDetail}
            goBack={goBack}
        />
    );
};