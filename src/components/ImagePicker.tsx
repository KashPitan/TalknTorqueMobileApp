import { Box, Button, Center, Image, Text } from 'native-base';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { colors } from '../constants/themes';

const ImagePicker: FC<{
  setParentImageState: (imageUri: string) => void;
  image: string | null;
}> = ({ setParentImageState, image }) => {
  const [imageState, setImageState] = useState<string | null>();
  const buttonHandler = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.uri);
      setImageState(result.assets[0].uri);
      setParentImageState(result.assets[0].uri);
    }
  };

  return (
    <View>
      {imageState ? (
        <Center>
          <Image
            source={{ uri: imageState }}
            style={{ width: 200, height: 200 }}
          />
        </Center>
      ) : (
        <Center>
          <Box
            style={{ width: 200, height: 200 }}
            borderWidth="2"
            borderColor="black"
          >
            <Center flex={1}>
              <Text>No image selected</Text>
            </Center>
          </Box>
        </Center>
      )}

      <Button
        rounded="3xl"
        bgColor={colors.text.highlight}
        mt="3"
        onPress={() => buttonHandler()}
      >
        Select Image
      </Button>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
