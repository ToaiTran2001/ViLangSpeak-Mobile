import React, { useState } from "react";
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
    const [allTestsUser, setAllTestsUser] = useState(route.params.allTestsUser);

    const onNavigateTestDetail = (id: number) => {
        navigation.push(RootScreens.TESTDETAIL, { testId: id });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <TestMore
            allTestsUser={allTestsUser}
            onNavigateTestDetail={onNavigateTestDetail}
            goBack={goBack}
        />
    );
};