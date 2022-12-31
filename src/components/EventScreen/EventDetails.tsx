import { Box, Center, HStack, Icon, Link, ScrollView, Text } from 'native-base';
import React, { FC, useEffect, useState, memo } from 'react';

import { EventType } from '../../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/themes';
import MapView, { Marker } from 'react-native-maps';

import { geocode } from '../../api/geocode';

const EventDetails: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    (async () => {
      // store this inside the location data of each event instead to save api calls
      const res = await geocode(event.location);
      const { lat, lng } = res;

      if (lat && lng) setLocation({ latitude: lat, longitude: lng });
      console.log(res);
    })();
  }, []);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator>
        <Box p="6">
          <Text bold fontSize="2xl" color={colors.text.main} mb="2">
            {event.name}
          </Text>
          <HStack mt="2" ml="1">
            <Icon
              as={MaterialCommunityIcons}
              name="clock-time-two"
              color={colors.text.highlight}
              size="lg"
            />
            <Text fontSize="md" bold ml="3" mb="1" color={colors.text.light}>
              {event.fullDate}
            </Text>
          </HStack>
          <HStack>
            <Icon
              as={MaterialCommunityIcons}
              name="map-marker"
              color={colors.text.highlight}
              size="xl"
            />
            <Text fontSize="md" bold ml="3" w="85%" color={colors.text.light}>
              {event.location}
            </Text>
          </HStack>

          <Text mt="5" bold fontSize="md">
            About
          </Text>
          <Text mt="2" white-space="pre-line" color={colors.text.light}>
            {event.description}
          </Text>

          <Text mt="5" bold fontSize="md">
            Location
          </Text>
          <Text mt="2" mb="3" white-space="pre-line" color={colors.text.light}>
            {event.location}
          </Text>
          <Center>
            {location && (
              <MapView
                style={{
                  flex: 1,
                  width: '100%',
                  height: 300,
                  borderRadius: 30,
                }}
                provider="google"
                scrollEnabled={true}
                zoomEnabled={true}
                region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              </MapView>
            )}

            {event.gmapsLink && (
              <Link href={event.gmapsLink}>
                <Box
                  p="3"
                  rounded="2xl"
                  w="40%"
                  mt="3"
                  bgColor={colors.primary}
                  shadow="4"
                >
                  <Center>
                    <Text color="white" bold>
                      Open in maps
                    </Text>
                  </Center>
                </Box>
              </Link>
            )}
          </Center>
        </Box>
      </ScrollView>
    </>
  );
};

export default memo(EventDetails);
