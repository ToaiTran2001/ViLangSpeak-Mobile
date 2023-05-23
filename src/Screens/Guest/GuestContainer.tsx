import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { Guest } from "./Guest";

type GuestScreenNavigatorProps = NativeStackScreenProps<
	RootStackParamList,
	RootScreens.GUEST
>;

export const GuestContainer = ({ navigation }: GuestScreenNavigatorProps) => {
	const goBack = () => {
		navigation.goBack();
	};

	const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

	const randomString: string = "V" + String(getRndInteger(10000, 99999));

  	return <Guest randomString={randomString} goBack={goBack} />;
};
