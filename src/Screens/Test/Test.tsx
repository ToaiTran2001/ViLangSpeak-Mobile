import { ListCategory, ListTestInfo, ListProgressTest, Category, ProgressTest, TestInfo } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalTCard, SmallTCard } from "@/Components";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { MainScreens } from "..";

export interface ITestProps {
  isLoading: boolean;
  allCategories: ListCategory | undefined;
  recommendTests: ListTestInfo | undefined;
  allTests: ListTestInfo | undefined;
  allProgressesTest: ListProgressTest | undefined;
  onNavigate: (string: MainScreens) => void;
}

export interface TestInfoUser {
  id: number;
  name: string;
  visible: boolean;
  category: Category | undefined;
  progress: ProgressTest | undefined;
}

export const Test = (props: ITestProps) => {
  // const dataTemp = [
  //   {
  //     id: "1",
  //     thumbnail: require("../../../assets/smile.png"),
  //     title: "Get to know",
  //     category: "Greeting",
  //     score: "9/10",
  //   },
  //   {
  //     id: "2",
  //     thumbnail: require("../../../assets/smile.png"),
  //     title: "Vehicles",
  //     category: "category 2",
  //     score: "0",
  //   },
  //   {
  //     id: "3",
  //     thumbnail: require("../../../assets/smile.png"),
  //     title: "Animals",
  //     category: "category 3",
  //     score: "0",
  //   },
  // ];

  const { isLoading, allCategories, recommendTests, allTests, allProgressesTest, onNavigate } = props;
  
  const [recommendTestsUser, setRecommendTestsUser] = useState<TestInfoUser[]>([]);
  const [allTestsUser, setAllTestsUser] = useState<TestInfoUser[]>([]);

  const updateTests = (tests: TestInfo[] | undefined) => {
    if (tests) {
      const tempTests: TestInfoUser[] = [];
      for (let i = 0; i < tests.length; i++) {
        tempTests.push({
          id: tests[i].id,
          name: tests[i].name,
          visible: tests[i].visible,
          category: allCategories?.categories[tests[i].category - 1],
          progress: allProgressesTest?.progresses[i],
        });
      }
      return tempTests;
    } else {
      return [];
    }
  }

  useEffect(() => {
    setRecommendTestsUser(updateTests(recommendTests?.tests));
    setAllTestsUser(updateTests(allTests?.tests));
  }, [recommendTests?.tests, allTests?.tests, allCategories?.categories, allProgressesTest?.progresses])

  const [loadMore, setLoadMore] = useState(false);

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
              <View>
                <Heading fontSize={FontSize.MEDIUM} color={Colors.TEXT}>
                  Recommend for you
                </Heading>
              </View>
              <View>
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
                      onPress={() => {return null;}}
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
                  <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
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
                  data={allTestsUser}
                  keyExtractor={(item: TestInfoUser) => String(item.id)}
                  renderItem={({ item }) => (
                    <NormalTCard
                      id={item.id}
                      name={item.name}
                      visible={item.visible}
                      category={item.category}
                      progress={item.progress}
                      onPress={() => {return null;}}
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
});
