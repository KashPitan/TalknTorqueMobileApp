import React, { FC } from "react";
import { FlatList, Text } from "native-base";

const AttendanceList: FC<{ attendanceList: string[] }> = ({
  children,
  attendanceList,
}) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={attendanceList}
      renderItem={(item) => <Text>{item.item}</Text>}
    />
  );
};

export default AttendanceList;
