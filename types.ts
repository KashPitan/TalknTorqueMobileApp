export type EventType = {
  month: string;
  day: number;
  name: string;
  location: string;
  description?: string;
  imageUri?: string;
  fullDate?: string;
};

export type EventDateType = {
  month: string;
  day: number;
};
