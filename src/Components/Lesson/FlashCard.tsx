import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Audio } from 'expo-av';
import { Colors, FontSize, IconSize } from "@/Theme";
import { Item, FlashCard } from "@/Services";
import { Heading } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import GestureFlipView from "react-native-gesture-flip-card";

const screenWidth: number = Dimensions.get("window").width;
const screenHeight: number = Dimensions.get("window").height;

const recallButton: boolean = false;

export interface IFrontFlashProps {
  audio_url: number;
  content: string;
}

export interface IBackFlashProps {
  content: string;
  translation: string;
  items: Item[];
}

const renderFront = (props: IFrontFlashProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [soundStatus, setSoundStatus] = useState("no sound");

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      props.audio_url
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setSoundStatus("play");
  }

  async function playAndPauseSound() {
    if (sound) {
        if (soundStatus == "play") {
            console.log("Pausing Sound");
            await sound.pauseAsync();
            setSoundStatus("paused");
        } else {
            console.log("Playing Sound");
            await sound.playAsync();
            setSoundStatus("play");
        }
    }
  }

  function playAndPause() {
    switch (soundStatus) {
        case "no sound":
            playSound();
            break;
        case "paused":
        case "play":
            playAndPauseSound();
            break;
    }
  }

  useEffect(() => {
    return () => { sound && sound.unloadAsync(); }
  }, [sound]);

  return (
    <View style={styles.cardContainerFront}>
      <Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
        {props.content}
      </Text>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: soundStatus == "play" ? Colors.PRIMARY : Colors.NEW}]} onPress={playAndPause}>
        <Ionicons
          name="volume-high-outline"
          size={IconSize.HUGE}
          color={Colors.TEXT}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row" }}>
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
            <Heading style={{ fontSize: FontSize.REGULAR, color: Colors.TEXT }}>
              {props.items[0].content}
            </Heading>
            <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
              {props.items[1].content}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export const FCard = (props: FlashCard) => {

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
    height: 300,
    marginVertical: 10,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardContainerBack: {
    flex: 1,
    backgroundColor: Colors.FLASHCARD,
    borderRadius: 20,
    width: screenWidth - 40,
    height: 300,
    marginVertical: 10,
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
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
