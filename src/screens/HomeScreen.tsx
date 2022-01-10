import { Box, Text, IconButton, HStack, Center, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import EventCard from "../components/EventCard";
import UpcomingEvents from "../components/UpcomingEvents";

import { EventType } from "../../types";

import { getMostRecentEvents } from "../helper/getMostRecentEvents";

const testEventData: EventType[] = [
  { month: "Dec", day: 2, name: "We love cars", location: "Here" },
  { month: "Sep", day: 22, name: "Look at cars", location: "There" },
  { month: "Apr", day: 20, name: "Watch Cars", location: "Everywhere" },
  { month: "Oct", day: 17, name: "Buy Cars", location: "This place" },
  { month: "Jan", day: 20, name: "Vrooooom", location: "This place" },
];

//home screen as scroll view with upcoming events box

const HomeScreen = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    (async () => {
      const eventData = await getMostRecentEvents();
      setEvents(eventData);
    })();
  }, []);

  return (
    <>
      <Header />
      <ScrollView>
        <Box
          p="4"
          pt="0"
          height="35%"
          bg={{
            linearGradient: {
              colors: ["red.400", "red.600"],
              start: [0, 1],
              end: [1, 0],
            },
          }}
        >
          <HStack ml="6">
            <Text fontSize="3xl" color="white" bold>
              Next event
            </Text>
          </HStack>

          <Box w="15%" h="1" bgColor="white" rounded="xl" ml="7" mb="2" />

          <Center alignItems="flex-start" flexDirection="row">
            {events[0] && <EventCard event={events[0]} />}
          </Center>
        </Box>
        <UpcomingEvents events={events} />
        <UpcomingEvents events={events} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
