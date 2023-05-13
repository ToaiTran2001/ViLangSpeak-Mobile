import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { HStack, Heading, Spinner } from "native-base";
import { Switch } from 'react-native-switch';
import { Colors, FontSize, IconSize } from "@/Theme";
import { Config } from "@/Config";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video, ResizeMode } from 'expo-av';

export interface IQuestionProps {
    id: number | undefined;
    questionType: string | undefined;
    type: string | undefined;
    content: string | undefined;
    description: string | undefined;
};

export const Question = (props: IQuestionProps) => {
    const { id, questionType, type, content, description } = props;

    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    const [isLoadingSound, setIsLoadingSound] = useState(false);

    let audioUrl: string | undefined = content;
    if (type === "p" && description !== "") {
        audioUrl = description;
    }

    console.log(content);

    async function playSound() {
        console.log("Loading Sound");
        setIsLoadingSound(true);
        const { sound } = await Audio.Sound.createAsync(
            { uri: audioUrl ? String(new URL(audioUrl, Config.API_APP_URL)) : "" }
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

    return (
        <View style={styles.container}>
            { 
                type === "p"
                ?
                    <View style={styles.pContainer}>
                        <Text style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>{content}</Text>
                        {
                            description !== ""
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
                                null
                        }
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
                :   
                    <View style={styles.iContainer}>
                        {
                            type === "a"
                            ?
                                <View>
                                    <TouchableOpacity style={styles.iconContainer} onPress={playSound}>
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
                                <Image style={styles.image} source={{uri: content ? String(new URL(content, Config.API_APP_URL)) : undefined}} />
                                
                            :    
                                <Video resizeMode={ResizeMode.CONTAIN} source={{uri: String(new URL(content ? content : "", Config.API_APP_URL))}} />
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
        flexDirection: "row",
        backgroundColor: Colors.FLASHCARD,
        borderRadius: 10,
        width: "96%",
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        padding: 10,
    },
    iContainer: {
        backgroundColor: Colors.BACKGROUND,
        width: "96%",
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    iconContainer: {
        backgroundColor: Colors.NEW,
        width: 80,
        height: 80,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
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
    image: {
        resizeMode: "contain",
        width: 64,
        height: 64,
    },
    video: {
        resizeMode: "contain",
        width: 128,
        height: 128,
    },
});