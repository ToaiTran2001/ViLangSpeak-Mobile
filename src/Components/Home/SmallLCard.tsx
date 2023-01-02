import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors, FontSize } from "@/Theme";
import { LessonCardTemp } from "@/Services";
import { Heading } from "native-base";

export interface ILessonProps {
    data: LessonCardTemp;
    onPress: () => void;
}

export const SmallLCard = (props: ILessonProps) => {
    const { data, onPress } = props

    let thumbnailContainerColor: string = Colors.PRIMARY

    if (data.progress === 100) {
        thumbnailContainerColor = Colors.SUCCESS
    } else if (data.progress === 0) {
        thumbnailContainerColor = Colors.NEW
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {return null;}}
        >
            <View style={[styles.thumbnailContainer, {backgroundColor: thumbnailContainerColor}]}>
                <Image style={styles.thumbnail} source={data.category.image} />
            </View>
            <View style={styles.titleContainer}>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>{data.name}</Heading>
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