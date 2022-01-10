import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Box, HStack, VStack, Text, Center } from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { EventType } from "../../types";

const UpcomingEventItem: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Actionsheet.Item
      bg="gray.300"
      p="0"
      my="1"
      onPress={() => navigation.navigate("Event Screen", { event })}
      rounded="2xl"
      startIcon={
        <Box
          bgColor="red.400"
          w="25%"
          rounded="lg"
          borderWidth="3"
          borderColor="red.600"
          mr="2"
        >
          <Center>
            <VStack>
              <Center>
                <Text bold fontSize="2xl">
                  {event.day}
                </Text>
              </Center>

              <Text bold fontSize="md">
                {event.month}
              </Text>
            </VStack>
          </Center>
        </Box>
      }
    >
      <HStack>
        <Center w="70%">
          <Text alignSelf="flex-start" bold fontSize="xl" color="red.600">
            {event.name}
          </Text>
          <Text alignSelf="flex-start" fontSize="sm">
            {event.location}
          </Text>
        </Center>
      </HStack>
    </Actionsheet.Item>
  );
};

export default UpcomingEventItem;

const styles = StyleSheet.create({});
