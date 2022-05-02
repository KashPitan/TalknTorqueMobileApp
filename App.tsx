import { LogBox, StyleSheet, SafeAreaView } from "react-native";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";

import * as Notifications from "expo-notifications";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SignInScreen from "./src/screens/SignInScreen";
import EventScreen from "./src/screens/EventScreen";
import CreateEventScreen from "./src/screens/CreateEventScreen";
import ApprovalScreen from "./src/screens/ApprovalScreen";

import GlobalNotifications from "./src/components/GlobalNotifications";

//for luxon intl error
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);
LogBox.ignoreLogs([
  "If you do not provide children, you must specify an aria-label for accessibility",
]);

// address this at some point
LogBox.ignoreLogs(["Please pass alt prop to Image component"]);

LogBox.ignoreLogs([
  `NativeBase: The contrast ratio of 1:1 for darkText on transparent
falls below the WCAG recommended absolute minimum contrast ratio of 3:1.`,
]);

const Stack = createNativeStackNavigator();
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home Screen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home Screen" component={HomeScreen} />

          <Stack.Screen
            name="Create Event Screen"
            component={CreateEventScreen}
          />
          <Stack.Screen name="Event Screen" component={EventScreen} />

          <Stack.Screen name="Register Screen" component={RegisterScreen} />
          <Stack.Screen name="SignIn Screen" component={SignInScreen} />
          <Stack.Screen name="Approval Screen" component={ApprovalScreen} />
        </Stack.Navigator>
        <GlobalNotifications />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
