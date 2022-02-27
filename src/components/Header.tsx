import {
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  Image,
  Box,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import tandtlogo from "../../images/T&T2022LogoCropped.png";
import { useNavigation } from "@react-navigation/native";
import { checkIsAdmin } from "../helper/checkIsAdmin";

const Header = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const adminCheck = await checkIsAdmin();
      console.log(adminCheck);
      setIsAdmin(adminCheck);
    })();
  }, []);
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
            {isAdmin && (
              <Menu.Item
                onPress={() => navigation.navigate("Create Event Screen")}
              >
                create event
              </Menu.Item>
            )}

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
