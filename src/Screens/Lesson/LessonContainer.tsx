import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useLazyGetLessonQuery } from "@/Services";
import { RootScreens } from "..";
import { Lesson } from "./Lesson";

type LessonScreenProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.LESSON
>;

export const LessonContainer = ({ navigation, route }: LessonScreenProps) => {
    const [lessonId, setLessonId] = useState(String(route.params.lessonId));

    // lesson = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const lesson = useLazyGetLessonQuery();

    useEffect(() => {
        lesson[0](lessonId);
    }, [lesson[0], lessonId]);

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
            onNavigateTestDetail={onNavigateTestDetail}
            goBack={goBack}
        />
    );
};
