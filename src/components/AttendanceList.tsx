import React, { FC } from "react";
import { FlatList, Text } from "native-base";

const AttendanceList: FC<{ attendanceList: {} }> = ({
  children,
  attendanceList,
}) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={Object.keys(attendanceList)}
      renderItem={(item) => <Text>{attendanceList[item.item].name}</Text>}
    />
  );
};

export default AttendanceList;
