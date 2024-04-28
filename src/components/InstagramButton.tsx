import React from "react";
import { Button, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import * as Linking from "expo-linking";

const InstagramButton = () => {
  const onPressHandler = () => {
    Linking.openURL("https://www.instagram.com/talkandtorque/");
  };
  return (
    <Button
      bgColor="white"
      style={styles.dropShadow}
      size="sm"
      onPress={onPressHandler}
      pl={0}
      pr={3}
      leftIcon={
        <Icon
          as={<MaterialCommunityIcons name="instagram" />}
          size={5}
          ml="2"
          color="black"
        />
      }
    >
      <Text color="black" bold>
        Instagram
      </Text>
    </Button>
  );
};

export default InstagramButton;

const styles = StyleSheet.create({
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
});
