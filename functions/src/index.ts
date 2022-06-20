import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";

admin.initializeApp();
const db = admin.firestore();

// trigger when a new event is added
exports.newEventNotification = functions.firestore
  .document("events/{id}")
  .onCreate((snap, context) => {
    const eventData = snap.data();

    let tokens: string[] = [];
    let messages: { to: string; body: string }[] = [];

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
