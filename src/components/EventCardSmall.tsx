import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Box, Text, VStack, Pressable } from 'native-base';
import EventCardDate from './EventCardDate';
import { storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { EventType } from '../../types';

import { Dimensions } from 'react-native';
import { colors } from '../constants/themes';
const { width } = Dimensions.get('window');

const EventCard: FC<{ event: EventType }> = ({ event }): JSX.Element => {
  const navigation = useNavigation();

  const firebaseStorageReference = ref(storage, event.imageUri);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    // if the uri string contains this its a storage location reference
    // so we need to get the download url from it
    // if not it should already be a download url
    if (event.imageUri?.includes('talktorque')) {
      (async () => {
        const firebaseDownloadUrl = await getDownloadURL(
          firebaseStorageReference
        );
        setDownloadUrl(firebaseDownloadUrl);
      })();
    }
  }, []);

  return (
    <Box>
      <Pressable onPress={() => navigation.navigate('Event Screen', { event })}>
        {({ isPressed }) => {
          return (
            <VStack
              alignItems="center"
              marginLeft="5"
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.92 : 1,
                  },
                ],
              }}
            >
              {downloadUrl && (
                <ImageBackground
                  source={{ uri: downloadUrl }}
                  resizeMode="cover"
                  style={styles.image}
                  borderRadius={30}
                >
                  <LinearGradient
                    colors={['#00000000', '#000000']}
                    start={{ x: 0, y: 0.5 }}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 30,
                    }}
                  />

                  <VStack position="absolute" top="170" left="5" w="85%">
                    <Text bold fontSize="2xl" color={colors.text.white}>
                      {event.name}
                    </Text>
                    <Text bold fontSize="sm" color="gray.200">
                      {event.location}
                    </Text>
                  </VStack>

                  <Box
                    bg="gray.100"
                    position="absolute"
                    top="5"
                    left="5"
                    px="3"
                    rounded="xl"
                  >
                    <EventCardDate
                      eventDate={{ month: event.month, day: event.day }}
                    />
                  </Box>
                </ImageBackground>
              )}
            </VStack>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: width / 2 + 70,
    height: width / 2 + 70,
    justifyContent: 'space-between',
    marginHorizontal: 2,
  },
});
