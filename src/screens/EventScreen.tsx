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
  Checkbox,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { EventType } from "../../types";
import TTPic from "../../assets/images/TTPic.png";
import AttendanceList from "../components/AttendanceList";

import { storage, db } from "../../firebase";
import { auth } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

const dummyEvent: EventType = {
  id: "test",
  name: "VROOOOOOM",
  location: "London, that place",
  month: "Jan",
  day: 3,
  description: "Heeheeheeee Hahahahahahaha",
  attendance: [],
};

const EventScreen = ({ route, children }): JSX.Element => {
  const navigation = useNavigation();
  const { event } = route.params ?? dummyEvent;
  const imageUri = event ? event.imageUri : null;

  const firebaseStorageReference = ref(storage, imageUri);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [attendanceList, setAttendanceList] = useState([]);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    console.log(event.attendance);
    (async () => {
      const firebaseDownloadUrl = await getDownloadURL(
        firebaseStorageReference
      );
      setDownloadUrl(firebaseDownloadUrl);
    })();

    const eventAttendanceListListener = onSnapshot(
      doc(db, "events", event.id),
      (doc) => {
        console.log("Current data: ", doc.data());

        let docData = doc.data();
        if (docData) setAttendanceList(docData.attendance);
      }
    );

    return () => {
      // close attendance list listener when navigation from page
      eventAttendanceListListener();
    };
  }, []);

  const onChangeCheckbox = async () => {
    setIsAttending(!isAttending);
  };

  const onConfirmButtonHandler = async () => {
    setIsSubmitting(true);
    const eventRef = doc(db, "events", event.id);

    // set up watch function for event attendance list
    // tabs for attendance
    const currentUserDisplayName = auth.currentUser?.displayName;
    try {
      // update attendance array: remove user is submitting attending: false and vice versa
      await updateDoc(eventRef, {
        attendance: isAttending
          ? arrayUnion(currentUserDisplayName)
          : arrayRemove(currentUserDisplayName),
      });
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
  };

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
              checkbox with update button for attendance
              <Text bold fontSize="xl">
                Attendance
              </Text>
              <Text bold fontSize="md">
                are you coming?
              </Text>
              <HStack mt="3">
                <Checkbox
                  isChecked={isAttending}
                  onChange={onChangeCheckbox}
                  colorScheme="green"
                />
                <Button
                  onPress={onConfirmButtonHandler}
                  isLoading={isSubmitting}
                  alignSelf={"flex-end"}
                  ml="6"
                >
                  Confirm
                </Button>
              </HStack>
              <Text bold fontSize="xl">
                Attendance List
                <AttendanceList attendanceList={attendanceList} />
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
