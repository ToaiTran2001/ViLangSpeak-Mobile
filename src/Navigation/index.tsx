import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { RootScreens } from "@/Screens";
import { WelcomeContainer } from "@/Screens/Welcome";
import { LoginContainer } from "@/Screens/Login";
import { RegisterContainer } from "@/Screens/Register";
import { LessonContainer } from "@/Screens/Lesson";
import { TestDetailContainer } from "@/Screens/TestDetail";
import { HomeMoreContainer } from "@/Screens/HomeMore";
import { TestMoreContainer } from "@/Screens/TestMore";
import { useSelector } from "react-redux";
import { selectAuth } from "@/Store/reducers";
import { LessonInfoUser } from "@/Screens/Home/Home";
import { TestInfoUser } from "@/Screens/Test/Test";

export type RootStackParamList = {
	[RootScreens.WELCOME]: undefined;
	[RootScreens.LOGIN]: undefined;
	[RootScreens.REGISTER]: undefined;
	[RootScreens.MAIN]: undefined;
	[RootScreens.HOMEMORE]: { accountId: number | undefined };
	[RootScreens.TESTMORE]: { accountId: number | undefined };
	[RootScreens.LESSON]: { accountId: number | undefined, lessonId: number };
	[RootScreens.TESTDETAIL]: { accountId: number | undefined, testId: number };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const authState = useSelector(selectAuth());

  return (
    <NavigationContainer>
      <StatusBar />
        {
          authState.userId == null
          ? <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
              name={RootScreens.WELCOME}
              component={WelcomeContainer}
              options={{}}
            />
            <RootStack.Screen
              name={RootScreens.LOGIN}
              component={LoginContainer}
              options={{}}
            />
            <RootStack.Screen
              name={RootScreens.REGISTER}
              component={RegisterContainer}
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
              name={RootScreens.HOMEMORE}
              component={HomeMoreContainer}
              options={{}}
            />
            <RootStack.Screen
              name={RootScreens.TESTMORE}
              component={TestMoreContainer}
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
