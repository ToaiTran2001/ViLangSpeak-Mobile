import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Spinner, Heading, HStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TestDetailData } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { MainScreens } from "..";
import { Config } from "@/Config";
import { Question, Answer } from "@/Components/TestDetail";

export interface ITestDetailProps {
  isLoading: boolean;
  test: TestDetailData | undefined;
  goBack: () => void;
};

export const TestDetail = (props: ITestDetailProps) => {
  const { isLoading, test, goBack } = props;

  const [currentTest, setCurrentTest] = useState(test);

  const [id, setId] = useState(0);

  const [isSubmited, setIsSubmited] = useState(false);

  const defaultImage: string = "/public/image/test-default.png";

  const total = currentTest ? currentTest?.questions.total : 10;

  useEffect(() => {
    setCurrentTest(test);
  }, [test]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color={Colors.PRIMARY} fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.backContainer}
                onPress={() => goBack()}
                >
                <Ionicons
                    name="chevron-back"
                    size={IconSize.HUGE}
                    color={Colors.TEXT}
                />
                </TouchableOpacity>
                <View style={styles.textHeaderContainer}>
                <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
                    {currentTest?.name}
                </Heading>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                    {currentTest?.category.name}
                </Text>
                </View>
                <View style={styles.thumbnailHeaderContainer}>
                <Image
                    style={styles.thumbnail}
                    source={{uri: Config.API_APP_URL.slice(0, -1) + (currentTest?.category.image === "" ? defaultImage : currentTest?.category.image)}}
                />
                </View>
            </View>
          <View style={styles.body}>
            <View style={{ flex: 1 }}>
              <View>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>
                  Question {id+1}/{currentTest?.questions.total}
                </Heading>
              </View>
              <View style={{ height: 96 }}>
                <Question
                  id={currentTest?.questions.value[id].id}
                  question_type={currentTest?.questions.value[id].question_type}
                  type={currentTest?.questions.value[id].type}
                  content={currentTest?.questions.value[id].content}
                />
              </View>    
            </View>
            <View style={{ flex: 2 }}>
              <View>
                  <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>
                      Choose the correct answers
                  </Heading>
              </View>
              <View style={{ height: "90%", marginVertical: 10 }}>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                      <Answer
                          id={currentTest?.questions.value[id].items[0].id}
                          type={currentTest?.questions.value[id].items[0].type}
                          content={currentTest?.questions.value[id].items[0].content}
                          answer={currentTest?.questions.value[id].items[0].answer}
                          text="A"
                          onPress={() => {return null;}}
                      />
                      <Answer
                          id={currentTest?.questions.value[id].items[1].id}
                          type={currentTest?.questions.value[id].items[1].type}
                          content={currentTest?.questions.value[id].items[1].content}
                          answer={currentTest?.questions.value[id].items[1].answer}
                          text="B"
                          onPress={() => {return null;}}
                      />
                  </View>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                      <Answer
                          id={currentTest?.questions.value[id].items[2].id}
                          type={currentTest?.questions.value[id].items[2].type}
                          content={currentTest?.questions.value[id].items[2].content}
                          answer={currentTest?.questions.value[id].items[2].answer}
                          text="C"
                          onPress={() => {return null;}}
                      />
                      <Answer
                          id={currentTest?.questions.value[id].items[3].id}
                          type={currentTest?.questions.value[id].items[3].type}
                          content={currentTest?.questions.value[id].items[3].content}
                          answer={currentTest?.questions.value[id].items[3].answer}
                          text="D"
                          onPress={() => {return null;}}
                      />
                  </View>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => {
                setId(id-1 > 0 ? id-1 : 0);
              }}>
              <Ionicons
                name="chevron-back"
                size={IconSize.LARGE}
                color={id > 0 ? Colors.TEXT : Colors.BACKGROUND}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: FontSize.REGULAR, color: Colors.WHITE }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setId(id+1 < total ? id+1 : total-1);
              }}>
              <Ionicons
                name="chevron-forward"
                size={IconSize.LARGE}
                color={id < total-1 ? Colors.TEXT : Colors.BACKGROUND}
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
        backgroundColor: Colors.BACKGROUND,
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
    button: {
        backgroundColor: Colors.BUTTON_START,
        width: 100,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
});
