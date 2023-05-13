import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Heading } from "native-base";
import { Colors, FontSize, IconSize } from "@/Theme";
import { Config } from "@/Config";
import { Audio } from "expo-av";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    let backgroundColor = Colors.FLASHCARD;
    let textColor = Colors.TEXT;
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

    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    const [isLoadingSound, setIsLoadingSound] = useState(false);

    async function playSound() {
        console.log("Loading Sound");
        setIsLoadingSound(true);
        const { sound } = await Audio.Sound.createAsync(
            { uri: content ? String(new URL(content, Config.API_APP_URL)) : "" }
        );
        setSound(sound);
        console.log("Playing Sound");
        setIsLoadingSound(false);
        await Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
		});
        await sound.playAsync();
    }

    useEffect(() => {
        // return () => { sound && sound.unloadAsync(); }
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
        : undefined;
    }, [sound]);

    useEffect(() => {
        if (isSubmitted) {
            if ((isChoosed && answer === 1) || (!isChoosed && answer === 0))  {
                setIsCorrect(true);
            }
        }
    }, [isCorrect, isSubmitted, isChoosed])

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[styles.container, { backgroundColor: backgroundColor }]}
            >
                {
                    type === "p"
                    ?
                        
                        <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
                        
                    :
                        type === "a"
                        ?
                            <TouchableOpacity 
                                style={styles.smallIconContainer} onPress={playSound}>
                                <Ionicons
                                    name="volume-high-outline"
                                    size={IconSize.MEDIUM}
                                    color={Colors.TEXT}
                                />
                            </TouchableOpacity>
                        :
                            <Image style={styles.image} source={{uri: String(new URL(content ? content : "", Config.API_APP_URL))}}/>
                }
            </View>
            
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
        width: 64,
        height: 64,
        marginVertical: 5,
    },
    smallIconContainer: {
        backgroundColor: Colors.NEW,
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
});