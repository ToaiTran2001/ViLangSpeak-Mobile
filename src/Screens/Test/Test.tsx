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
import {
    ListCategory,
    ListTestInfo,
    ListProgressTest,
    Category,
    ProgressTest,
    TestInfo,
    Profile,
} from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalTCard, SmallTCard } from "@/Components";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface ITestProps {
    isLoading: boolean;
    profile: Profile | undefined;
    allCategories: ListCategory | undefined;
    recommendTests: ListTestInfo | undefined;
    allTests: ListTestInfo | undefined;
    allProgressesTest: ListProgressTest | undefined;
    onNavigateTestDetail: (accountId: number | undefined, testId: number) => void;
    onNavigateTestMore: (accountId: number | undefined, allTestsUser: TestInfoUser[]) => void;
}

export interface TestInfoUser {
    id: number;
    name: string;
    visible: boolean;
    category: Category | undefined;
    progress: ProgressTest | undefined;
}

export const Test = (props: ITestProps) => {
    const {
        isLoading,
        profile,
        allCategories,
        recommendTests,
        allTests,
        allProgressesTest,
        onNavigateTestDetail,
        onNavigateTestMore
    } = props;

    const [currentAccount, setCurrentAccount] = useState(profile?.account);

    const [recommendTestsUser, setRecommendTestsUser] = useState<TestInfoUser[]>(
        []
    );

    const [allTestsUser, setAllTestsUser] = useState<TestInfoUser[]>([]);

    const [loadMore, setLoadMore] = useState(false);

    const mapTestUser = (test: TestInfo) => {
        return {
            id: test.id,
            name: test.name,
            visible: test.visible,
            category: allCategories?.categories[test.category - 1],
            progress: allProgressesTest?.progresses.find(
                (progress) => progress.test === test.id
            ),
        };
    };

    useEffect(() => {
        setCurrentAccount(profile?.account);
        setRecommendTestsUser(
            recommendTests ? recommendTests.tests.map(mapTestUser as any) : []
        );
        setAllTestsUser(allTests ? allTests.tests.map(mapTestUser as any) : []);
    }, [
        profile?.account,
        recommendTests?.tests,
        allTests?.tests,
        allCategories?.categories,
        allProgressesTest?.progresses,
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
                                Test
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
                                data={recommendTestsUser}
                                keyExtractor={(item: TestInfoUser) => String(item.id)}
                                renderItem={({ item }) => (
                                    <SmallTCard
                                        id={item.id}
                                        name={item.name}
                                        visible={item.visible}
                                        category={item.category}
                                        progress={item.progress}
                                        onPress={() => onNavigateTestDetail(currentAccount?.id, item.id)}
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
                            <View>
                                <Heading style={styles.textTitle}>
                                    All tests
                                </Heading>
                            </View>
                            <TouchableOpacity 
                                style={{ flexDirection: "row" }}
                                onPress={() => onNavigateTestMore(currentAccount?.id, allTestsUser)}
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
                                data={allTestsUser}
                                keyExtractor={(item: TestInfoUser) => String(item.id)}
                                renderItem={({ item }) => (
                                    <NormalTCard
                                        id={item.id}
                                        name={item.name}
                                        visible={item.visible}
                                        category={item.category}
                                        progress={item.progress}
                                        onPress={() => onNavigateTestDetail(currentAccount?.id, item.id)}
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
                                    setAllTestsUser(
                                        allTests
                                        ? allTests.tests.concat([]).map(mapTestUser as any)
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
        flex: 7.5,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    logoHeaderContainer: {
        flex: 2.5,
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
