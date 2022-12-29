import { Box, Text, ScrollView } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";

import Header from "../components/Header";
import UpcomingEvents from "../components/UpcomingEvents";
import ImageCarousel from "../components/ImageCarousel";

import { EventType } from "../../types";
import Event from "../classes/Event";
import NextEvent from "../components/NextEvent";

const HomeScreen = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getScreenData = async () => {
    setRefreshing(true);
    const eventData = await Event.getMostRecentEvents();
    setEvents(eventData);
    setRefreshing(false);
  };

  const onRefresh = useCallback(async () => {
    await getScreenData();
  }, [refreshing]);

  useEffect(() => {
    (async () => {
      const eventData = await Event.getMostRecentEvents();
      setEvents(eventData);
    })();
  }, []);

  return (
    <>
      <Header />

          {events && (
            <>
              <UpcomingEvents events={events} />
              <ImageCarousel />
            </>
          )}
        </Box>
      <ScrollView
        bg="red.500"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text fontSize="3xl" color="white" bold ml="7" mb="1">
          Events
        </Text>
        <NextEvent events={events} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
