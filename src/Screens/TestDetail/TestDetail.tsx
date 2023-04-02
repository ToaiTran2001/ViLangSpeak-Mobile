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
  // isLoading: boolean;
  // test: TestDetailData | undefined;
  onNavigate: (screen: MainScreens) => void;
};

export const TestDetail = (props: ITestDetailProps) => {
  // const { isLoading, test, onNavigate } = props;

  const {onNavigate} = props;

  // const [currentTest, setCurrentTest] = useState(test);

  const [id, setId] = useState(0);

  const [isChanged, setIsChanged] = useState(false);

  const defaultImage: string = "/public/image/test-default.png";

  // const total = currentTest ? currentTest?.questions.total : 10;

  const total = 10;

  // useEffect(() => {
  //   setCurrentTest(test);
  // }, [test]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : ( */}
        <>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.backContainer}
                onPress={() => onNavigate(MainScreens.TEST)}
                >
                <Ionicons
                    name="chevron-back"
                    size={IconSize.HUGE}
                    color={Colors.TEXT}
                />
                </TouchableOpacity>
                <View style={styles.textHeaderContainer}>
                <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
                    {/* {currentTest?.name} */}
                    Hello
                </Heading>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                    {/* {currentTest?.category.name} */}
                    Category 1
                </Text>
                </View>
                <View style={styles.thumbnailHeaderContainer}>
                <Image
                    style={styles.thumbnail}
                    source={require("../../../assets/smile.png")}
                    // source={{uri: Config.API_APP_URL.slice(0, -1) + (currentTest?.category.image === "" ? defaultImage : currentTest?.category.image)}}
                />
                </View>
            </View>
          <View style={styles.body}>
            <View style={{ flex: 1 }}>
              <View>
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  {/* Question {id+1}/{currentTest?.questions.total} */}
                  Question 1/10
                </Heading>
              </View>
              <View style={{ height: 96 }}>
                <Question
                  // id={currentTest?.questions.value[id].id}
                  // question_type={currentTest?.questions.value[id].question_type}
                  // type={currentTest?.questions.value[id].type}
                  // content={currentTest?.questions.value[id].content}
                  id={0}
                  question_type="sc"
                  type="p"
                  content="This is an example question header"
                />
              </View>    
            </View>
            <View style={{ flex: 2 }}>
              <View>
                  <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                      Choose the correct answers
                  </Heading>
              </View>
              <View style={{ height: "90%", marginVertical: 10 }}>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                      <Answer
                          // id={currentTest?.questions.value[id].items[0].id}
                          // type={currentTest?.questions.value[id].items[0].type}
                          // content={currentTest?.questions.value[id].items[0].content}
                          // answer={currentTest?.questions.value[id].items[0].answer}
                          id={0}
                          type="p"
                          content="Option 1"
                          answer={0}
                          text="A"
                          onPress={() => {return null;}}
                      />
                      <Answer
                          // id={currentTest?.questions.value[id].items[1].id}
                          // type={currentTest?.questions.value[id].items[1].type}
                          // content={currentTest?.questions.value[id].items[1].content}
                          // answer={currentTest?.questions.value[id].items[1].answer}
                          id={1}
                          type="p"
                          content="Option 2"
                          answer={1}
                          text="B"
                          onPress={() => {return null;}}
                      />
                  </View>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                      <Answer
                          // id={currentTest?.questions.value[id].items[2].id}
                          // type={currentTest?.questions.value[id].items[2].type}
                          // content={currentTest?.questions.value[id].items[2].content}
                          // answer={currentTest?.questions.value[id].items[2].answer}
                          id={2}
                          type="p"
                          content="Option 3"
                          answer={0}
                          text="C"
                          onPress={() => {return null;}}
                      />
                      <Answer
                          // id={currentTest?.questions.value[id].items[3].id}
                          // type={currentTest?.questions.value[id].items[3].type}
                          // content={currentTest?.questions.value[id].items[3].content}
                          // answer={currentTest?.questions.value[id].items[3].answer}
                          id={3}
                          type="p"
                          content="Option 4"
                          answer={0}
                          text="D"
                          onPress={() => {return null;}}
                      />
                  </View>
              </View>
            </View>
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
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: FontSize.REGULAR, color: Colors.WHITE }}>Submit</Text>
            </TouchableOpacity>
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
      {/* )} */}
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
    button: {
        backgroundColor: Colors.BUTTON_START,
        width: 100,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
});
