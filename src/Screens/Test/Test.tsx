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
import { ListCategory, ListTestInfo, ListProgressTest, Category, ProgressTest, TestInfo } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalTCard, SmallTCard } from "@/Components";
import { MainScreens } from "..";

export interface ITestProps {
  isLoading: boolean;
  allCategories: ListCategory | undefined;
  recommendTests: ListTestInfo | undefined;
  allTests: ListTestInfo | undefined;
  allProgressesTest: ListProgressTest | undefined;
  onNavigate: (string: MainScreens) => void;
};

export interface TestInfoUser {
  id: number;
  name: string;
  visible: boolean;
  category: Category | undefined;
  progress: ProgressTest | undefined;
};

export const Test = (props: ITestProps) => {
  const { isLoading, allCategories, recommendTests, allTests, allProgressesTest, onNavigate } = props;
  
  const [recommendTestsUser, setRecommendTestsUser] = useState<TestInfoUser[]>([]);
  
  const [allTestsUser, setAllTestsUser] = useState<TestInfoUser[]>([]);

  const [loadMore, setLoadMore] = useState(false);

  const mapTestUser = (test: TestInfo) => {
    return (
      {
        id: test.id,
        name: test.name,
        visible: test.visible,
        category: allCategories?.categories[test.category - 1],
        progress: allProgressesTest?.progresses.find(progress => progress.test === test.id),
      }
    );
  };

  useEffect(() => {
    setRecommendTestsUser(recommendTests ? recommendTests.tests.map(mapTestUser as any) : []);
    setAllTestsUser(allTests ? allTests.tests.map(mapTestUser as any) : []);
  }, [recommendTests?.tests, allTests?.tests, allCategories?.categories, allProgressesTest?.progresses]);

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
                      setAllTestsUser(allTests ? allTests.tests.concat([]).map(mapTestUser as any) : []);
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
