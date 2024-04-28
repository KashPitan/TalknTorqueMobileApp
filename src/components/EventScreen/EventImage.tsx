import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';
import { Box, IconButton, Text } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TTPic from '../../../assets/images/TTPic.png';
import { storage } from '../../../firebase';
import { EventType } from '../../../types';
import { colors } from '../../constants/themes';

const EventImage: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  const navigation = useNavigation();
  const imageUri = event ? event.imageUri : '';
  const firebaseStorageReference = ref(storage, imageUri);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const firebaseDownloadUrl = await getDownloadURL(
        firebaseStorageReference
      );
      setDownloadUrl(firebaseDownloadUrl);
    })();
  }, []);
  return (
    <>
      <ImageBackground
        source={event ? { uri: downloadUrl } : TTPic}
        resizeMode="cover"
        style={styles.image}
      >
        <IconButton
          _icon={{
            as: MaterialCommunityIcons,
            name: 'keyboard-backspace',
            color: 'black',
            size: 'md',
          }}
          variant="solid"
          bg="white"
          shadow={9}
          _pressed={{
            color: 'gray.200',
          }}
          borderRadius={30}
          position="absolute"
          left="10"
          top="12"
          onPress={() => navigation.navigate('Home Screen')}
        />

        <Box
          bgColor={colors.background}
          roundedTop="2xl"
          position="absolute"
          top="280"
          height="5"
          width="100%"
        ></Box>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
});

export default EventImage;
