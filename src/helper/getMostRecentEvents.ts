import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { DateTime, DateTime as Luxon } from "luxon";
import { EventType } from "../../types";
import { db } from "../../firebase";

export const getMostRecentEvents = async () => {
  const eventData: EventType[] = [];

  try {
    const today = Luxon.now();
    const todayTimestamp = new Date(today.toString());

    const eventCollectionQuery = query(
      collection(db, "events"),
      where("date", ">", todayTimestamp),
      orderBy("date")
    );

    const eventsQuerySnapshot = await getDocs(eventCollectionQuery);

    eventsQuerySnapshot.forEach((doc) => {
      let docData = doc.data();
      let date = Luxon.fromSeconds(parseInt(docData.date.seconds));

      let event: EventType = {
        name: docData.name,
        description: docData.description,
        month: `${date.monthShort}`,
        location: docData.location,
        day: date.day,
        imageUri: docData.imageUri,
        fullDate: date.toFormat("cccc, d LLLL, yyyy"),
      };

      eventData.push(event);
    });
  } catch (error) {
    console.log(error);
  }
  return eventData;
};
