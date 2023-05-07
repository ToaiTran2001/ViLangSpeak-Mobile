import React, { useEffect } from "react";
import {
    useLazyGetUserProfileQuery,
    useLazyGetUserAchievementsQuery,
} from "@/Services";
import { Personal } from "./Personal";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";

export const PersonalContainer = () => {
    const userId = useSelector(selectAuth()).userId;

    // profile = [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const profile = useLazyGetUserProfileQuery();

    // achievements: [fetchOne, { data, isSuccess, isLoading, isFetching, error }]
    const listAchievement = useLazyGetUserAchievementsQuery();

    const isLoading = profile[1].isLoading || listAchievement[1].isLoading;

    useEffect(() => {
        if (userId) {
            const userIdString = userId.toString();
            profile[0](userIdString);
            listAchievement[0](userIdString);
        }
    }, [userId]);

    return (
        <Personal
            isLoading={isLoading}
            profile={profile[1].data?.data}
            listAchievement={listAchievement[1].data?.data}
        />
    );
};
