import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Category, Progress } from "@/Services";
import { Config } from "@/Config";

export interface ILCardProps {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: Progress | undefined;
    onPress: () => void;
};

export const SmallLCard = (props: ILCardProps) => {
    const { id, name, visible, category, progress, onPress } = props;

    let thumbnailContainerColor: string = Colors.NEW;

    if (progress?.progress.value === 100) {
        thumbnailContainerColor = Colors.SUCCESS;
    } else if (progress && progress.progress.value !== 0) {
        thumbnailContainerColor = Colors.PRIMARY;
    }

    const defaultImage: string = "/public/image/lesson-default.png";

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={[styles.thumbnailContainer, {backgroundColor: thumbnailContainerColor}]}>
                <Image style={styles.thumbnail} source={{uri: category?.image ? String(new URL((category?.image === "" ? defaultImage : category?.image), Config.API_APP_URL)) : undefined}} />
            </View>
            <View style={styles.titleContainer}>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>{name}</Heading>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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