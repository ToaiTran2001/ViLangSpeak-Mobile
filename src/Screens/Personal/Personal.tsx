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
import { MainScreens } from "..";
import { useDispatch } from "react-redux";
import { logOut } from "@/Store/reducers";

export interface IPersonalProps {
  profile: Profile | undefined;
  listAchievement: ListAchievement | undefined;
  isLoading: boolean;
  onNavigate: (screen: MainScreens) => void;
};

export const Personal = (props: IPersonalProps) => {
  const { profile, listAchievement, isLoading, onNavigate } = props;

  const dispatch = useDispatch();

  const [currentAccount, setCurrentAccount] = useState(profile?.account);
  
  const [currentAchievements, setCurrentAchievements] = useState(listAchievement?.achievements);

  const [loadMore, setLoadMore] = useState(false);

  const createTwoButtonAlert = () => {
    Alert.alert(
      "ViLangSpeak",
      "Authors: Hòa - Toại - Tuấn\nImages: flaticon.com",
      [
        { 
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
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
          }
        },
        { 
          text: "Cancel",
          onPress: () => console.log("Logout cancelled")
        }
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
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => onNavigate(MainScreens.HOME)}
            >
              <Ionicons
                name="chevron-back"
                size={IconSize.HUGE}
                color={Colors.TEXT}
              />
            </TouchableOpacity>
            <View style={styles.textHeaderContainer}>
              <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
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
                <View>
                  <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                    Profile
                  </Heading>
                </View>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="chevron-down"
                    size={IconSize.SMALL}
                    color={Colors.TEXT}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                  Name: {currentAccount?.name}
                </Text>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                  Birthday: {currentAccount?.birthday}
                </Text>
              </View>
            </View>
            <View style={{ flex: 6, overflow: "hidden" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                    Achievements
                  </Heading>
                </View>
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
                      setCurrentAchievements(listAchievement?.achievements.concat([]));
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
                <View>
                  <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                    Settings
                  </Heading>
                </View>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="chevron-down"
                    size={IconSize.SMALL}
                    color={Colors.TEXT}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                  Language: English
                </Text>
                <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                  Theme: SkyBlue
                </Text>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <TouchableOpacity
                    onPress={createTwoButtonAlert}
                    style={{
                      backgroundColor: Colors.PRIMARY,
                      width: 72,
                      height: 36,
                      borderRadius: 10,
                      marginVertical: 5,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
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
                    <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
                      Log out
                    </Text>
                  </TouchableOpacity>
                </View>
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
    flex: 6.5,
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
});
