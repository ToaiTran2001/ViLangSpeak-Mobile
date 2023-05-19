import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { Welcome } from "./Welcome";

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
	RootStackParamList,
	RootScreens.WELCOME
>;

export const WelcomeContainer = ({
  	navigation,
}: WelcomeScreenNavigatorProps) => {
	const onNavigateLogin = () => {
		navigation.navigate(RootScreens.LOGIN);
	};

	return <Welcome onNavigateLogin={onNavigateLogin} />;
};
