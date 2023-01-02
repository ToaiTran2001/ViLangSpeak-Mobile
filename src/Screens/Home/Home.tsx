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
import { HStack, Spinner, Heading } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Lessons, LessonCard, LessonCardUser } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalLCard, SmallLCard } from "@/Components";
import { RootScreens } from "..";

export interface IHomeProps {
  // recommendLessons: Lessons | undefined;
  // allLessons: Lessons | undefined;
  onNavigate: (string: RootScreens) => void;
}

export const Home = (props: IHomeProps) => {
  // const { recommendLessons, allLessons, onNavigate } = props;
  const { onNavigate } = props;
  const dataTemp = [
    {
      id: 1,
      name: "Get to know",
      visible: true,
      category: {
        id: 0,
        name: "Greeting",
        image: require("../../../assets/smile.png"),
      },
      progress: 100,
    },
    {
      id: 2,
      name: "Vehicles",
      visible: true,
      category: {
        id: 1,
        name: "category 2",
        image: require("../../../assets/smile.png"),
      },
      progress: 75,
    },
    {
      id: 3,
      name: "Animals",
      visible: true,
      category: {
        id: 3,
        name: "category 3",
        image: require("../../../assets/smile.png"),
      },
      progress: 0,
    },
  ];

  // const [lessons, setLessons] = useState(allLessons ? allLessons.lessons : []);

  const [lessons, setLessons] = useState(dataTemp);

  const [loadMore, setLoadMore] = useState(false);
  const [currentId, setCurrentId] = useState(3);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.header}>
          <View style={styles.textHeaderContainer}>
            <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
              Good afternoon, Toai
            </Heading>
            <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
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
            <View>
              <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                Recommend for you
              </Heading>
            </View>
            <View>
              <FlatList
                // data={recommendLessons?.lessons}
                data={lessons.slice(1, 3)}
                keyExtractor={(item: LessonCardUser) => String(item.id)}
                renderItem={({ item }) => (
                  <SmallLCard
                    data={item}
                    onPress={() => onNavigate(RootScreens.LESSON)}
                  />
                )}
                horizontal={true}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  All lessons
                </Heading>
              </View>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}
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
            <View>
              <FlatList
                data={lessons}
                keyExtractor={(item: LessonCardUser) => String(item.id)}
                renderItem={({ item }) => (
                  <NormalLCard
                    data={item}
                    onPress={() => onNavigate(RootScreens.LESSON)}
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
                    setLessons(
                      lessons.concat([
                        {
                          id: currentId+1,
                          name: "Animals",
                          visible: true,
                          category: {
                            id: 3,
                            name: "category 3",
                            image: require("../../../assets/smile.png"),
                          },
                          progress: 0,
                        },
                      ])
                    );
                    setLoadMore(false);
                    setCurrentId(currentId + 3);
                  }, 1000);
                }}
                onEndReachedThreshold={0.1}
              />
            </View>
          </View>
        </View>
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
    padding: 20,
    overflow: "hidden",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 60,
  },
});
