import { Box, Center, Text } from "native-base";
import React, { FC } from "react";
import { EventType } from "../../types";
import { colors } from "../constants/themes";
import UpcomingEventList from "./UpcomingEventList";

const PastEvents: FC<{ events: EventType[] }> = ({ events }): JSX.Element => {
  return (
    <Center mx="5" mt="5">
      <Text
        alignSelf="flex-start"
        fontSize="lg"
        bold
        ml="2"
        color={colors.text.highlight}
      >
        Past Events
      </Text>

      <Box w="full" mt="1">
        {events.length > 0 ? (
          <>
            <UpcomingEventList eventList={events} />
          </>
        ) : (
          <Text>No Past Events :(</Text>
        )}
      </Box>
    </Center>
  );
};

export default PastEvents;
