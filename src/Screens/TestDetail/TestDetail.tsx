import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Spinner, Heading, HStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TestDetailData } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { Config } from "@/Config";
import { Question, Answer } from "@/Components/TestDetail";
import { useRecordTestMutation } from "@/Services";

export interface ITestDetailProps {
  isLoading: boolean;
  test: TestDetailData | undefined;
  testProgress: number | undefined;
  accountId: number | undefined;
  goBack: () => void;
};

export const TestDetail = (props: ITestDetailProps) => {
  const { isLoading, test, testProgress, accountId, goBack } = props;

  const [currentTest, setCurrentTest] = useState(test);

  const [id, setId] = useState(0);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isChoosedA, setIsChoosedA] = useState(false);

  const [isChoosedB, setIsChoosedB] = useState(false);

  const [isChoosedC, setIsChoosedC] = useState(false);

  const [isChoosedD, setIsChoosedD] = useState(false);

  const [isCorrectA, setIsCorrectA] = useState(false);

  const [isCorrectB, setIsCorrectB] = useState(false);

  const [isCorrectC, setIsCorrectC] = useState(false);

  const [isCorrectD, setIsCorrectD] = useState(false);

  const [score, setScore] = useState(0);

  const defaultImage: string = "/public/image/test-default.png";

  const total = currentTest ? currentTest?.questions.total : 10;

  const recordTest = useRecordTestMutation();

  const createCompletedAlert = () => {
    Alert.alert(
        "Congratulation",
        "You have completed this test!",
        [
            {
                text: "OK",
                onPress: () => {
                  recordTest[0]({test_id: String(currentTest?.id), record: {timestamp: Date.now(), score: testProgress ? score < testProgress ? testProgress : score : score, account_id: String(accountId)}});setTimeout(() => {goBack();}, 500);
                },
            },
        ]
    );
};

  useEffect(() => {
    setCurrentTest(test);
  }, [test]);

  useEffect(() => {
    if (isCorrectA && isChoosedB && isCorrectC && isCorrectD) {
      setScore(score+1);
    }
  }, [isCorrectA, isChoosedB, isCorrectC, isChoosedD])

  console.log(recordTest[1].data);

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
            <View style={{ flex: 2 }}>
              <View>
                <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>
                  Question {id+1}/{currentTest?.questions.total}
                </Heading>
              </View>
              <Question
                id={currentTest?.questions.value[id].id}
                questionType={currentTest?.questions.value[id].question_type}
                type={currentTest?.questions.value[id].type}
                content={currentTest?.questions.value[id].content}
              />
            </View>
            <View style={{ flex: 3 }}>
              <View>
                  <Heading fontSize={FontSize.REGULAR} color={Colors.TEXT}>
                      Choose the correct answers
                  </Heading>
              </View>
              <View style={{ height: "90%", marginVertical: 10 }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <Answer
                        id={currentTest?.questions.value[id].items[0].id}
                        questionType={currentTest?.questions.value[id].question_type}
                        type={currentTest?.questions.value[id].items[0].type}
                        content={currentTest?.questions.value[id].items[0].content}
                        answer={currentTest?.questions.value[id].items[0].answer}
                        text="A"
                        isChoosed={isChoosedA}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrectA}
                        setIsCorrect={setIsCorrectA}
                        onPress={() => 
                          {
                            setIsChoosedA(!isChoosedA);
                            if (currentTest?.questions.value[id].question_type === "sc")
                            {
                              setIsChoosedB(false);
                              setIsChoosedC(false);
                              setIsChoosedD(false);
                            }
                          }
                        }
                    />
                    <Answer
                        id={currentTest?.questions.value[id].items[1].id}
                        questionType={currentTest?.questions.value[id].question_type}
                        type={currentTest?.questions.value[id].items[1].type}
                        content={currentTest?.questions.value[id].items[1].content}
                        answer={currentTest?.questions.value[id].items[1].answer}
                        text="B"
                        isChoosed={isChoosedB}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrectB}
                        setIsCorrect={setIsCorrectB}
                        onPress={() => 
                          {
                            setIsChoosedB(!isChoosedB);
                            if (currentTest?.questions.value[id].question_type === "sc")
                            {
                              setIsChoosedA(false);
                              setIsChoosedC(false);
                              setIsChoosedD(false);
                            }
                          }
                        }
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <Answer
                        id={currentTest?.questions.value[id].items[2].id}
                        questionType={currentTest?.questions.value[id].question_type}
                        type={currentTest?.questions.value[id].items[2].type}
                        content={currentTest?.questions.value[id].items[2].content}
                        answer={currentTest?.questions.value[id].items[2].answer}
                        text="C"
                        isChoosed={isChoosedC}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrectC}
                        setIsCorrect={setIsCorrectC}
                        onPress={() => 
                          {
                            setIsChoosedC(!isChoosedC);
                            if (currentTest?.questions.value[id].question_type === "sc")
                            {
                              setIsChoosedA(false);
                              setIsChoosedB(false);
                              setIsChoosedD(false);
                            }
                          }
                        }
                    />
                    <Answer
                        id={currentTest?.questions.value[id].items[3].id}
                        questionType={currentTest?.questions.value[id].question_type}
                        type={currentTest?.questions.value[id].items[3].type}
                        content={currentTest?.questions.value[id].items[3].content}
                        answer={currentTest?.questions.value[id].items[3].answer}
                        text="D"
                        isChoosed={isChoosedD}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrectD}
                        setIsCorrect={setIsCorrectD}
                        onPress={() => 
                          {
                            setIsChoosedD(!isChoosedD);
                            if (currentTest?.questions.value[id].question_type === "sc")
                            {
                              setIsChoosedA(false);
                              setIsChoosedB(false);
                              setIsChoosedC(false);
                            }
                          }
                        }
                    />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => {
                setId(id-1 > 0 ? id-1 : 0);
                setIsChoosedA(false);
                setIsChoosedB(false);
                setIsChoosedC(false);
                setIsChoosedD(false);
                setIsCorrectA(false);
                setIsChoosedB(false);
                setIsChoosedC(false);
                setIsChoosedD(false);
                setIsSubmitted(false);
              }}>
              <Ionicons
                name="chevron-back"
                size={IconSize.LARGE}
                color={id > 0 ? Colors.TEXT : Colors.BACKGROUND}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => {
                setIsSubmitted(true);
              }}
            >
              <Text style={{ fontSize: FontSize.REGULAR, color: Colors.WHITE }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setId(id+1 < total ? id+1 : total-1);
                if (id+1 === total) {
                  createCompletedAlert();
                } else {
                  setIsChoosedA(false);
                  setIsChoosedB(false);
                  setIsChoosedC(false);
                  setIsChoosedD(false);
                  setIsSubmitted(false);
                  setIsCorrectA(false);
                  setIsChoosedB(false);
                  setIsChoosedC(false);
                  setIsChoosedD(false);
                }
              }}>
              <Ionicons
                name="chevron-forward"
                size={IconSize.LARGE}
                color={id < total ? Colors.TEXT : Colors.BACKGROUND}
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
    button: {
        backgroundColor: Colors.BUTTON_START,
        width: 100,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
});
