import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetLessonQuery, useLazyGetProgressQuery } from "@/Services";
import { RootScreens } from "..";
import { Lesson } from "./Lesson";

type LessonScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.LESSON
>;

export const LessonContainer = ({ navigation, route }: LessonScreenProps) => {
    const [accountId, setAccountId] = useState(route.params.accountId)
    const [lessonId, setLessonId] = useState(route.params.lessonId);

    // lesson = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const lesson = useLazyGetLessonQuery();

    const lessonProgress = useLazyGetProgressQuery();

    useEffect(() => {
        const accountIdString = String(accountId);
        const lessonIdString = String(lessonId);
        lesson[0](lessonIdString);
        lessonProgress[0]({lesson_id: lessonIdString, account_id: accountIdString});
    }, [lessonId, accountId]);

    const onNavigateTestDetail = (accountId: number | undefined, testId: number) => {
        navigation.navigate(RootScreens.TESTDETAIL, { accountId: accountId, testId: testId });
    };

    const onNavigateMain = () => {
        navigation.navigate(RootScreens.MAIN);
    };

    return (
        <Lesson
            isLoading={lesson[1].isLoading}
            lesson={lesson[1].data?.data.lesson}
            lessonProgress={lessonProgress[1].data?.data.progress.value}
            accountId={accountId}
            onNavigateTestDetail={onNavigateTestDetail}
            onNavigateMain={onNavigateMain}
        />
    );
};
