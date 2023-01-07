import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Achievement } from "@/Services";
import { Config } from "@/Config";

export const NormalACard = (props: Achievement) => {
    const { id, name, image, date } = props;

    const defaultImage: string = "/public/image/achievement-default.png";

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {return null;}}
        >
            <View style={styles.thumbnailContainer}>
                <Image style={styles.thumbnail} source={{uri: Config.API_APP_URL.slice(0, -1) + (image === "" ? defaultImage : image)}}></Image>
            </View>
            <View style={styles.contentContainer}>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>{name}</Heading>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.SUCCESS,
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
        justifyContent: "center",
        alignItems: "flex-start",
    },
    thumbnail: {
        resizeMode: "contain",
        width: 64,
        height: 64,
    }
});