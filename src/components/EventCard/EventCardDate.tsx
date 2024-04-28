import { Center, VStack, Text } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { EventDateType } from '../../../types';
import { colors } from '../../constants/themes';

const EventCardDate: FC<{ eventDate: EventDateType }> = ({
  eventDate,
}): JSX.Element => {
  return (
    <Center>
      <VStack>
        <Center>
          <Text bold fontSize="md" alignSelf="center" color={colors.text.light}>
            {eventDate.month}
          </Text>
          <Text bold fontSize="2xl" alignSelf="center">
            {eventDate.day}
          </Text>
        </Center>
      </VStack>
    </Center>
  );
};

export default EventCardDate;

const styles = StyleSheet.create({});
