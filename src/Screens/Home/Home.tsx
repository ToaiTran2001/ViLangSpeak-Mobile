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
import Ionicons from "@expo/vector-icons/Ionicons";
import { Profile, ListLessonInfo, LessonInfo, ListCategory, ListProgress, Category, Progress } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalLCard, SmallLCard } from "@/Components";
import { RootScreens } from "..";

export interface IHomeProps {
  isLoading: boolean;
  profile: Profile | undefined;
  allCategories: ListCategory | undefined;
  recommendLessons: ListLessonInfo | undefined;
  allLessons: ListLessonInfo | undefined;
  allProgresses: ListProgress | undefined;
  onNavigate: (string: RootScreens) => void;
};

export interface LessonInfoUser {
  id: number;
  name: string;
  visible: boolean;
  category: Category | undefined;
  progress: Progress | undefined;
};

export const Home = (props: IHomeProps) => {
  const { isLoading, profile, allCategories, recommendLessons, allLessons, allProgresses, onNavigate } = props;

  const [currentAccount, setCurrentAccount] = useState(profile?.account);

  const [recommendLessonsUser, setRecommendLessonsUser] = useState<LessonInfoUser[]>([]);

  const [allLessonsUser, setAllLessonsUser] = useState<LessonInfoUser[]>([]);

  const [loadMore, setLoadMore] = useState(false);

  const updateLessons = (lessons: LessonInfo[] | undefined) => {
    if (lessons) {
      const tempLessons: LessonInfoUser[] = [];
      for (let i = 0; i < lessons.length; i++) {
        tempLessons.push({
          id: lessons[i].id,
          name: lessons[i].name,
          visible: lessons[i].visible,
          category: allCategories?.categories[lessons[i].category - 1],
          progress: allProgresses?.progresses.find(progress => progress.lesson === lessons[i].id),
        });
      }
      return tempLessons;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setCurrentAccount(profile?.account);
    setRecommendLessonsUser(updateLessons(recommendLessons?.lessons));
    setAllLessonsUser(updateLessons(allLessons?.lessons));
  }, [profile?.account, recommendLessons?.lessons, allLessons?.lessons, allCategories?.categories, allProgresses?.progresses]);

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
            <View style={styles.textHeaderContainer}>
              <Heading fontSize={FontSize.LARGE} color={Colors.TEXT}>
                Hi, {currentAccount?.name}
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
                  data={recommendLessonsUser}
                  keyExtractor={(item: LessonInfoUser) => String(item.id)}
                  renderItem={({ item }) => (
                    <SmallLCard
                      id={item.id}
                      name={item.name}
                      visible={item.visible}
                      category={item.category}
                      progress={item.progress}
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
                  data={allLessonsUser}
                  keyExtractor={(item: LessonInfoUser) => String(item.id)}
                  renderItem={({ item }) => (
                    <NormalLCard
                      id={item.id}
                      name={item.name}
                      visible={item.visible}
                      category={item.category}
                      progress={item.progress}
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
                      setAllLessonsUser(updateLessons(allLessons?.lessons).concat([]));
                      setLoadMore(false);
                    }, 1000);
                  }}
                  onEndReachedThreshold={0.1}
                />
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
