import { User, TestCard } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { NormalTCard, SmallTCard } from "@/Components";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { MainScreens } from "..";

export interface ITestProps {
  // data: User | undefined;
  // isLoading: boolean;
  onNavigate: (string: MainScreens) => void;
}

export const Test = (props: ITestProps) => {
  const { onNavigate } = props;
  const dataTemp = [
    {
      id: "1",
      thumbnail: require("../../../assets/smile.png"),
      title: "Get to know",
      category: "Greeting",
      score: "9/10",
    },
    {
      id: "2",
      thumbnail: require("../../../assets/smile.png"),
      title: "Vehicles",
      category: "category 2",
      score: "0",
    },
    {
      id: "3",
      thumbnail: require("../../../assets/smile.png"),
      title: "Animals",
      category: "category 3",
      score: "0",
    },
  ];

  const [loadMore, setLoadMore] = useState(false);
  const [currentData, setCurrentData] = useState(dataTemp);
  const [currentId, setCurrentId] = useState(3);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
              data={currentData.slice(1, 3)}
              keyExtractor={(item: TestCard) => item.id}
              renderItem={({ item }) => (
                <SmallTCard
                  id={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  category={item.category}
                  score={item.score}
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
              data={currentData}
              keyExtractor={(item: TestCard) => item.id}
              renderItem={({ item }) => (
                <NormalTCard
                  id={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  category={item.category}
                  score={item.score}
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
                  setCurrentData(
                    currentData.concat([
                      {
                        id: String(currentId + 1),
                        thumbnail: require("../../../assets/smile.png"),
                        title: "Animals " + String(currentId + 1),
                        category: "category 3",
                        score: "0",
                      },
                      {
                        id: String(currentId + 2),
                        thumbnail: require("../../../assets/smile.png"),
                        title: "Animals " + String(currentId + 2),
                        category: "category 3",
                        score: "0",
                      },
                      {
                        id: String(currentId + 3),
                        thumbnail: require("../../../assets/smile.png"),
                        title: "Animals " + String(currentId + 3),
                        category: "category 3",
                        score: "0",
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
