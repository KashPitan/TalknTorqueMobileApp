import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';
import { Box, IconButton } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TTPic from '../../../assets/images/TTPic.png';
import { storage } from '../../../firebase';
import { EventType } from '../../../types';

const EventImage: FC<{ event: EventType }> = ({ event }): JSX.Element => {
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
            bgColor: 'gray.400',
          }}
          borderWidth={2}
          borderColor={'gray.300'}
          borderRadius={30}
          position="absolute"
          left="8"
          top="12"
          onPress={() => navigation.navigate('Home Screen')}
        />

        {/* this is purely to add rounding to the top of the tabs */}
        <Box
          bgColor={'gray.100'}
          roundedTop="3xl"
          position="absolute"
          top="280"
          height="5"
          width="100%"
        />
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
