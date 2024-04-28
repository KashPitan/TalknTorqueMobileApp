import { Box, Center, FlatList, Text } from 'native-base';
import React, { FC } from 'react';
import { EventType } from '../../types';
import EventCardSmall from './EventCard/EventCardSmall';
import { colors } from '../constants/themes';

const UpcomingEvents: FC<{ events: EventType[] }> = ({
  events,
}): JSX.Element => {
  return (
    <Center>
      {/* <Text
        alignSelf="flex-start"
        fontSize="lg"
        bold
        ml="6"
        mt="5"
        color={colors.text.highlight}
      >
        Upcoming Events
      </Text>

      <Box w="full" mt="2">
        {events.length > 0 ? (
          <>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={events.slice(1)}
              renderItem={(item) => (
                <>
                  <EventCardSmall event={item.item} />
                </>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
              initialScrollIndex={0}
            ></FlatList>
          </>
        ) : (
          <Text>No Upcoming Events :(</Text>
        )}
      </Box> */}
    </Center>
  );
};

export default UpcomingEvents;
