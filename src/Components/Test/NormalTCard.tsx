import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";
import { Colors, FontSize } from "@/Theme";
import { TestCard } from "@/Services";
import { Heading } from "native-base";

export const NormalTCard = (props: TestCard) => {
    const { id, thumbnail, title, category, score } = props

    let containerColor: string = Colors.SUCCESS
    let buttonTitle: string = "Review"
    let buttonColor: string = Colors.BUTTON_REVIEW

    if (score === "0") {
        containerColor = Colors.NEW
        buttonTitle = "Start"
        buttonColor = Colors.BUTTON_START
    }

    return (
        <View
            style={[styles.container, {backgroundColor: containerColor}]}
        >
            <View style={styles.thumbnailContainer}>
                <Image style={styles.thumbnail} source={thumbnail}></Image>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>{title}</Heading>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT, marginRight: 30}}>{score}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{category}</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]}>
                        <Text style={{fontSize: FontSize.SMALL, color: Colors.TEXT}}>{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        width: 80,
        height: 60,
    },
    button: {
        width: 60,
        height: 30,
        borderRadius: 10,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
    }
})