import { useNavigation } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  HStack,
  VStack,
  Text,
  Center,
  Button,
} from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { EventType } from "../../types";

const UpcomingEventItem: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Button
      style={styles.actionSheetItem}
      bg="gray.300"
      p="0"
      my="1"
      onPress={() => navigation.navigate("Event Screen", { event })}
      rounded="lg"
      // startIcon={}
    >
      <HStack>
        <Box
          bgColor="red.400"
          w="23%"
          // h="full"
          rounded="lg"
          borderWidth="3"
          borderColor="red.600"
          // mr="2"
          // ml="3"
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
        <Center w="74%" ml="2">
          <Text
            underline
            alignSelf="flex-start"
            bold
            fontSize="xl"
            color="red.600"
          >
            {event.name}
          </Text>
          <Text alignSelf="flex-start" fontSize="sm">
            {event.location}
          </Text>
          <Text alignSelf="flex-start" isTruncated>
            {event.fullDate}
          </Text>
        </Center>
      </HStack>
    </Button>
  );
};

export default UpcomingEventItem;

const styles = StyleSheet.create({
  actionSheetItem: {
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
});
