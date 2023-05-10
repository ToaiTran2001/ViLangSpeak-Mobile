import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Spinner, Heading } from "native-base";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalLCard } from "@/Components";
import { LessonInfoUser } from "../Home/Home";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface IHomeMoreProps {
    accountId: number | undefined;
    allLessonsUser: LessonInfoUser[];
    onNavigateLesson: (accountId: number | undefined, lessonId: number) => void;
    goBack: () => void;
}

export const HomeMore = (props: IHomeMoreProps) => {
    const {
        accountId,
        allLessonsUser,
        onNavigateLesson,
        goBack
    } = props;

    const [loadMore, setLoadMore] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
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
                    <Heading style={styles.textHeader}>
                        All lessons
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
                <View style={{ flex: 1 }}>
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
                                onPress={() => onNavigateLesson(accountId, item.id)}
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
                            setLoadMore(false);
                            }, 1000);
                        }}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
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
    logoHeaderContainer: {
        flex: 4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    body: {
        flex: 8,
        width: "100%",
        padding: 20,
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
