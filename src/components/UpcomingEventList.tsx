import { FlatList } from 'native-base';
import React, { FC } from 'react';
import { EventType } from '../../types';
import UpcomingEventItem from './UpcomingEventItem';

const UpcomingEventList: FC<{ eventList: EventType[] }> = ({
  eventList,
}): JSX.Element => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={eventList}
      renderItem={(item) => <UpcomingEventItem event={item.item} />}
    />
  );
};

export default UpcomingEventList;
