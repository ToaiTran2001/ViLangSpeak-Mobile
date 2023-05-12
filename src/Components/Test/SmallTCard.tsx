import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Category, ProgressTest } from "@/Services";
import { Config } from "@/Config";

export interface ITestProps {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: ProgressTest | undefined;
    onPress: () => void;
};

export const SmallTCard = (props: ITestProps) => {
    const { id, name, visible, category, progress, onPress } = props;

    let thumbnailContainerColor: string = Colors.NEW;

    if (progress && progress.progress.score !== 0) {
        thumbnailContainerColor = Colors.SUCCESS;
    }

    const defaultImage: string = "/public/image/test-default.png";

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={[styles.thumbnailContainer, {backgroundColor: thumbnailContainerColor}]}>
                <Image style={styles.thumbnail} source={{uri: category?.image ? String(new URL((category?.image === "" ? defaultImage : category?.image), Config.API_APP_URL)) : undefined}}></Image>
            </View>
            <View style={styles.titleContainer}>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>{name}</Heading>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: 120,
        height: 150,
    },
    thumbnailContainer: {
        flex: 3,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
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
        width: 60,
        height: 60,
    },
});