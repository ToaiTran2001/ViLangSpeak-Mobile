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
import { NormalACard } from "@/Components";
import { Profile, ListAchievement, Achievement } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { useDispatch } from "react-redux";
import { logOut } from "@/Store/reducers";
import Ionicons from "@expo/vector-icons/Ionicons";

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

    const [showProfile, setShowProfile] = useState(true);

    const [showAchievements, setShowAchievements] = useState(true);

    const [showSettings, setShowSettings] = useState(true);

    const createAboutAlert = () => {
        Alert.alert(
            "ViLangSpeak",
            "Authors: Hòa - Toại - Tuấn\nImages: storyset.com, flaticon.com",
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
                        <View>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onPress={() => setShowProfile(!showProfile)}
                            >
                                <Heading style={styles.textTitle}>
                                    Profile
                                </Heading>
                                <View>
                                    {
                                        showProfile
                                        ?
                                            <Ionicons
                                                name="chevron-down"
                                                size={IconSize.SMALL}
                                                color={Colors.TEXT}
                                            />
                                        :
                                            <Ionicons
                                                name="chevron-back"
                                                size={IconSize.SMALL}
                                                color={Colors.TEXT}
                                            />
                                    }
                                </View>
                            </TouchableOpacity>
                            {
                                showProfile &&
                                (
                                    <>
                                        <Text style={styles.textNormal}>
                                            Name: {currentAccount?.name}
                                        </Text>
                                        {
                                            currentAccount?.birthday !== "1000-01-01" &&
                                            <Text style={styles.textNormal}>
                                                Birthday: {currentAccount?.birthday}
                                            </Text>
                                        }   
                                    </>
                                )
                            }
                        </View>
                        {/* <View style={{ maxHeight: "65%", overflow: "hidden" }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onPress={() => setShowAchievements(!showAchievements)}
                            >
                                <Heading style={styles.textTitle}>
                                    Achievements
                                </Heading>
                                <View>
                                {
                                        showAchievements
                                        ?
                                            <Ionicons
                                                name="chevron-down"
                                                size={IconSize.SMALL}
                                                color={Colors.TEXT}
                                            />
                                        :
                                            <Ionicons
                                                name="chevron-back"
                                                size={IconSize.SMALL}
                                                color={Colors.TEXT}
                                            />
                                    }
                                </View>
                            </TouchableOpacity>
                            {
                                showAchievements &&
                                (
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
                                )
                            }
                        </View> */}
                        <View>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onPress={() => setShowSettings(!showSettings)}
                            >
                                <Heading style={styles.textTitle}>
                                    Settings
                                </Heading>
                                <View>
                                {
                                    showSettings
                                    ?
                                        <Ionicons
                                            name="chevron-down"
                                            size={IconSize.SMALL}
                                            color={Colors.TEXT}
                                        />
                                    :
                                        <Ionicons
                                            name="chevron-back"
                                            size={IconSize.SMALL}
                                            color={Colors.TEXT}
                                        />
                                }
                                </View>
                            </TouchableOpacity>
                            {
                                showSettings &&
                                (
                                    <>
                                        <Text style={styles.textNormal}>
                                            Language: English
                                        </Text>
                                        <Text style={styles.textNormal}>
                                            Theme: Default
                                        </Text>
                                    </>
                                )
                            }
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity
                                onPress={createAboutAlert}
                                style={styles.button}
                            >
                                <Text
                                    style={styles.textNormal}
                                >
                                    About
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={createLogoutAlert}
                                style={styles.button}
                            >
                                <Text
                                    style={styles.textNormal}
                                >
                                    Log out
                                </Text>
                            </TouchableOpacity>
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
        width: 60,
        height: 60,
    },
    iconFooterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        width: 84,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        padding: 5,
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
