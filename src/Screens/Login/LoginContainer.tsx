import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CompositeScreenProps } from "@react-navigation/native";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { Login } from "./Login";

type LoginScreenNavigatorProps = NativeStackScreenProps<
	RootStackParamList,
	RootScreens.LOGIN
>;

export const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
	const onNavigateRegister = () => {
		navigation.replace(RootScreens.REGISTER);
	};

  	return <Login onNavigateRegister={onNavigateRegister} />;
};
