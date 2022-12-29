import React, { FC } from "react";
import { Text, Center } from "native-base";
import EventCard from "./EventCard";
import { EventType } from "../../types";

const NextEvent: FC<{ events: EventType[] }> = ({ events }): JSX.Element => {
  return (
    <>
      <Text fontSize="lg" color="white" bold ml="7" mb="1">
        Next event
      </Text>

      <Center alignItems="flex-start" flexDirection="row" px="2" mb="5">
        {events[0] && <EventCard event={events[0]} />}
      </Center>
    </>
  );
};

export default NextEvent;
