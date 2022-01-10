import { LogBox, StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";

import RegisterScreen from "./src/screens/RegisterScreen";
import SignInScreen from "./src/screens/SignInScreen";
import EventScreen from "./src/screens/EventScreen";

//for luxon intl error
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}

LogBox.ignoreLogs(["Setting a timer"]);
// LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);

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
          initialRouteName="Event Screen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Event Screen" component={EventScreen} />
          <Stack.Screen name="Home Screen" component={HomeScreen} />
          <Stack.Screen name="Register Screen" component={RegisterScreen} />
          <Stack.Screen name="SignIn Screen" component={SignInScreen} />
        </Stack.Navigator>
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
