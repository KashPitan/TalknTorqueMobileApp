import { Box, Button, Center, Image, Text } from "native-base";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";

// interface ImagePickerProps {
//   setParentImageState: (imageUri: string) => void;
//   image: string | undefined;
// }

const ImagePicker: FC<{
  setParentImageState: (imageUri: string) => void;
  image: string;
}> = ({ setParentImageState, image }) => {
  // const [image, setImage] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);

  const buttonHandler = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setParentImageState(result.uri);
    }
  };

  return (
    <View>
      {image ? (
        <Center>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
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

      <Button mt="3" onPress={() => buttonHandler()}>
        Select Image
      </Button>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
