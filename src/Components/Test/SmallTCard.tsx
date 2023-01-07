import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors, FontSize } from "@/Theme";
import { Category, ProgressTest } from "@/Services";
import { Heading } from "native-base";
import { Config } from "@/Config";

export interface ITestProps {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: ProgressTest | undefined;
    onPress: () => void;
}

export const SmallTCard = (props: ITestProps) => {
    const { id, name, visible, category, progress } = props

    let thumbnailContainerColor: string = Colors.NEW

    if (progress && progress.progress.score !== 0) {
        thumbnailContainerColor = Colors.SUCCESS
    }

    const defaultImage: number = require("../../../assets/smile.png");

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {return null;}}
        >
            <View style={[styles.thumbnailContainer, {backgroundColor: thumbnailContainerColor}]}>
                <Image style={styles.thumbnail} source={category?.image === "" ? defaultImage : {uri: Config.API_APP_URL.slice(0,-1) + category?.image}}></Image>
            </View>
            <View style={styles.titleContainer}>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>{name}</Heading>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: 120,
        height: 160,
    },
    thumbnailContainer: {
        flex: 3,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    thumbnail: {
        resizeMode: "contain",
        width: 80,
        height: 60,
    },
})