import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

// trigger when a new event is added
exports.newEventNotification = functions.firestore
  .document("event/{id}")
  .onCreate((snap, context) => {
    functions.logger.info("Test log");

    functions.logger.info(snap.data());
    // const tokens = db.doc();

    const payload = {
      notification: {
        title: "this is a test",
        body: "testify",
      },
      token: "test",
    };
    admin.messaging().send(payload);
  });
