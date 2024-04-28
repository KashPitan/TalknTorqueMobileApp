import React, { FC } from 'react';
import { FlatList, Text } from 'native-base';
import AttendeeItem from './AttendeeItem';

const AttendanceList: FC<{ attendanceList: {} }> = ({
  children,
  attendanceList,
}) => {
  return (
    <>
      <Text bold fontSize="xl">
        Attendance List
      </Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Object.keys(attendanceList)}
        renderItem={(item) => (
          <AttendeeItem attendee={attendanceList[item.item]}></AttendeeItem>
        )}
      />
    </>
  );
};

export default AttendanceList;
