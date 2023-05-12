import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Config } from "@/Config";
import { ILCardProps } from "./SmallLCard";
import { Switch } from 'react-native-switch';

export const NormalLCard = (props: ILCardProps) => {
    const { id, name, visible, category, progress, onPress } = props;

    let containerColor: string = Colors.NEW;

    if (progress?.progress.value === 100) {
        containerColor = Colors.SUCCESS;
    } else if (progress && progress.progress.value !== 0) {
        containerColor = Colors.PRIMARY;
    }

    const defaultImage: string = "/public/image/lesson-default.png";

    return (
        <TouchableOpacity
            style={[styles.container, {backgroundColor: containerColor}]}
            onPress={onPress}
        >
            <View style={styles.thumbnailContainer}>
                <Image style={styles.thumbnail} source={{uri: category?.image ? String(new URL((category?.image === "" ? defaultImage : category?.image), Config.API_APP_URL)) : undefined}}></Image>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>{name}</Heading>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT, marginRight: 20}}>{progress ? progress.progress.value : 0}%</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{category?.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: "96%",
        height: 90,
        borderRadius: 15,
        margin: 5,
    },
    thumbnailContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 7,
        marginVertical: 5,
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    thumbnail: {
        resizeMode: "contain",
        width: 60,
        height: 60,
    },
    switch: {
        marginRight: 20,
    }
});