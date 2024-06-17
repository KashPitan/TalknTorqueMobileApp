import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';

import { HStack, Text, Center, Image, Icon } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { storage } from '../../firebase';
import { EventType } from '../../types';
import { DIMENSIONS } from '../constants/constants';
import { colors } from '../constants/themes';
import { Pressable } from 'native-base';

const UpcomingEventItem: FC<{ event: EventType }> = ({
  event,
}): JSX.Element => {
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
  const navigation = useNavigation();
  return (
    <Pressable
      p="0"
      my="2"
      mx="2"
      onPress={() => navigation.navigate('Event Screen', { event })}
    >
      {({ isPressed }) => {
        return (
          <HStack
            style={{
              transform: [
                {
                  scale: isPressed ? 0.94 : 1,
                },
              ],
            }}
            borderWidth="2"
            borderColor="gray.300"
            borderRadius="lg"
            rounded="lg"
            shadow={isPressed ? 0 : 6}
            bgColor={isPressed ? 'gray.200' : 'gray.100'}
          >
            <Center>
              <Image
                source={{ uri: downloadUrl ?? '' }}
                style={{
                  width: DIMENSIONS.width / 5 + 10,
                  height: DIMENSIONS.height / 10,
                }}
                rounded="lg"
                resizeMode="cover"
              />
            </Center>
            <Center w="72%" ml="3">
              <Text
                alignSelf="flex-start"
                bold
                fontSize="xl"
                color={colors.text.main}
              >
                {event.name}
              </Text>

              <HStack alignSelf="flex-start">
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-marker"
                  color={colors.text.highlight}
                  mt="1"
                  mr="1"
                />
                <Text
                  alignSelf="flex-start"
                  fontSize="sm"
                  color={colors.text.light}
                >
                  {event.location}
                </Text>
              </HStack>

              <HStack alignSelf="flex-start">
                <Icon
                  as={MaterialCommunityIcons}
                  name="calendar"
                  color={colors.text.highlight}
                  mt="1"
                  mr="1"
                />
                <Text
                  alignSelf="flex-start"
                  color={colors.text.light}
                  isTruncated
                >
                  {event.fullDate}
                </Text>
              </HStack>
            </Center>
          </HStack>
        );
      }}
    </Pressable>
  );
};

export default UpcomingEventItem;
