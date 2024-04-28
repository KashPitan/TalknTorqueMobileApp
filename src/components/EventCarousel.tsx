import { Box, FlatList, Text, Image } from 'native-base';
import React from 'react';

const EventCarousel = () => {
  return (
    <Box bgColor="gray.200">
      <Box my="3" bgColor="red.500" borderTopRadius={40} mb="6" h="full">
        <Text fontSize="2xl" color="white" bold ml="6" pt="3" mt="4">
          Gallery
        </Text>
        <Box w="11%" h="1" bgColor="white" rounded="xl" mb="3" ml="8" />

        {/* <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={images}
          renderItem={(item) => (
            <Image source={item.item} mx="2" size="2xl" rounded="2xl" />
          )}
          horizontal
          initialScrollIndex={1}
          mb="6"
        ></FlatList> */}
      </Box>
    </Box>
  );
};

export default EventCarousel;
