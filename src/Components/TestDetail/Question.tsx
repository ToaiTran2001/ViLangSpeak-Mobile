import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { HStack, Heading, Spinner } from "native-base";
import { Switch } from 'react-native-switch';
import { Colors, FontSize, IconSize } from "@/Theme";
import { Config } from "@/Config";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import Video from 'react-native-video';

export interface IQuestionProps {
    id: number | undefined;
    questionType: string | undefined;
    type: string | undefined;
    content: string | undefined;
};

export const Question = (props: IQuestionProps) => {
    const { id, questionType, type, content } = props;

    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    const [isLoadingSound, setIsLoadingSound] = useState(false);

    async function playSound(content: string) {
        console.log("Loading Sound");
        setIsLoadingSound(true);
        const { sound } = await Audio.Sound.createAsync(
        { uri: content ? Config.API_APP_URL.slice(0, -1) + content : "" }
        );
        setSound(sound);
        console.log("Playing Sound");
        setIsLoadingSound(false);
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

    return (
        <View style={styles.container}>
            { type === "p"
            ?
                <View style={styles.pContainer}>
                    <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
                </View>
            :   
                <View style={styles.iContainer}>
                    {
                        type === "a"
                        ?
                            <View>
                                <TouchableOpacity style={[styles.iconContainer, {backgroundColor: Colors.NEW}]} onPress={() => playSound(content ? Config.API_APP_URL.slice(0, -1) + content : "")}>
                                    <Ionicons
                                        name="volume-high-outline"
                                        size={IconSize.HUGE}
                                        color={Colors.TEXT}
                                    />
                                </TouchableOpacity>
                                {
                                    isLoadingSound 
                                    ? 
                                        <HStack space={2} justifyContent="center">
                                            <Spinner accessibilityLabel="Loading posts" />
                                        </HStack>
                                    : 
                                        null
                                }
                            </View>
                        :   type === "i"
                        ?
                            <Image style={styles.image} source={{uri: Config.API_APP_URL.slice(0, -1) + content}}/>
                        :    
                            // <Video source={{uri: Config.API_APP_URL.slice(0, -1) + content}} />
                            null
                    }
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pContainer: {
        borderRadius: 10,
        width: "96%",
        height: 120,
        margin: 5,
        padding: 10,
        backgroundColor: Colors.FLASHCARD,
        justifyContent: "center",
        alignItems: "center"
    },
    iContainer: {
        height: 120,
        margin: 5,
        backgroundColor: Colors.BACKGROUND,
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
        height: 120,
    },
    video: {
        resizeMode: "contain",
        height: 120,
    },
});