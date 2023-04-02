import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { MainScreens, RootScreens } from "@/Screens";
import { LessonContainer } from "@/Screens/Lesson";
import { LoginContainer } from "@/Screens/Login";
import { TestDetailContainer } from "@/Screens/TestDetail";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";

export type RootStackParamList = {
  [RootScreens.LOGIN]: undefined;
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.LESSON]: undefined;
  [RootScreens.TESTDETAIL]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const authState = useSelector(selectAuth());

  return (
    <NavigationContainer>
      <StatusBar />
        {/* <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        /> */}
        {
          authState.userId == null
          ? <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen
              name={RootScreens.LOGIN}
              component={LoginContainer}
              options={{}}
              />
            </RootStack.Navigator>
          : <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
              name={RootScreens.MAIN}
              component={MainNavigator}
              options={{}}
            />
            <RootStack.Screen
              name={RootScreens.LESSON}
              component={LessonContainer}
              options={{}}
            />
            <RootStack.Screen
              name={RootScreens.TESTDETAIL}
              component={TestDetailContainer}
              options={{}}
            />
          </RootStack.Navigator>
        }
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
