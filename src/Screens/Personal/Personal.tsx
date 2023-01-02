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
import { NormalACard } from "@/Components";
import { User, AchievementCard } from "@/Services";
import { Colors, FontSize, IconSize } from "@/Theme";
import { MainScreens } from "..";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface IPersonalProps {
  // data: User | undefined;
  // isLoading: boolean;
  onNavigate: (string: MainScreens) => void;
}

export const Personal = (props: IPersonalProps) => {
  const { onNavigate } = props;
  const dataTemp = [
    {
      id: "1",
      thumbnail: require("../../../assets/smile.png"),
      title: "Get 7 day series",
    },
    {
      id: "2",
      thumbnail: require("../../../assets/smile.png"),
      title: "Get full points for 5 tests",
    },
    {
      id: "3",
      thumbnail: require("../../../assets/smile.png"),
      title: "Achievement 3",
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
        <View style={{ flex: 1 }}>
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
              Name: Toai Tran
            </Text>
            <Text style={{ fontSize: FontSize.SMALL, color: Colors.TEXT }}>
              Age: 21
            </Text>
          </View>
        </View>
        <View style={{ flex: 3, overflow: "hidden" }}>
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
              data={currentData}
              keyExtractor={(item: AchievementCard) => item.id}
              renderItem={({ item }) => (
                <NormalACard
                  id={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
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
                        title: "Achievement " + String(currentId + 1),
                      },
                      {
                        id: String(currentId + 2),
                        thumbnail: require("../../../assets/smile.png"),
                        title: "Achievement " + String(currentId + 2),
                      },
                      {
                        id: String(currentId + 3),
                        thumbnail: require("../../../assets/smile.png"),
                        title: "Achievement " + String(currentId + 3),
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
        <View style={{ flex: 1 }}>
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
                Setting
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
    flex: 7,
    width: "100%",
    padding: 20,
    overflow: "hidden",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
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
