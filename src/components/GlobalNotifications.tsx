import React from "react";
import { useEffect } from "react";

import { DateTime, DateTime as Luxon } from "luxon";
import { Notification } from "expo-notifications";
import * as Notifications from "expo-notifications";

import {
  askForNotificationPermissions,
  scheduleNotification,
} from "../helper/notifications";

import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";

const GlobalNotifications = () => {
  useEffect(() => {
    let eventListener;
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          askForNotificationPermissions();

          const now = Luxon.now();
          const nowTimestamp = new Date(now.toString());

          const newEventQuery = query(
            collection(db, "events"),
            where("createdAt", ">", nowTimestamp)
          );
          // make this event listener app wide (app.tsx)
          eventListener = onSnapshot(newEventQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              console.log(change.type);
              if (change.type === "added") {
                console.log("new data added: ", change.doc.data());
                const data = change.doc.data();

                const eventDateInSeconds = data.date.seconds;
                const reminderTimestamp = Luxon.fromSeconds(eventDateInSeconds)
                  .minus({ days: 1 })
                  .set({ hour: 9 });

                const reminderTimeInSeconds = reminderTimestamp.toSeconds();

                const dateTimeNowInSeconds = Math.round(
                  nowTimestamp.getTime() / 1000
                );

                const secondsTilReminderNotification =
                  reminderTimeInSeconds - dateTimeNowInSeconds;

                // reminder 1 day before at 9am
                scheduleNotification(
                  {
                    title: "New Talk n Torque Event!",
                    body: data.name ? data.name : "VROOOOOOM",
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    color: "red",
                  },
                  secondsTilReminderNotification
                );

                //first immediate notification
                scheduleNotification(
                  {
                    title: "New Talk n Torque Event!",
                    body: data.name ? data.name : "VROOOOOOM",
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    color: "red",
                  },
                  2
                );
              }
            });
          });
        })();
      }
    });

    return () => {
      // close event listener when navigation from page
      authListener();

      if (eventListener) eventListener();
    };
  }, []);

  return <></>;
};

export default GlobalNotifications;
