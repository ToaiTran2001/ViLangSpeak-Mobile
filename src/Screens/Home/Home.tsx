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
import { HStack, Spinner, Heading } from "native-base";
import {
    Profile,
    ListLessonInfo,
    LessonInfo,
    ListCategory,
    ListProgress,
    Category,
    Progress,
} from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalLCard, SmallLCard } from "@/Components";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface IHomeProps {
    isLoading: boolean;
    profile: Profile | undefined;
    allCategories: ListCategory | undefined;
    recommendLessons: ListLessonInfo | undefined;
    allLessons: ListLessonInfo | undefined;
    allProgresses: ListProgress | undefined;
    onNavigateLesson: (accountId: number | undefined, lessonId: number) => void;
    onNavigateHomeMore: (accountId: number | undefined, allLessonsUser: LessonInfoUser[]) => void;
}

export interface LessonInfoUser {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: Progress | undefined;
}

export const Home = (props: IHomeProps) => {
    const {
        isLoading,
        profile,
        allCategories,
        recommendLessons,
        allLessons,
        allProgresses,
        onNavigateLesson,
        onNavigateHomeMore
    } = props;

    const [currentAccount, setCurrentAccount] = useState(profile?.account);

    const [recommendLessonsUser, setRecommendLessonsUser] = useState<
        LessonInfoUser[]
    >([]);

    const [allLessonsUser, setAllLessonsUser] = useState<LessonInfoUser[]>([]);

    const [loadMore, setLoadMore] = useState(false);

    const mapLessonUser = (lesson: LessonInfo) => {
        return {
            id: lesson.id,
            name: lesson.name,
            visible: lesson.visible,
            category: allCategories?.categories[lesson.category - 1],
            progress: allProgresses?.progresses.find(
                (progress) => progress.lesson === lesson.id
            ),
        };
    };

    useEffect(() => {
        setCurrentAccount(profile?.account);
        setRecommendLessonsUser(
            recommendLessons ? recommendLessons.lessons.map(mapLessonUser as any) : []
        );
        setAllLessonsUser(
            allLessons ? allLessons.lessons.map(mapLessonUser as any) : []
        );
    }, [
        profile?.account,
        recommendLessons?.lessons,
        allLessons?.lessons,
        allCategories?.categories,
        allProgresses?.progresses,
    ]);

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
                        <View style={styles.textHeaderContainer}>
                            <Heading style={styles.textHeader}>
                                Hi, {currentAccount?.name}
                            </Heading>
                            <Heading style={styles.textHeader}>
                                Choose a lesson!
                            </Heading>
                        </View>
                        <View style={styles.logoHeaderContainer}>
                            <Image
                                style={styles.logo}
                                source={require("../../../assets/logo.png")}
                            />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View>
                            <Heading style={styles.textTitle}>
                                Recommend for you
                            </Heading>
                        </View>
                        <View style={{ flex: 4 }}>
                            <FlatList
                                data={recommendLessonsUser}
                                keyExtractor={(item: LessonInfoUser) => String(item.id)}
                                renderItem={({ item }) => (
                                    <SmallLCard
                                        id={item.id}
                                        name={item.name}
                                        visible={item.visible}
                                        category={item.category}
                                        progress={item.progress}
                                        onPress={() => onNavigateLesson(currentAccount?.id, item.id)}
                                    />
                                )}
                                horizontal={true}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Heading style={styles.textTitle}>
                                All lessons
                            </Heading>
                            <TouchableOpacity 
                                style={{ flexDirection: "row" }}
                                onPress={() => onNavigateHomeMore(currentAccount?.id, allLessonsUser)}
                            >
                                <Text
                                    style={styles.textNormal}
                                >
                                    More
                                </Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={IconSize.SMALL}
                                    color={Colors.TEXT}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 9 }}>
                            <FlatList
                                data={allLessonsUser}
                                keyExtractor={(item: LessonInfoUser) => String(item.id)}
                                renderItem={({ item }) => (
                                    <NormalLCard
                                        id={item.id}
                                        name={item.name}
                                        visible={item.visible}
                                        category={item.category}
                                        progress={item.progress}
                                        onPress={() => onNavigateLesson(currentAccount?.id, item.id)}
                                    />
                                )}
                                ListFooterComponent={() => {
                                    return loadMore ? (
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: FontSize.SMALL,
                                                    color: Colors.PRIMARY,
                                                }}
                                            >
                                                Load More
                                            </Text>
                                            <Spinner
                                                accessibilityLabel="Loading posts"
                                                color={Colors.PRIMARY}
                                                size={IconSize.REGULAR}
                                            />
                                        </View>
                                    ) : null;
                                }}
                                onEndReached={() => {
                                    setLoadMore(true);
                                    setTimeout(() => {
                                    setAllLessonsUser(
                                        allLessons
                                        ? allLessons.lessons
                                            .concat([])
                                            .map(mapLessonUser as any)
                                        : []
                                    );
                                    setLoadMore(false);
                                    }, 1000);
                                }}
                                onEndReachedThreshold={0.1}
                            />
                        </View>
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
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flex: 2,
        flexDirection: "row",
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        paddingHorizontal: 20,
    },
    textHeaderContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    logoHeaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    body: {
        flex: 8,
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        overflow: "hidden",
    },
    logo: {
        resizeMode: "contain",
        width: 80,
        height: 80,
    },
    textHeader: {
        fontSize: FontSize.LARGE,
        color: Colors.TEXT,
    },
    textTitle: {
        fontSize: FontSize.REGULAR,
        color: Colors.TEXT,
    },
    textNormal: {
        fontSize: FontSize.SMALL,
        color: Colors.TEXT,
    },
});
