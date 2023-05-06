import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Audio } from 'expo-av';
import { Heading, HStack, Spinner } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import GestureFlipView from "react-native-gesture-flip-card";
import { Colors, FontSize, IconSize } from "@/Theme";
import { Item } from "@/Services";
import { Config } from "@/Config";

const screenWidth: number = Dimensions.get("window").width;
const screenHeight: number = Dimensions.get("window").height;

const recallButton: boolean = false;

export interface IFrontFlashProps {
  audio_url: string | undefined;
  content: string | undefined;
};

export interface IBackFlashProps {
  content: string | undefined;
  translation: string | undefined;
  items: Item[] | undefined;
};

export interface IFlashProps {
  id: number | undefined;
  type: string | undefined;
  audio_url: string | undefined;
  content: string | undefined;
  translation: string | undefined;
  items: Item[] | undefined;
};

const renderFront = (props: IFrontFlashProps) => {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const [isLoadingSound, setIsLoadingSound] = useState(false);

  const createSpeedAlert = () => {
    Alert.alert(
        "Audio Speed",
        "Updating...",
        [
            {
                text: "OK",
                onPress: () => {
                    
                },
            },
        ]
    );
  };

  async function playSound() {
    console.log("Loading Sound");
    setIsLoadingSound(true);
    const { sound } = await Audio.Sound.createAsync(
      { uri: props.audio_url ? Config.API_APP_URL.slice(0, -1) + props.audio_url : "" }
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
    <View style={styles.cardContainerFront}>
      <Text style={{ fontSize: FontSize.LARGE, color: Colors.TEXT }}>
        {props.content}{"\n"}
      </Text>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: Colors.NEW}]} onPress={playSound}>
        <Ionicons
          name="volume-high-outline"
          size={IconSize.HUGE}
          color={Colors.TEXT}
        />
      </TouchableOpacity>
      {isLoadingSound ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color={Colors.PRIMARY} fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <Text></Text>
      )}
      <TouchableOpacity 
        style={{ flexDirection: "row" }}
        onPress={() => createSpeedAlert()}
      >
        <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
          Normal
        </Text>
        <Ionicons
          name="chevron-down"
          size={IconSize.SMALL}
          color={Colors.TEXT}
        />
      </TouchableOpacity>
    </View>
  );
};

const renderBack = (props: IBackFlashProps) => {

  const getSmartBold = (text: string) => {
    // Split the text around *
    const arr = text.split("*");

    // Here we will store an array of Text components
    var newTextArr: any[] = [];

    // Loop over split text
    arr.forEach((element, index) => {
      // If its an odd element then it is inside *...* block
      if (index % 2 !== 0) {
        // Wrap with bold text style
        const newElement = <Text key={index} style={{ fontSize: FontSize.SMALL, fontWeight: "700" }}>{element}</Text>;
        newTextArr.push(newElement);
      } else {
        // Simple Text
        const newElement = <Text key={index} style={{ fontSize: FontSize.SMALL, fontWeight: "normal" }}>{element}</Text>;
        newTextArr.push(newElement);
      }
    });

    return newTextArr;
  }

  const mapText = (element: Item, index: number) => {
    return (
      <View key={index}>
        {
          element.type === "h"
          ?
            <Text style={{ fontSize: FontSize.REGULAR, fontWeight: "700", fontStyle: "italic" }}>
              {element.content}
            </Text>
          :
            <Text>
              {getSmartBold(element.content)}
            </Text>
        }
      </View>
    )
  };
  
  return (
    <View style={styles.cardContainerBack}>
      {recallButton ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
            {props.translation}
          </Text>
        </View>
      ) : (
        <>
          <Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
            {props.content}
          </Text>
          <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
            {props.translation}
          </Text>
          <View style={styles.detailContainer}>
            { 
              props.items?.map(mapText as any)
            }
          </View>
        </>
      )}
    </View>
  );
};

export const FCard = (props: IFlashProps) => {

  const frontProps: IFrontFlashProps = {
    audio_url: props.audio_url,
    content: props.content,
  }

  const backProps: IBackFlashProps = {
    content: props.content,
    translation: props.translation,
    items: props.items,
  }

  return (
    <View style={styles.container}>
      <GestureFlipView width={300} height={300}>
        {renderFront(frontProps)}
        {renderBack(backProps)}
      </GestureFlipView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainerFront: {
    flex: 1,
    backgroundColor: Colors.FLASHCARD,
    borderRadius: 20,
    width: screenWidth - 40,
    height: 320,
    marginVertical: 5,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardContainerBack: {
    flex: 1,
    backgroundColor: Colors.FLASHCARD,
    borderRadius: 20,
    width: screenWidth - 40,
    height: 320,
    marginVertical: 5,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
