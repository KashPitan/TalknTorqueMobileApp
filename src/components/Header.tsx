import {
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  Image,
  Box,
  Divider,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import tandtlogo from "../../images/T&T2022LogoCropped.png";

const Header = () => {
  return (
    <>
      <Box bgColor="red.500" p="4" pb="1">
        <HStack marginTop="6">
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  onPress={() => console.log("test")}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <HamburgerIcon color="white" size="md" />
                </Pressable>
              );
            }}
          >
            <Menu.Item>SF Pro</Menu.Item>
            <Menu.Item>Helvetica</Menu.Item>
            <Menu.Item>Cookie</Menu.Item>
          </Menu>

          <Image source={tandtlogo} alt="T&T" size="xs" width="80%" ml="2" />
        </HStack>
      </Box>
      <Divider bg="red.400" />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
