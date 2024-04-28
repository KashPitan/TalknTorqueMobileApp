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
  Center,
  View,
  Icon,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import tandtlogo from '../../images/T&T2022LogoCropped.png';

import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

import { useNavigation } from '@react-navigation/native';
import { checkIsAdmin } from '../../helper/checkIsAdmin';
import { colors } from '../../constants/themes';

const Header = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.show({
        description: 'logged out',
      });

      navigation.navigate('SignIn Screen');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // check the users admin status when their user data is available
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          const adminCheck = await checkIsAdmin();
          console.log('is admin?: ', adminCheck);
          setIsAdmin(adminCheck);
        })();
      }
    });

    return () => {
      // close auth listener
      authListener();
    };
  }, []);
  return (
    <>
      <Box
        bg={{
          linearGradient: {
            colors: ['rose.900', 'red.600'],
            start: [1, 1],
            end: [0, 1],
          },
        }}
        p="4"
        pb="1"
        h="170px"
      >
        <Center></Center>
        <StatusBar animated={true} showHideTransition={'slide'} hidden={true} />
        <HStack mt="1">
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  onPress={() => console.log('test')}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Icon
                    as={Ionicons}
                    name="ellipsis-horizontal"
                    color={colors.text.white}
                    mx="3"
                    mt="3"
                    size="xl"
                  />
                </Pressable>
              );
            }}
          >
            {isAdmin && (
              <Menu.Item
                onPress={() => navigation.navigate('Create Event Screen')}
              >
                Create Event
              </Menu.Item>
            )}

            <Menu.Item onPress={() => setShowModal(true)}>Sign Out</Menu.Item>
            <Menu.Item>
              <Link href="https://www.instagram.com/talkandtorque/">
                <Text underline={false}>Instagram Page</Text>
              </Link>
            </Menu.Item>
          </Menu>
          {/* <Image source={tandtlogo} alt="T&T" size="xs" width="80%" ml="2" /> */}
        </HStack>
        <View h="80%" style={{ justifyContent: 'center' }} pl="3">
          <Text fontSize="lg" color="gray.200">
            Welcome,
          </Text>
          <Text fontSize="3xl" color={colors.text.white} bold>
            {auth.currentUser?.displayName}!
          </Text>
        </View>
      </Box>
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
