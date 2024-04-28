import { Box, FlatList, Text, Image } from 'native-base';
import React from 'react';
import { eventPhotos } from '../../images/TTEventIndex';
import { colors } from '../constants/themes';

const images = eventPhotos;
const ImageCarousel = () => {
  return (
    <Box h="100%">
      <Text
        fontSize="lg"
        color={colors.text.highlight}
        bold
        ml="6"
        mb="3"
        mt="3"
      >
        Gallery
      </Text>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={images}
        renderItem={(item) => (
          <Image source={item.item} mx="2" size="2xl" rounded="2xl" />
        )}
        horizontal
        // initialScrollIndex={1}
        mb="6"
        px="4"
      ></FlatList>
    </Box>
  );
};

export default ImageCarousel;
