import { Box, Center, Text } from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import UpcomingEventList from "./UpcomingEventList";
import { EventType } from "../../types";

const UpcomingEvents: FC<{ events: EventType[] }> = ({
  events,
}): JSX.Element => {
  return (
    <Center p="6" borderTopRadius={40} bgColor="gray.200">
      <Text alignSelf="flex-start" fontSize="2xl" bold>
        Upcoming Events
      </Text>
      <Box
        alignSelf="flex-start"
        w="15%"
        h="1"
        bgColor="red.400"
        rounded="xl"
        ml="1"
      />

      <Box w="full" mt="2">
        {events.length > 0 ? (
          <UpcomingEventList eventList={events} />
        ) : (
          <Text>No Upcoming Events :(</Text>
        )}
      </Box>
    </Center>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({});
