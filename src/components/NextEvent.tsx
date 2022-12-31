import React, { FC } from "react";
import { Text, Center, Skeleton, Box, View } from "native-base";
import EventCard from "./EventCard";
import { EventType } from "../../types";
import { colors } from "../constants/themes";

const NextEvent: FC<{ events: EventType[] }> = ({ events }): JSX.Element => {
  return (
    <>
      <Text
        fontSize="lg"
        color={colors.text.highlight}
        bold
        ml="7"
        mb="2"
        mt="5"
      >
        Next event
      </Text>

      <Center alignItems="flex-start" flexDirection="row" px="2">
        {events[0] && <EventCard event={events[0]} />}
      </Center>
    </>
  );
};

export default NextEvent;
