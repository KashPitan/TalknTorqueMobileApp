import { Box, Text, IconButton, HStack, Center, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import EventCard from "../components/EventCard";
import UpcomingEvents from "../components/UpcomingEvents";
import ImageCarousel from "../components/ImageCarousel";

import { EventType } from "../../types";

import { getMostRecentEvents } from "../helper/getMostRecentEvents";

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
      <ScrollView bg="red.500">
        <Box
          pt="0"
          pb="0"
          height="39%"
          bg={{
            linearGradient: {
              colors: ["red.400", "red.600"],
              start: [0, 1],
              end: [1, 0],
            },
          }}
        >
          <Box>
            <HStack>
              <Text fontSize="3xl" color="white" bold ml="7">
                Next event
              </Text>
            </HStack>

            <Box w="15%" h="1" bgColor="white" rounded="xl" mb="2" ml="8" />

            <Center alignItems="flex-start" flexDirection="row" px="2" mb="5">
              {events[0] && <EventCard event={events[0]} />}
            </Center>
          </Box>

          {events && (
            <>
              <UpcomingEvents events={events} />
              <ImageCarousel />
              {/* <UpcomingEvents events={events} /> */}
            </>
          )}
        </Box>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
