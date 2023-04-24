import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, FontSize, IconSize } from "@/Theme";
import { LoginContainer } from "@/Screens/Login";
import { HomeContainer } from "@/Screens/Home";
import { TestContainer } from "@/Screens/Test";
import { PersonalContainer } from "@/Screens/Personal";
import { LessonContainer } from "@/Screens/Lesson";
import { MainScreens } from "@/Screens";
import Ionicons from "@expo/vector-icons/Ionicons";

export type MainBottomBarParamList = {
  [MainScreens.HOME]: undefined;
  [MainScreens.TEST]: undefined;
  [MainScreens.PERSONAL]: undefined;
  [MainScreens.LESSON]: undefined;
  [MainScreens.TESTDETAIL]: undefined;
};

const Tab = createBottomTabNavigator<MainBottomBarParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: Colors.PRIMARY,
          tabBarInactiveBackgroundColor: Colors.WHITE,
        }}
      />
      <Tab.Screen
        name={MainScreens.TEST}
        component={TestContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: Colors.PRIMARY,
          tabBarInactiveBackgroundColor: Colors.WHITE,
        }}
      />
      <Tab.Screen
        name={MainScreens.PERSONAL}
        component={PersonalContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: Colors.PRIMARY,
          tabBarInactiveBackgroundColor: Colors.WHITE,
        }}
      />
    </Tab.Navigator>
  );
};
