import { Timestamp } from "firebase/firestore";

export interface EventType {
  month: string;
  day: number;
  name: string;
  location: string;
  description?: string;
  imageUri?: string;
  fullDate?: string;
  gmapsLink?: string;
  id: string;
  attendance: string[];
}

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
  attendance: string[];
};
