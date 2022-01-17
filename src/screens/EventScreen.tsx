import {
  Box,
  Center,
  Image,
  ScrollView,
  VStack,
  Text,
  Icon,
  HStack,
  IconButton,
  Link,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { EventType } from "../../types";
import TTPic from "../../assets/images/TTPic.png";
import Header from "../components/Header";

import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const dummyEvent: EventType = {
  name: "VROOOOOOM",
  location: "London, that place",
  month: "Jan",
  day: 3,
  description: "Heeheeheeee Hahahahahahaha",
};

const EventScreen = ({ route, children }): JSX.Element => {
  const navigation = useNavigation();
  const { event } = route.params ?? dummyEvent;
  const imageUri = event ? event.imageUri : null;

  const firebaseStorageReference = ref(storage, imageUri);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const firebaseDownloadUrl = await getDownloadURL(
        firebaseStorageReference
      );
      setDownloadUrl(firebaseDownloadUrl);
    })();
  }, []);

  return (
    <>
      <VStack>
        <ScrollView>
          <ImageBackground
            source={event ? { uri: downloadUrl } : TTPic}
            // source={TTPic}
            resizeMode="cover"
            style={styles.image}
          >
            <IconButton
              _icon={{
                as: MaterialCommunityIcons,
                name: "keyboard-backspace",
                color: "white",
                size: "md",
              }}
              variant="ghost"
              _pressed={{
                color: "gray.200",
              }}
              position="absolute"
              left="5"
              top="7"
              onPress={() => navigation.navigate("Home Screen")}
            />
            <Box
              bgColor="gray.100"
              roundedTop="2xl"
              position="absolute"
              top="280"
              height="5"
              width="100%"
            ></Box>
          </ImageBackground>
          <Box bgColor="gray.100">
            <Box p="6" pt="0">
              <Text bold fontSize="xl">
                Event Details
              </Text>
              <Box
                alignSelf="flex-start"
                w="15%"
                h="2%"
                bgColor="red.400"
                rounded="xl"
                ml="1"
              />
              <Text mt="6" bold fontSize="2xl">
                {event && event.name}
                {!event && "VROOOOOOOM"}
              </Text>

              <HStack mt="2" ml="1">
                <Icon
                  as={MaterialCommunityIcons}
                  name="clock-time-two"
                  color="red.400"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  size="sm"
                />
                <Text fontSize="lg" bold ml="3" mb="1">
                  {event.fullDate}
                </Text>
              </HStack>

              <HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-marker"
                  color="red.400"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
                <Text bold mt="1" ml="2">
                  {event && event.location}
                </Text>
              </HStack>

              {event.gmapsLink && (
                <Center>
                  <Link href={event.gmapsLink}>
                    <Box p="3" rounded="2xl" w="40%" mt="3" bgColor="red.400">
                      <Center>
                        <Text bold>Open in maps</Text>
                      </Center>
                    </Box>
                  </Link>
                </Center>
              )}

              <Text mt="5" white-space="pre-line">
                {event.description}
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </VStack>
    </>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 300,
    // justifyContent: "start",
  },
  text: {
    // white-space: pre-line;
  },
});
