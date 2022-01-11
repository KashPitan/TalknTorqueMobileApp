import React, { FC, useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Box, Text, VStack, Center } from "native-base";
import EventCardDate from "./EventCardDate";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { EventType } from "../../types";
const EventCard: FC<{ event: EventType }> = ({ event }): JSX.Element => {
  const firebaseStorageReference = ref(storage, event.imageUri);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const firebaseDownloadUrl = await getDownloadURL(
        firebaseStorageReference
      );
      setDownloadUrl(firebaseDownloadUrl);
      // console.log(firebaseDownloadUrl);
    })();
  }, []);
  return (
    <Box w="90%" h="67%">
      <VStack alignItems="center">
        {downloadUrl && (
          <ImageBackground
            source={{ uri: downloadUrl }}
            resizeMode="cover"
            style={styles.image}
            borderRadius={15}
          >
            <Center
              bg="gray.100"
              position="absolute"
              top="271"
              left="0"
              px="3"
              py="0.5"
              roundedBottomLeft="xl"
              borderWidth="2"
              borderColor="gray.300"
            >
              <VStack>
                <Text bold fontSize="sm">
                  {event.name}
                </Text>
              </VStack>
            </Center>

            <Center
              bg="gray.100"
              position="absolute"
              top="5"
              left="5"
              px="3"
              py="0.5"
              rounded="xl"
              borderWidth="2"
              borderColor="gray.300"
            >
              <EventCardDate
                eventDate={{ month: event.month, day: event.day }}
              />
            </Center>
          </ImageBackground>
        )}
      </VStack>
    </Box>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 300,
    // justifyContent: "start",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
