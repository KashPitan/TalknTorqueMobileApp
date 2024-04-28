import { EventType } from '../../types';
import { DateTime, DateTime as Luxon } from 'luxon';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  addDoc,
  FieldValue,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { EventRecordType } from '../../types';

export default class Event implements EventType {
  month: string;
  day: number;
  name: string;
  location: string;
  attendance: string[];
  createdAt: FieldValue;
  description?: string;
  imageUri?: string;
  fullDate?: string;
  gmapsLink?: string;
  id: string;

  constructor(
    month: string,
    day: number,
    name: string,
    location: string,
    id: string,
    attendance: string[],
    createdAt: FieldValue,
    description?: string,
    imageUri?: string,
    fullDate?: string,
    gmapsLink?: string
  ) {
    this.month = month;
    this.day = day;
    this.name = name;
    this.location = location;
    this.description = description;
    this.imageUri = imageUri;
    this.fullDate = fullDate;
    this.gmapsLink = gmapsLink;
    this.id = id;
    this.attendance = attendance;
    this.createdAt = createdAt;
  }

  getRefById = async () => {};

  static uploadEvent = async (eventRecord: EventRecordType) => {
    await addDoc(collection(db, 'events'), eventRecord);
  };

  static getMostRecentEvents = async () => {
    const eventData: EventType[] = [];

    try {
      const today = Luxon.now();
      const todayTimestamp = new Date(today.toString());

      const eventCollectionQuery = query(
        collection(db, 'events'),
        where('date', '>', todayTimestamp),
        orderBy('date')
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
          fullDate: date.toFormat('cccc, d LLLL, yyyy'),
          gmapsLink: docData.gmapsLink,
          id: doc.id,
          attendance: docData.attendance,
          createdAt: docData.createdAt,
        };

        eventData.push(event);
      });
    } catch (error) {
      console.log(error);
    }
    console.log('eventdata', eventData);
    return eventData;
  };
}
