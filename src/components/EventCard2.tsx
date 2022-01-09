import React from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  Card,
  Text,
  VStack,
  Image,
  HStack,
  Center,
} from "native-base";
import TTPic from "../../assets/images/TTPic.png";

const EventCard = () => {
  return (
    <>
      <Box rounded="2xl" bg="gray.200" w="90%" h="67%">
        <VStack alignItems="center">
          <Box
            bgColor="red.400"
            w="20%"
            rounded="lg"
            borderWidth="3"
            borderColor="red.600"

            // mr="2"
          >
            <Center>
              <VStack>
                <Center>
                  <Text bold fontSize="2xl">
                    2
                  </Text>
                </Center>

                <Text bold fontSize="md">
                  Dec
                </Text>
              </VStack>
            </Center>
          </Box>
          <Image
            roundedTop="2xl"
            source={TTPic}
            alt="T&T"
            size="xl"
            h="72%"
            width="full"
          />
          <HStack></HStack>
        </VStack>
      </Box>
    </>
  );
};

export default EventCard;

const styles = StyleSheet.create({});
