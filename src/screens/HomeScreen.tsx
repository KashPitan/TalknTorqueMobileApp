import { Box, Text, ScrollView, Center, Skeleton } from 'native-base';
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
  const [events, setEvents] = useState<EventType[] | undefined>(undefined);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const upcomingEvents = Event.getUpcomingEvents(events ?? []);

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

  // const upcomingEventsSkeleton: JSX.Element[] = () => {
  //   const skeletons: JSX.Element[] = [];

  //   for (let i = 0; i < 3; i++) {
  //     skeletons.push(
  //       <Skeleton h="35" w="35">
  //         <></>
  //       </Skeleton>
  //     );
  //   }
  // };

  useEffect(() => {
    (async () => {
      await getScreenData();
    })();
    console.log(events);
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

        {events ? (
          <>
            <NextEvent events={events} />

            {/* // exclude top event as will be shown in next event section */}
            {upcomingEvents.length > 1 && (
              <UpcomingEvents events={upcomingEvents} />
            )}
            <PastEvents events={events} />
          </>
        ) : (
          <>
            {/* <Skeleton.Text
              lines={1}
              bg={colors.text.highlight}
              my="2"
              w="40%"
              rounded="xl"
              ml="5"
            />
            <Center mx="5">
              <Skeleton
                h="40"
                rounded="xl"
                bg={colors.text.highlight}
              ></Skeleton>
            </Center>

            <Skeleton.Text
              lines={1}
              bg={colors.text.highlight}
              my="2"
              w="40%"
              rounded="xl"
              ml="5"
            /> */}
            {/* {upcomingEventsSkeleton} */}
          </>
        )}

        <ImageCarousel />
      </ScrollView>
      <Footer />
    </>
  );
};

export default HomeScreen;
