import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Category, Progress } from "@/Services";
import { Config } from "@/Config";

export interface IAnswerProps {
    id: number | undefined;
    type: string | undefined;
    content: string | undefined;
    answer: number | undefined;
    text: string;
    onPress: () => void;
};

export const Answer = (props: IAnswerProps) => {
    const [isChoosed, setIsChoosed] = useState(false)

    const { id, type, content, answer, text, onPress } = props;

    return (
        <View>
            <TouchableOpacity
                style={[styles.container, { backgroundColor: isChoosed ? Colors.PRIMARY : Colors.FLASHCARD }]}
                onPress={() => setIsChoosed(!isChoosed)}
            >
                <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: 120,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 5,
    },
});