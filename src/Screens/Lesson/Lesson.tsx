import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
	Dimensions
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Audio } from 'expo-av';
import { Heading, HStack, Spinner } from "native-base";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality, IOSOutputFormat } from "expo-av/build/Audio";
import { Colors, FontSize, IconSize } from "@/Theme";
import { AiResult, FCard } from "@/Components";
import { LessonDetail } from "@/Services";
import { Config } from "@/Config";
import { useRecordLessonMutation } from "@/Services";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingDots from "react-native-loading-dots";

const screenWidth: number = Dimensions.get("window").width;
const screenHeight: number = Dimensions.get("window").height;

export interface ILessonProps {
	isLoading: boolean;
	accountId: number | undefined;
	lesson: LessonDetail | undefined;
	lessonProgress: number | undefined;
	onNavigateTestDetail: (accountId: number | undefined, testId: number) => void;
	onNavigateMain: () => void;
};

export const Lesson = (props: ILessonProps) => {
	const { isLoading, accountId, lesson, lessonProgress, onNavigateTestDetail, onNavigateMain } = props;

	const [recording, setRecording] = useState<Audio.Recording | undefined>();

	const [uri, setUri] = useState<string>("");

	const [id, setId] = useState(0);

	const [isChanged, setIsChanged] = useState(false);

	const [currentLesson, setCurrentLesson] = useState(lesson);
	
	const [completed, setCompleted] = useState(false);

	const recordLesson = useRecordLessonMutation();

	const defaultImage: string = "/public/image/lesson-default.png";

	const total = currentLesson ? currentLesson?.cards.total : 1;

	const recordingSettings = {
		isMeteringEnabled: true,
		android: {
			extension: '.wav',
			outputFormat: AndroidOutputFormat.MPEG_4,
			audioEncoder: AndroidAudioEncoder.AAC,
			sampleRate: 16000,
			numberOfChannels: 1,
			bitRate: 128000,
		},
		ios: {
			extension: '.wav',
			// outputFormat: IOSOutputFormat.MPEGLAYER3, // Don't have format runnable
			audioQuality: IOSAudioQuality.MAX,
			sampleRate: 16000,
			numberOfChannels: 1,
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
			const uriSend = recording.getURI();
			setUri(uriSend ? uriSend : "");
			setIsChanged(true);
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
					<Heading color={Colors.PRIMARY} fontSize="md">
						Loading
					</Heading>
				</HStack>
			) : (
				<>
					<View style={styles.header}>
						<TouchableOpacity
							style={styles.backContainer}
							onPress={() => {
								recordLesson[0]({
									lesson_id: String(currentLesson?.id), 
									record: {
										timestamp: Date.now(), 
										value: lessonProgress 
										? (id+1)*100/total < lessonProgress ? lessonProgress : (id+1)*100/total
										: (id+1)*100/total,
										account_id: accountId ? accountId : 0
									}
								});
								onNavigateMain();
							}}
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
								source={{uri: currentLesson?.category.image ? String(new URL(currentLesson.category.image === "" ? defaultImage : currentLesson?.category.image, Config.API_APP_URL)) : undefined}}
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
							<Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
								Learn
							</Heading>
							<Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
								{id < total ? id+1 : total}/{total}
							</Text>
						</View>
						{ 
							completed 
							? 
								<View style={styles.cardContainerFront}>
									<Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
										Congratulation!
									</Text>
									<Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
										You have completed 
									</Text>
									<Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
										this lesson.
									</Text>
									<Text style={{ fontSize: FontSize.MEDIUM, color: Colors.TEXT }}>
										Go to test now!
									</Text>
								</View>
							: 
								<FCard 
									id={currentLesson?.cards.value[id].id}
									type={currentLesson?.cards.value[id].type}
									audio_url={currentLesson?.cards.value[id].audio_url}
									content={currentLesson?.cards.value[id].content}
									translation={currentLesson?.cards.value[id].translation}
									items={currentLesson?.cards.value[id].items}
								/>
						}
						<View>
							<Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
								Practice
							</Heading>
							{ 
								isChanged 
								? <AiResult transcript={currentLesson ? currentLesson.cards.value[id].content : ""} uri={uri} />
								: null
							}
						</View>
					</View>
					<View style={{width: "15%", justifyContent: "space-evenly"}}>
						{recording ? <LoadingDots dots={3} color={[Colors.PRIMARY, Colors.NEW, Colors.FLASHCARD]} size={IconSize.TINY} bounceHeight={IconSize.TINY} /> : null}
					</View>
					<View style={styles.footer}>
						<TouchableOpacity 
							onPress={() => {
								setIsChanged(false);
								if (completed) {
									setId(id);
									setCompleted(false);
								} else {
									setId(id-1 > 0 ? id-1 : 0);
								}
						}}>
							<Ionicons
								name="chevron-back"
								size={IconSize.HUGE}
								color={id > 0 ? Colors.TEXT : Colors.BACKGROUND}
							/>
						</TouchableOpacity>
						{ 
							completed 
							? 
								<TouchableOpacity 
									style={styles.button}
									onPress={() => {recordLesson[0]({lesson_id: String(currentLesson?.id), record: {timestamp: Date.now(), value: 100, account_id: accountId ? accountId : 0}});onNavigateTestDetail(accountId, currentLesson ? currentLesson.test : 0)}}
								>
									<Text style={{ fontSize: FontSize.REGULAR, color: Colors.WHITE }}>Go</Text>
								</TouchableOpacity>
							:
								<View style={{flexDirection: "column"}}>
									<Pressable 
									style={[styles.iconContainer, {backgroundColor: recording ? Colors.PRIMARY : Colors.NEW}]}
									onLongPress={startRecording}
									onPressOut={stopRecording}
									delayLongPress={100}
									>
									<Ionicons
										name="mic-outline"
										size={IconSize.HUGE}
										color={Colors.TEXT}
									/>
									</Pressable>
								</View>
						}
						<TouchableOpacity 
							onPress={() => {
								setIsChanged(false);
								if (id+1 < total) {
									setId(id+1);
								} else {
									setId(total-1);
									setCompleted(true);
								}
							}}
						>
							<Ionicons
								name="chevron-forward"
								size={IconSize.HUGE}
								color={!completed ? Colors.TEXT : Colors.BACKGROUND}
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
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	thumbnail: {
		resizeMode: "contain",
		width: 60,
		height: 60,
	},
	iconContainer: {
		width: 80,
		height: 80,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainerFront: {
		flex: 1,
		backgroundColor: Colors.FLASHCARD,
		width: screenWidth - 40,
		height: 100,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5,
		padding: 10,
	},
	button: {
		backgroundColor: Colors.BUTTON_START,
		width: 100,
		height: 60,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5,
		padding: 5,
	}
});
