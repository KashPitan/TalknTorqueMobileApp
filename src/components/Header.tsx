import {
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  Image,
  Box,
  Divider,
  Text,
  Button,
  useToast,
  Modal,
  FormControl,
  Link,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import tandtlogo from "../../images/T&T2022LogoCropped.png";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { useNavigation } from "@react-navigation/native";
import { checkIsAdmin } from "../helper/checkIsAdmin";

const Header = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.show({
        description: "logged out",
      });

      navigation.navigate("SignIn Screen");
    } catch (error) {
      console.log(error);
    }
  };

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
                Create Event
              </Menu.Item>
            )}

            {/* <Menu.Item>Helvetica</Menu.Item> */}
            {/* <Menu.Item>Cookie</Menu.Item> */}
            <Menu.Item onPress={() => setShowModal(true)}>Sign Out</Menu.Item>
            <Menu.Item>
              <Link href="https://www.instagram.com/talkandtorque/">
                <Text underline={false}>Instagram Page</Text>
              </Link>
            </Menu.Item>
          </Menu>

          <Image source={tandtlogo} alt="T&T" size="xs" width="80%" ml="2" />
        </HStack>
      </Box>
      <Divider bg="red.400" />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Log Out</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Text>Are you sure you want to log out?</Text>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => handleSignOut()}>Yes</Button>
              <Button
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                No
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
