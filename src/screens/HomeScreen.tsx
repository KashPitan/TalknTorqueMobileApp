import { Box, Text, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

import { DateTime as Luxon } from 'luxon';

import { colors } from '../constants/themes';

import Header from '../components/layout/Header';
import UpcomingEvents from '../components/UpcomingEvents';
import ImageCarousel from '../components/ImageCarousel';

import { EventType } from '../../types';
import Event from '../classes/Event';
import PastEvents from '../components/PastEvents';
import NextEvent from '../components/NextEvent';
import Footer from '../components/layout/Footer';

const HomeScreen = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getScreenData = async () => {
    setRefreshing(true);
    setIsDataLoaded(false);

    const eventData = await Event.getMostRecentEvents();
    setEvents(eventData);

    setIsDataLoaded(true);
    setRefreshing(false);
  };

  const onRefresh = useCallback(async () => {
    await getScreenData();
  }, [refreshing]);

  useEffect(() => {
    (async () => {
      await getScreenData();
    })();
  }, []);

  return (
    <>
      <ScrollView
        bg={colors.background}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />

        <Text fontSize="3xl" color={colors.text.main} bold ml="7" mt="3">
          Explore Events
        </Text>
        <Text fontSize="sm" color="gray.400" ml="7">
          {Luxon.now().toFormat('EEEE, d MMMM')}
        </Text>

        <NextEvent events={events} />

        {events && (
          <>
            <UpcomingEvents events={events} />
            <PastEvents events={events} />
          </>
        )}

        <ImageCarousel />
      </ScrollView>
      <Footer />
    </>
  );
};

export default HomeScreen;
