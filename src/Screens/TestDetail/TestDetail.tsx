import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Spinner, Heading, HStack } from "native-base";
import { TestDetailData } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { Config } from "@/Config";
import { Question, Answer } from "@/Components/TestDetail";
import { useRecordTestMutation } from "@/Services";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Result } from "./TestDetailContainer";

export interface ITestDetailProps {
	isLoading: boolean;
	test: TestDetailData | undefined;
	testProgress: number | undefined;
	accountId: number | undefined;
	dictResult: {[id: number]: Result;};
	onNavigateTest: () => void;
};

export const TestDetail = (props: ITestDetailProps) => {
	const { isLoading, test, testProgress, accountId, dictResult, onNavigateTest } = props;

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
						recordTest[0]({
							test_id: String(currentTest?.id), 
							record: {
								timestamp: Date.now(), 
								score: score*100/total,
								account_id: accountId ? accountId : 0
							}
						});
						onNavigateTest();
					},
				},
				{
					text: "Cancel",
					onPress: () => {
						
					},
				},
			]
		);
	};

	const createNotSaveAlert = () => {
		Alert.alert(
			"Your score will be not saved!",
			"Are you sure?",
			[
				{
					text: "OK",
					onPress: () => {
						onNavigateTest();
					},
				},
				{
					text: "Cancel",
					onPress: () => {

					},
				},
			]
		);
	};

	useEffect(() => {
		setCurrentTest(test);
	}, [test]);

	useEffect(() => {
		if (isCorrectA && isCorrectB && isCorrectC && isCorrectD) {
			setScore(score+1);
		}
	}, [isCorrectA, isCorrectB, isCorrectC, isCorrectD])

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
							onPress={() => createNotSaveAlert()}
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
										isChoosed={dictResult[id] ? dictResult[id].A.isChoosed : isChoosedA}
										isSubmitted={dictResult[id] ? true : isSubmitted}
										isCorrect={dictResult[id] ? dictResult[id].A.isCorrect : isCorrectA}
										setIsCorrect={dictResult[id] ? () => {} : setIsCorrectA}
										onPress={() => {
											if (!dictResult[id]) {
												if (!isSubmitted) {
													setIsChoosedA(!isChoosedA);
													if (currentTest?.questions.value[id].question_type === "sc") {
														setIsChoosedB(false);
														setIsChoosedC(false);
														setIsChoosedD(false);
													}
												}
											}
										}}
									/>
									<Answer
										id={currentTest?.questions.value[id].items[1].id}
										questionType={currentTest?.questions.value[id].question_type}
										type={currentTest?.questions.value[id].items[1].type}
										content={currentTest?.questions.value[id].items[1].content}
										answer={currentTest?.questions.value[id].items[1].answer}
										text="B"
										isChoosed={dictResult[id] ? dictResult[id].B.isChoosed : isChoosedB}
										isSubmitted={dictResult[id] ? true : isSubmitted}
										isCorrect={dictResult[id] ? dictResult[id].B.isCorrect : isCorrectB}
										setIsCorrect={dictResult[id] ? () => {} : setIsCorrectB}
										onPress={() => {
											if (!dictResult[id]) {
												if (!isSubmitted) {
													setIsChoosedB(!isChoosedB);
													if (currentTest?.questions.value[id].question_type === "sc") {
														setIsChoosedA(false);
														setIsChoosedC(false);
														setIsChoosedD(false);
													}
												}
											}
										}}
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
										isChoosed={dictResult[id] ? dictResult[id].C.isChoosed : isChoosedC}
										isSubmitted={dictResult[id] ? true : isSubmitted}
										isCorrect={dictResult[id] ? dictResult[id].C.isCorrect : isCorrectC}
										setIsCorrect={dictResult[id] ? () => {} : setIsCorrectC}
										onPress={() => {
											if (!dictResult[id]) {
												if (!isSubmitted) {
													setIsChoosedC(!isChoosedC);
													if (currentTest?.questions.value[id].question_type === "sc") {
														setIsChoosedA(false);
														setIsChoosedB(false);
														setIsChoosedD(false);
													}
												}
											}
										}}
									/>
									<Answer
										id={currentTest?.questions.value[id].items[3].id}
										questionType={currentTest?.questions.value[id].question_type}
										type={currentTest?.questions.value[id].items[3].type}
										content={currentTest?.questions.value[id].items[3].content}
										answer={currentTest?.questions.value[id].items[3].answer}
										text="D"
										isChoosed={dictResult[id] ? dictResult[id].D.isChoosed : isChoosedD}
										isSubmitted={dictResult[id] ? true : isSubmitted}
										isCorrect={dictResult[id] ? dictResult[id].D.isCorrect : isCorrectD}
										setIsCorrect={dictResult[id] ? () => {} : setIsCorrectD}
										onPress={() => {
											if (!dictResult[id]) {
												if (!isSubmitted) {
													setIsChoosedD(!isChoosedD);
													if (currentTest?.questions.value[id].question_type === "sc") {
														setIsChoosedA(false);
														setIsChoosedB(false);
														setIsChoosedC(false);
													}
												}
											}
										}}
									/>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.footer}>
						<TouchableOpacity 
							onPress={() => {
								if (isSubmitted) {
									dictResult[id] = {
										A: {
											isChoosed: isChoosedA,
											isCorrect: isCorrectA, 
										},
										B: {
											isChoosed: isChoosedB,
											isCorrect: isCorrectB, 
										},
										C: {
											isChoosed: isChoosedC,
											isCorrect: isCorrectC, 
										},
										D: {
											isChoosed: isChoosedD,
											isCorrect: isCorrectD, 
										},
									};
								}
								setId(id-1 > 0 ? id-1 : 0);
								setIsChoosedA(false);
								setIsChoosedB(false);
								setIsChoosedC(false);
								setIsChoosedD(false);
								setIsCorrectA(false);
								setIsCorrectB(false);
								setIsCorrectC(false);
								setIsCorrectD(false);
								setIsSubmitted(false);
							}}
						>
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
						<TouchableOpacity 
							onPress={() => {
								if (isSubmitted) {
									dictResult[id] = {
										A: {
											isChoosed: isChoosedA,
											isCorrect: isCorrectA, 
										},
										B: {
											isChoosed: isChoosedB,
											isCorrect: isCorrectB, 
										},
										C: {
											isChoosed: isChoosedC,
											isCorrect: isCorrectC, 
										},
										D: {
											isChoosed: isChoosedD,
											isCorrect: isCorrectD, 
										},
									};
								}
								setId(id+1 < total ? id+1 : total-1);
								if (id+1 === total) {
									createCompletedAlert();
								} else {
									setIsChoosedA(false);
									setIsChoosedB(false);
									setIsChoosedC(false);
									setIsChoosedD(false);
									setIsCorrectA(false);
									setIsCorrectB(false);
									setIsCorrectC(false);
									setIsCorrectD(false);
									setIsSubmitted(false);
								}
							}}
						>
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
        height: 80,
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
        marginVertical: 5,
		padding: 5,
    }
});
