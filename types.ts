import { Timestamp } from "firebase/firestore";

export type EventType = {
  month: string;
  day: number;
  name: string;
  location: string;
  description?: string;
  imageUri?: string;
  fullDate?: string;
  gmapsLink?: string;
};

export type EventDateType = {
  month: string;
  day: number;
};

export type EventRecordType = {
  date: Timestamp;
  name: string;
  location: string;
  description?: string;
  imageUri?: string;
  gmapsLink?: string;
};
