import { Center, VStack, Text } from "native-base";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { EventDateType } from "../../types";

const EventCardDate: FC<{ eventDate: EventDateType }> = ({
  eventDate,
}): JSX.Element => {
  return (
    <Center>
      <VStack>
        <Center>
          <Text bold fontSize="2xl">
            {eventDate.day}
          </Text>
        </Center>

        <Text bold fontSize="sm">
          {eventDate.month}
        </Text>
      </VStack>
    </Center>
  );
};

export default EventCardDate;

const styles = StyleSheet.create({});
