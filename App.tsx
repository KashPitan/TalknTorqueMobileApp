import 'expo-dev-client';
import { LogBox, StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';

import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import * as TaskManager from 'expo-task-manager';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SignInScreen from './src/screens/SignInScreen';
import EventScreen from './src/screens/EventScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import ApprovalScreen from './src/screens/ApprovalScreen';

//for luxon intl error
import 'intl';
import { Platform } from 'react-native';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
LogBox.ignoreLogs([
  'If you do not provide children, you must specify an aria-label for accessibility',
]);

// address this at some point
LogBox.ignoreLogs(['Please pass alt prop to Image component']);

LogBox.ignoreLogs([
  `NativeBase: The contrast ratio of 1:1 for darkText on transparent
falls below the WCAG recommended absolute minimum contrast ratio of 3:1.`,
]);

LogBox.ignoreLogs([
  `If you do not provide children, you must specify an aria-label for accessibility`,
]);

const Stack = createNativeStackNavigator();
const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('new event');
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    TaskManager.defineTask(NOTIFICATION_TASK, ({ data, error }) => {
      console.log(data);
      // setNotification(notification);
    });
    Notifications.registerTaskAsync(NOTIFICATION_TASK);

    // listener cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn Screen"
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
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
