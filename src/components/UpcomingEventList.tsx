import { FlatList } from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { EventType } from "../../types";
import UpcomingEvent from "./UpcomingEvent";

const UpcomingEventList: FC<{ eventList: EventType[] }> = ({
  children,
  eventList,
}): JSX.Element => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={eventList}
      renderItem={(item) => <UpcomingEvent event={item.item} />}
    />
  );
};

export default UpcomingEventList;

const styles = StyleSheet.create({});
