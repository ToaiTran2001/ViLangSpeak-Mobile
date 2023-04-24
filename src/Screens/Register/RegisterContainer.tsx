import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { Register } from "./Register";

type RegisterScreenNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.REGISTER
>;

export const RegisterContainer = ({
    navigation
}: RegisterScreenNavigatorProps) => {
    const onNavigateLogin = () => {
        navigation.navigate(RootScreens.LOGIN);
    };

    return <Register onNavigateLogin={onNavigateLogin} />;
};
