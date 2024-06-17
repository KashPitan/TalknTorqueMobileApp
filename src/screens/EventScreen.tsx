import { Box, Pressable, useColorModeValue, Text } from 'native-base';

import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import EventAttendance from '../components/EventScreen/EventAttendance';
import EventDetails from '../components/EventScreen/EventDetails';
import EventImage from '../components/EventScreen/EventImage';
import { colors } from '../constants/themes';

const EventScreen = ({ route }) => {
  const { event } = route.params;

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'eventDetails', title: 'Details' },
    { key: 'eventAttendance', title: 'Attendance' },
  ]);

  const eventDetailsComponent = () => {
    return <EventDetails event={event} />;
  };
  const eventAttendanceComponent = () => {
    return <EventAttendance event={event} />;
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'eventDetails':
        return eventDetailsComponent();
      case 'eventAttendance':
        return eventAttendanceComponent();
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i: number) => {
          const borderColor =
            index === i
              ? colors.text.highlight
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Pressable
              onPress={() => {
                setIndex(i);
              }}
              borderBottomWidth="3"
              borderColor={borderColor}
              alignItems="center"
              p="3"
              mx="5"
              key={i}
            >
              <Text
                bold
                fontSize="md"
                color={index === i ? colors.text.main : colors.text.light}
              >
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <EventImage event={event} />
      {/* watch out for unecesseary re-renders when using tab view */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};

export default EventScreen;
