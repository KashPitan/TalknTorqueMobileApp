import React, { FC } from 'react';
import { Text } from 'native-base';

const AttendeeItem: FC<{ attendee: { name: string } }> = ({
  children,
  attendee,
}) => {
  return (
    <>
      <Text>{attendee.name}</Text>
    </>
  );
};

export default AttendeeItem;
