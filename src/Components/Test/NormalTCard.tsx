import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Config } from "@/Config";
import { ITestProps } from "./SmallTCard";

export const NormalTCard = (props: ITestProps) => {
    const { id, name, visible, category, progress, onPress } = props;

    let containerColor: string = Colors.NEW;
    let buttonTitle: string = "Start";
    let buttonColor: string = Colors.BUTTON_START;

    if (progress && progress.progress.score !== 0) {
        containerColor = Colors.SUCCESS;
        buttonTitle = "Review";
        buttonColor = Colors.BUTTON_REVIEW;
    }

    const defaultImage: string = "/public/image/test-default.png";

    return (
        <TouchableOpacity
            style={[styles.container, {backgroundColor: containerColor}]}
        >
            <View style={styles.thumbnailContainer}>
                <Image style={styles.thumbnail} source={{uri: Config.API_APP_URL.slice(0, -1) + (category?.image === "" ? defaultImage : category?.image)}}></Image>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>{name}</Heading>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT, marginRight: 30}}>{progress ? progress.progress.score : 0}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{category?.name}</Text>
                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: buttonColor}]}
                        onPress={onPress}
                    >
                        <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 20,
        width: "96%",
        height: 96,
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
        justifyContent: "space-between",
        alignItems: "center",
    },
    thumbnail: {
        resizeMode: "contain",
        width: 64,
        height: 64,
    },
    button: {
        width: 72,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
        padding: 5,
    }
});