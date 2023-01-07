import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Audio } from 'expo-av';
import { Heading, HStack, Spinner } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingDots from "react-native-loading-dots";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality, IOSOutputFormat } from "expo-av/build/Audio";
import { Colors, FontSize, IconSize } from "@/Theme";
import { AiResult, FCard } from "@/Components";
import { LessonDetail } from "@/Services";
import { Config } from "@/Config";
import { MainScreens } from "..";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

export interface ILessonProps {
  isLoading: boolean;
  lesson: LessonDetail | undefined;
  onNavigate: (string: MainScreens) => void;
};

const recallButton: boolean = false;

export const Lesson = (props: ILessonProps) => {
  const { isLoading, lesson, onNavigate } = props;

  const [recording, setRecording] = useState<Audio.Recording | undefined>();

  const [uri, setUri] = useState<string>("");

  const [id, setId] = useState(0);

  const [isChanged, setIsChanged] = useState(false);

  const [currentLesson, setCurrentLesson] = useState(lesson);

  // const [timeId, setTimeId] = useState<TimeoutId>();

  const defaultImage: number = require("../../../assets/smile.png");

  const total = currentLesson ? currentLesson?.cards.total : 10;

  const recordingSettings = {
    isMeteringEnabled: true,
    android: {
      extension: '.wav',
      outputFormat: AndroidOutputFormat.MPEG_4,
      audioEncoder: AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      outputFormat: IOSOutputFormat.MPEG4AAC,
      audioQuality: IOSAudioQuality.MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: 'audio/wav',
      bitsPerSecond: 128000,
    },
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingSettings);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
      // setTimeId(setTimeout(stopRecording, 5000))
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    // clearTimeout(timeId);
    setRecording(undefined);
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uriSend = recording.getURI();
      setUri(uriSend ? uriSend : "");
      setIsChanged(false);
      console.log('Recording stopped and stored at', uriSend);
    }
  }

  useEffect(() => {
    setCurrentLesson(lesson);
  }, [lesson]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => onNavigate(MainScreens.HOME)}
            >
              <Ionicons
                name="chevron-back"
                size={IconSize.HUGE}
                color={Colors.TEXT}
              />
            </TouchableOpacity>
            <View style={styles.textHeaderContainer}>
              <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
                {currentLesson?.name}
              </Heading>
              <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                {currentLesson?.category.name}
              </Text>
            </View>
            <View style={styles.thumbnailHeaderContainer}>
              <Image
                style={styles.thumbnail}
                source={currentLesson?.category.image === "" ? defaultImage : {uri: Config.API_APP_URL.slice(0, -1) + currentLesson?.category.image}}
              />
            </View>
          </View>
          <View style={styles.body}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {recallButton ? (
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  Recall
                </Heading>
              ) : (
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  Learn
                </Heading>
              )}
              <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                {id+1}/{currentLesson?.cards.total}
              </Text>
            </View>
            <FCard 
              id={currentLesson?.cards.value[id].id}
              type={currentLesson?.cards.value[id].type}
              audio_url={currentLesson?.cards.value[id].audio_url}
              content={currentLesson?.cards.value[id].content}
              translation={currentLesson?.cards.value[id].translation}
              items={currentLesson?.cards.value[id].items}
            />
            {recallButton ? (
              <></>
            ) : (
              <View>
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  Practice
                </Heading>
                { 
                  isChanged ? null
                  : <AiResult transcript={currentLesson ? currentLesson.cards.value[id].content : ""} uri={uri} />
                }
              </View>
            )}
          </View>
          <View style={{width: "15%", justifyContent: "space-evenly"}}>
            {recording ? <LoadingDots dots={3} color={[Colors.PRIMARY, Colors.NEW, Colors.FLASHCARD]} size={IconSize.TINY} bounceHeight={IconSize.TINY} /> : null}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => {
                setIsChanged(true);
                setId(id-1 > 0 ? id-1 : 0);
              }}>
              <Ionicons
                name="chevron-back"
                size={IconSize.LARGE}
                color={id > 0 ? Colors.TEXT : Colors.INPUT_BACKGROUND}
              />
            </TouchableOpacity>
            {recallButton ? (
              <></>
            ) : (
              <View style={{flexDirection: "column"}}>
                <TouchableOpacity style={[styles.iconContainer, {backgroundColor: recording ? Colors.PRIMARY : Colors.NEW}]} onPressIn={startRecording} onPressOut={stopRecording}>
                  <Ionicons
                    name="mic-outline"
                    size={IconSize.HUGE}
                    color={Colors.TEXT}
                  />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => {
                setIsChanged(true);
                setId(id+1 < total ? id+1 : total-1);
              }}>
              <Ionicons
                name="chevron-forward"
                size={IconSize.LARGE}
                color={id < total-1 ? Colors.TEXT : Colors.INPUT_BACKGROUND}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.INPUT_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    paddingRight: 20,
  },
  backContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textHeaderContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  thumbnailHeaderContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  body: {
    flex: 6,
    width: "100%",
    padding: 20,
    overflow: "hidden",
  },
  footer: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  thumbnail: {
    resizeMode: "contain",
    width: 80,
    height: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
