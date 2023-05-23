import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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

	const onNavigateGuest = () => {
		navigation.push(RootScreens.GUEST);
	}

  	return <Login onNavigateRegister={onNavigateRegister} onNavigateGuest={onNavigateGuest} />;
};
