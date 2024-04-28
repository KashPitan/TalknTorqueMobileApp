import * as Notifications from "expo-notifications";
import { Notification } from "expo-notifications";

import * as Permissions from "expo-permissions";
import * as Device from "expo-device";

export const scheduleNotification = (
  content: Notifications.NotificationContentInput,
  seconds: number
) => {
  const schedulingOptions = {
    content,
    trigger: {
      seconds: seconds,
    },
  };
  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const handleNotification = (notification: Notification) => {
  const { title } = notification.request.content;
  console.warn(title);
};

export const askForNotificationPermissions = async () => {
  // console.log("test");
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Device.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
};
