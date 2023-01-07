import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors, FontSize } from "@/Theme";
import { Category, Progress } from "@/Services";
import { Config } from "@/Config";
import { Heading } from "native-base";

export interface ILessonProps {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: Progress | undefined;
    onPress: () => void;
}

export const SmallLCard = (props: ILessonProps) => {
    const { id, name, visible, category, progress, onPress } = props

    let thumbnailContainerColor: string = Colors.NEW

    if (progress?.progress.value === 100) {
        thumbnailContainerColor = Colors.SUCCESS
    } else if (progress && progress.progress.value !== 0) {
        thumbnailContainerColor = Colors.PRIMARY
    }

    const defaultImage: number = require("../../../assets/smile.png");

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {return null;}}
        >
            <View style={[styles.thumbnailContainer, {backgroundColor: thumbnailContainerColor}]}>
                <Image style={styles.thumbnail} source={category?.image === "" ? defaultImage : {uri: Config.API_APP_URL.slice(0,-1) + category?.image}} />
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
        width: 64,
        height: 64,
    },
})