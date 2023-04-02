import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Switch } from 'react-native-switch';
import { Colors, FontSize } from "@/Theme";
import { Config } from "@/Config";

export interface IQuestionProps {
    id: number | undefined;
    question_type: string | undefined;
    type: string | undefined;
    content: string | undefined;
};

export const Question = (props: IQuestionProps) => {
    const { id, question_type, type, content } = props;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 10,
        width: "96%",
        height: 96,
        margin: 5,
        padding: 10,
        backgroundColor: Colors.FLASHCARD,
        justifyContent: "center",
        alignItems: "center"
    },
});