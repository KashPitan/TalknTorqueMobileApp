import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Box, Button, Text, VStack, Image, Center } from "native-base";
import TTPic from "../../assets/images/TTPic.png";
import EventCardDate from "./EventCardDate";

const EventCard = () => {
  return (
    <Box rounded="2xl" bg="gray.200" w="90%" h="67%">
      <VStack alignItems="center">
        <ImageBackground
          source={TTPic}
          resizeMode="cover"
          style={styles.image}
          borderRadius={20}
        >
          <Center
            bg="gray.100"
            position="absolute"
            top="270"
            left="0"
            px="3"
            py="0.5"
            roundedBottomLeft="xl"
            borderWidth="2"
            borderColor="gray.300"
          >
            <VStack>
              <Text bold fontSize="sm">
                We Love Cars
              </Text>
            </VStack>
          </Center>

          <EventCardDate />
        </ImageBackground>

        {/* <Image
          roundedTop="2xl"
          source={TTPic}
          alt="T&T"
          size="xl"
          h="100%"
          width="full"
        /> */}
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
