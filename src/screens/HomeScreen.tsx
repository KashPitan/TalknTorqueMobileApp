import {
  Box,
  Text,
  Actionsheet,
  Menu,
  Pressable,
  HamburgerIcon,
  IconButton,
  HStack,
  Center,
  Image,
  Button,
  Divider,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
// import { Line } from "react-native-svg";

import EventCard from "../components/EventCard";
// import EventCard from "../components/EventCard2";

import UpcomingEvent from "../components/UpcomingEvent";
import UpcomingEventList from "../components/UpcomingEventList";

import { EventType } from "../../types";

import { MaterialIcons } from "@expo/vector-icons";
import tandtlogo from "../../images/T&T2022LogoCropped.png";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { DateTime as Luxon } from "luxon";

const testEventData: EventType[] = [
  { month: "Dec", day: 2, name: "We love cars", location: "Here" },
  { month: "Sep", day: 22, name: "Look at cars", location: "There" },
  { month: "Apr", day: 20, name: "Watch Cars", location: "Everywhere" },
  { month: "Oct", day: 17, name: "Buy Cars", location: "This place" },
  // { month: "Jan", day: 20, eventTitle: "Vrooooom", location: "This place" },
];

//home screen as scroll view with upcoming events box

const HomeScreen = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const today = Luxon.now();

  useEffect(() => {
    //extract to another function please
    (async () => {
      try {
        const todayTimestamp = new Date(today.toString());

        const eventCollectionQuery = query(
          collection(db, "events"),
          where("date", ">", todayTimestamp),
          orderBy("date")
        );
        const eventsQuerySnapshot = await getDocs(eventCollectionQuery);
        const eventData = [];
        eventsQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          let date = Luxon.fromSeconds(parseInt(docData.date.seconds));
          let event: EventType = {
            name: docData.name,
            description: docData.description,
            month: `${date.monthShort}`,
            location: docData.location,
            day: date.day,
            imageUri: docData.imageUri,
          };
          eventData.push(event);
        });
        setEvents(eventData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box
      padding="4"
      height="100%"
      bg={{
        linearGradient: {
          colors: ["red.400", "red.600"],
          start: [0, 1],
          end: [1, 0],
        },
      }}
    >
      <HStack marginTop="6">
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable
                onPress={() => console.log("test")}
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon color="white" size="lg" />
              </Pressable>
            );
          }}
        >
          <Menu.Item>SF Pro</Menu.Item>
          <Menu.Item>Helvetica</Menu.Item>
          <Menu.Item>Cookie</Menu.Item>
        </Menu>

        <Image source={tandtlogo} alt="T&T" size="xs" width="80%" ml="2" />
      </HStack>
      {/* <Divider mt="1" /> */}
      <HStack ml="6">
        <Text fontSize="3xl" color="white" bold>
          Next event
        </Text>
      </HStack>

      <Box w="15%" h="0.5%" bgColor="white" rounded="xl" ml="6" mb="2" />
      {/* <Line x1="0" y1="0" x2="100" y2="0" stroke="white" strokeWidth="3" /> */}

      <Center alignItems="flex-start" flexDirection="row">
        <EventCard />
        {/* imageUri={events[0].imageUri ?? "test"}  */}
      </Center>

      <Actionsheet isOpen={true} disableOverlay>
        <Actionsheet.Content px="4">
          <Text alignSelf="flex-start" fontSize="2xl" bold>
            Upcoming events
          </Text>
          <Box
            alignSelf="flex-start"
            w="15%"
            h="1%"
            bgColor="red.400"
            rounded="xl"
          />
          <Box w="full" mt="2">
            <UpcomingEventList eventList={events} />
          </Box>
          {/* <UpcomingEvent /> */}
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default HomeScreen;
