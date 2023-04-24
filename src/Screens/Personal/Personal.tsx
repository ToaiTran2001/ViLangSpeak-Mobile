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
import { NormalACard } from "@/Components";
import { Profile, ListAchievement, Achievement } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { useDispatch } from "react-redux";
import { logOut } from "@/Store/reducers";

export interface IPersonalProps {
    profile: Profile | undefined;
    listAchievement: ListAchievement | undefined;
    isLoading: boolean;
}

export const Personal = (props: IPersonalProps) => {
    const { profile, listAchievement, isLoading } = props;

    const dispatch = useDispatch();

    const [currentAccount, setCurrentAccount] = useState(profile?.account);

    const [currentAchievements, setCurrentAchievements] = useState(
        listAchievement?.achievements
    );

    const [loadMore, setLoadMore] = useState(false);

    const createAboutAlert = () => {
        Alert.alert(
            "ViLangSpeak",
            "Authors: Hòa - Toại - Tuấn\nImages: flaticon.com",
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed"),
                },
            ]
        );
    };

    const createLogoutAlert = () => {
        Alert.alert(
            "Log out",
            "Do you want to log out?",
            [
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(logOut());
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout cancelled"),
                },
            ]
        );
    };

    useEffect(() => {
        setCurrentAccount(profile?.account);
        setCurrentAchievements(listAchievement?.achievements);
    }, [profile?.account, listAchievement?.achievements]);

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
                        Personal
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
                <View style={{ flex: 1.5 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Heading style={styles.textTitle}>
                            Profile
                        </Heading>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Ionicons
                                name="chevron-down"
                                size={IconSize.SMALL}
                                color={Colors.TEXT}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textNormal}>
                        Username: {currentAccount?.name}
                    </Text>
                </View>
                <View style={{ flex: 6, overflow: "hidden" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Heading style={styles.textTitle}>
                            Achievements
                        </Heading>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Ionicons
                                name="chevron-down"
                                size={IconSize.SMALL}
                                color={Colors.TEXT}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={currentAchievements}
                            keyExtractor={(item: Achievement) => String(item.id)}
                            renderItem={({ item }) => (
                                <NormalACard
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    date={item.date}
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
                                setCurrentAchievements(
                                    listAchievement?.achievements.concat([])
                                );
                                setLoadMore(false);
                                }, 1000);
                            }}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                </View>
                <View style={{ flex: 2.5 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                    >
                        <Heading style={styles.textTitle}>
                            Settings
                        </Heading>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Ionicons
                                name="chevron-down"
                                size={IconSize.SMALL}
                                color={Colors.TEXT}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textNormal}>
                        Language: English
                    </Text>
                    <Text style={styles.textNormal}>
                        Theme: Default
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            onPress={createAboutAlert}
                            style={{
                                backgroundColor: Colors.PRIMARY,
                                width: 84,
                                height: 36,
                                borderRadius: 10,
                                marginVertical: 5,
                                padding: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={styles.textNormal}
                            >
                                About
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={createLogoutAlert}
                            style={{
                                backgroundColor: Colors.PRIMARY,
                                width: 84,
                                height: 36,
                                borderRadius: 10,
                                marginVertical: 5,
                                padding: 5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={styles.textNormal}
                            >
                                Log out
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: "center",
        justifyContent: "center",
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
        padding: 20,
        overflow: "hidden",
    },
    logo: {
        resizeMode: "contain",
        width: 80,
        height: 60,
    },
    iconFooterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
