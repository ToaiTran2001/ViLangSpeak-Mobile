import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { HomeMore } from "./HomeMore";

type HomeMoreScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.HOMEMORE
>;

export const HomeMoreContainer = ({
    navigation,
    route
}: HomeMoreScreenProps) => {
    const [accountId, setAccountId] = useState(route.params.accountId);

    const [allLessonsUser, setAllLessonsUser] = useState(route.params.allLessonsUser);

    useEffect(() => {
        setAccountId(route.params.accountId);
        setAllLessonsUser(route.params.allLessonsUser);
    }, [
        accountId,
        allLessonsUser,
    ]);

    const onNavigateLesson = (accountId: number | undefined, id: number) => {
        navigation.push(RootScreens.LESSON, { accountId: accountId, lessonId: id });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <HomeMore
            accountId={accountId}
            allLessonsUser={allLessonsUser}
            onNavigateLesson={onNavigateLesson}
            goBack={goBack}
        />
    );
};