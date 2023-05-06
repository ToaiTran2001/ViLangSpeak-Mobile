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
    const [accountId, setAccountId] = useState(String(route.params.accountId))
    const [lessonId, setLessonId] = useState(String(route.params.lessonId));

    // lesson = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const lesson = useLazyGetLessonQuery();

    const lessonProgress = useLazyGetProgressQuery();

    useEffect(() => {
        lesson[0](lessonId);
        lessonProgress[0]({lesson_id: lessonId, account_id: accountId});
    }, [lesson[0], lessonProgress[0], lessonId, accountId]);

    const onNavigateTestDetail = (id: number) => {
        navigation.navigate(RootScreens.TESTDETAIL, { testId: id });
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <Lesson
            isLoading={lesson[1].isLoading}
            lesson={lesson[1].data?.data.lesson}
            lessonProgress={lessonProgress[1].data?.data.progress.value}
            accountId={accountId}
            onNavigateTestDetail={onNavigateTestDetail}
            goBack={goBack}
        />
    );
};
