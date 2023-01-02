import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Audio } from 'expo-av';
import { Heading } from "native-base";
import { LessonCard, Item } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { FCard } from "@/Components";
import { MainScreens } from "..";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality, IOSOutputFormat } from "expo-av/build/Audio";
import { AudioType, useAiPredictionMutation } from "@/Services/ai";
import * as RNFS from "react-native-fs";
import * as FileSystem from 'expo-file-system';
import axios from "axios";

export interface ILessonProps {
  // data: LessonCard;
  onNavigate: (string: MainScreens) => void;
}

const recallButton: boolean = false;

// const renderCounter  = useRef(0);
// renderCounter.current = renderCounter.current + 1;

export const Counter = ({title = "", color = ""}) => {
  
  return (
    <Text 
      style={{ fontSize: FontSize.REGULAR, color: color }}
    >{title}{" "}
    </Text>
  );
};

export const Lesson = (props: ILessonProps) => {
  // const { data, onNavigate } = props;
  const { onNavigate } = props;

  const [recording, setRecording] = useState<Audio.Recording | undefined>();

  const [uriSend, setUriSend] = useState<string | null>(null);

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
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      setUriSend(uri);
      console.log('Recording stopped and stored at', uri);
    }
  }

  const flashCards = [
    {
      id: 0,
      type: "w",
      audio_url: require("../../../assets/happy_new_year.mp3"),
      content: "tôi",
      translation: "I, me",
      items: [
        {
            type: "h", // header, possible values: ["h", "p", "i", "v"]
            order: 0, // appear at first
            content: "Examples:",
        },
        {
            type: "p", // paragraph
            order: 1, // appear as second, after above header
            content: "*Tôi* là một bác sĩ.\n*I* am a doctor.\n\nNgười phụ trách là *tôi*.\nThe person in charge is *me*.",
        }
      ]
    },
    {
      id: 1,
      type: "w",
      audio_url: require("../../../assets/happy_new_year.mp3"),
      content: "bạn",
      translation: "you, friend",
      items: [
        {
            type: "h", // header, possible values: ["h", "p", "i", "v"]
            order: 0, // appear at first
            content: "Examples:",
        },
        {
            type: "p", // paragraph
            order: 1, // appear as second, after above header
            content: "*Bạn* là ai?\nWho are *you*?\n\nAnh ấy là *bạn* của tôi.\nHe is my *friend*.",
        }
      ]
    },
    {
      id: 2,
      type: "s", // sentence
      audio_url: require("../../../assets/happy_new_year.mp3"),
      content: "xin chào",
      translation: "hello, hi",
      items: [
          {
              type: "h", // Image
              order: 0,
              content: "Usage",
          },
          {
              type: "p", // video
              order: 1,
              content: "This word can be use as a sentence to greet people formally.\nIt can be use as *chào*, but it can have different meaning depending on context.",
          }
      ]
    }
  ]

  const [id, setId] = useState(0)

  const [uploadRecord, { data, isSuccess, isLoading, error }] =
    useAiPredictionMutation();

  useEffect(() => {
    const uri = uriSend || "";
    const fileUri =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    // if (fileUri) {
    //   RNFS.readFile(fileUri).then((file) => {
    //     const formData = new FormData();
    //     formData.append("transcript", flashCards[id].content);
    //     formData.append("audio", file);
    //     uploadRecord(formData);
    //   })
    // }
    const formData = new FormData();
    formData.append("transcript", flashCards[id].content);
    formData.append("audio", {
      uri: fileUri,
      name: `record.${fileType}`,
      type: `audio/${fileType}`,
    } as any);
    // formData.append("audio", file);
    uploadRecord(formData);
    console.log(formData);
    console.log(data as AudioType);
    console.log(isLoading);
    console.log(isSuccess);
    console.log(error);
  }, [uriSend]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
            Get to know
          </Heading>
          <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
            Greeting
          </Text>
        </View>
        <View style={styles.thumbnailHeaderContainer}>
          <Image
            style={styles.thumbnail}
            source={require("../../../assets/smile.png")}
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
            {id+1}/3
          </Text>
        </View>
        <FCard 
          id={flashCards[id].id}
          type={flashCards[id].type}
          audio_url={flashCards[id].audio_url}
          content={flashCards[id].content}
          translation={flashCards[id].translation}
          items={flashCards[id].items}
        />
        {recallButton ? (
          <></>
        ) : (
          <View>
            <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
              Practice
            </Heading>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {Counter({title: flashCards[id].content.split(" ")[0], color: Colors.TEXT})}
            </View>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setId(id-1 > 0 ? id-1 : 0)}>
          <Ionicons
            name="chevron-back"
            size={IconSize.LARGE}
            color={id > 0 ? Colors.TEXT : Colors.INPUT_BACKGROUND}
          />
        </TouchableOpacity>
        {recallButton ? (
          <></>
        ) : (
          <TouchableOpacity style={[styles.iconContainer, {backgroundColor: recording ? Colors.PRIMARY : Colors.NEW}]} onPress={recording ? stopRecording : startRecording}>
            <Ionicons
              name="mic-outline"
              size={IconSize.HUGE}
              color={Colors.TEXT}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setId(id+1 < 2 ? id+1 : 2)}>
          <Ionicons
            name="chevron-forward"
            size={IconSize.LARGE}
            color={id < 2 ? Colors.TEXT : Colors.INPUT_BACKGROUND}
          />
        </TouchableOpacity>
      </View>
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
    flex: 6.5,
    width: "100%",
    padding: 20,
    overflow: "hidden",
  },
  footer: {
    flex: 1.5,
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
