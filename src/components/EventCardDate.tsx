import { Center, VStack, Text } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";

const EventCardDate = () => {
  return (
    <Center
      bg="gray.100"
      position="absolute"
      bottom="-90"
      left="5"
      px="3"
      py="0.5"
      rounded="xl"
      borderWidth="2"
      borderColor="gray.300"
    >
      <VStack>
        <Center>
          <Text bold fontSize="2xl">
            2
          </Text>
        </Center>

        <Text bold fontSize="sm">
          DEC
        </Text>
      </VStack>
    </Center>
  );
};

export default EventCardDate;

const styles = StyleSheet.create({});
