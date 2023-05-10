import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize } from "@/Theme";
import { Config } from "@/Config";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface IAnswerProps {
    id: number | undefined;
    questionType: string | undefined;
    type: string | undefined;
    content: string | undefined;
    answer: number | undefined;
    text: string;
    isChoosed: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
    setIsCorrect: (correct: boolean) => void;
    onPress: () => void;
};

export const Answer = (props: IAnswerProps) => {
    const { id, questionType, type, content, answer, text, isChoosed, isSubmitted, isCorrect, setIsCorrect, onPress } = props;
    var backgroundColor = Colors.FLASHCARD;
    var textColor = Colors.TEXT;
    if (!isSubmitted) {
        if (isChoosed) {
            backgroundColor = Colors.PRIMARY;
        }
    } else {
        if (isChoosed) {
            if (answer === 1) {
                backgroundColor = Colors.TEXT_CORRECT;
            } else {
                backgroundColor = Colors.TEXT_ERROR;
            }
        }
        if (answer === 1) {
            textColor = Colors.TEXT_CORRECT;
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            if ((isChoosed && answer === 1) || (!isChoosed && answer === 0))  {
                setIsCorrect(true);
            }
        }
    }, [isCorrect, isSubmitted, isChoosed])

    return (
        <TouchableOpacity onPress={onPress}>
            {
                type === "p"
                ?
                    <View
                        style={[styles.container, { backgroundColor: backgroundColor }]}
                    >
                        <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
                    </View>
                :
                    <Image style={styles.image} source={{uri: Config.API_APP_URL.slice(0, -1) + content}}/>
            }
            
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                {
                    questionType === "mc"
                    ?
                        <BouncyCheckbox 
                            isChecked={isChoosed} 
                            disableBuiltInState 
                            onPress={onPress}
                            fillColor={Colors.PRIMARY}
                        />
                    :
                        null 
                }
                <Text style={{ fontSize: FontSize.SMALL, color: textColor }}>{text}</Text>
            </View>
        </TouchableOpacity>
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
    image: {
        resizeMode: "contain",
        width: 120,
        height: 100,
        marginVertical: 5,
    }
});