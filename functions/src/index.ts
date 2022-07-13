import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import { DateTime as Luxon } from "luxon";

admin.initializeApp();
const db = admin.firestore();

// trigger when a new event is added
exports.newEventNotification = functions.firestore
  .document("events/{id}")
  .onCreate((snap) => {
    const eventData = snap.data();

    const tokens: string[] = [];
    const messages: { to: string; body: string }[] = [];

    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const userData = doc.data();
          functions.logger.info(userData);

          if (userData?.pushNotificationToken) {
            tokens.push(userData.pushNotificationToken);
            const userPushToken = userData?.pushNotificationToken;
            messages.push({ to: userPushToken, body: eventData.name });
          }
        });
        return Promise.all(messages);
      })
      .then((messages) => {
        functions.logger.debug(tokens);

        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        });
      });
  });

exports.scheduleEventReminder = functions.pubsub
  .schedule("every day 00:04")
  .timeZone("Europe/London")
  .onRun(async () => {
    const today = Luxon.now();
    const todayTimestamp = new Date(today.toString());

    const eventsSnapshot = await db
      .collection("events")
      .where("date", ">", todayTimestamp)
      .orderBy("date")
      .get();

    const latestEvent = eventsSnapshot.docs[0].data();
    const attendanceList = latestEvent.attendance;

    const messages: { to: string; body: string }[] = [];
    functions.logger.info(latestEvent);
    functions.logger.info(attendanceList);
    Object.keys(attendanceList).forEach((key) => {
      functions.logger.info(key, attendanceList[key]);
      const userPushToken = attendanceList[key].pushNotificationToken;

      if (userPushToken)
        messages.push({ to: userPushToken, body: latestEvent.name });
    });

    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
  });
