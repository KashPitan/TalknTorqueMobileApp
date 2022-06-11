import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Keyboard,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  Input,
  Center,
  Button,
  Text,
  useToast,
  FormControl,
  Icon,
  IconButton,
  View,
} from "native-base";
import validator from "validator";

import User from "../classes/User";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import TTBackground from "../../assets/images/TTLoginBackground.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InstagramButton from "../components/InstagramButton";

const SignInScreen = ({ navigation }) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const buttonWidth = "85%";
  const buttonHeight = "16";
  const inputFieldWidth = "85%";

  useEffect(() => {
    setLoading(false);
    setPassword("");
    setEmail("");
  }, []);

  const handleSignIn = async () => {
    Keyboard.dismiss();

    const isFormComplete = checkFormFilledOut();
    if (!isFormComplete) return;

    if (error) return;

    try {
      setLoading(true);

      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      const isUserApproved = await User.isApproved(user.user.uid);

      if (isUserApproved) {
        toast.show({ description: "Successfully Logged In! :)" });
        navigation.navigate("Home Screen");
      } else {
        toast.show({ description: "Pending approval" });
        // navigation.navigate("Approval Screen");
      }
    } catch (error) {
      // console.log(error);
      // console.log(error?.message);
      console.log(error.code);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Incorrect login details");
          break;
        case "auth/wrong-password":
          setError("Incorrect login details");
          break;
        case "auth/too-many-requests":
          setError("Incorrect login details");
          break;
        default:
          break;
      }

      setLoading(false);
    }
  };

  const checkFormFilledOut = () => {
    if (!email) {
      setError("You must enter an email");
      return false;
    }

    if (!password) {
      setError("You must enter a password");
      return false;
    }

    return true;
  };

  return (
    <>
      <StatusBar animated={true} showHideTransition={"slide"} hidden={true} />
      <ImageBackground
        source={TTBackground}
        resizeMode="stretch"
        style={styles.backgroundImage}
        blurRadius={20}
      >
        <Center padding="8" w="full" h="full" ml="3.5">
          <FormControl w="full" isInvalid={error}>
            <FormControl.Label>
              <Text bold color="black">
                Email
              </Text>
            </FormControl.Label>
            <Input
              mb="4"
              placeholderTextColor="gray.400"
              placeholder="Login Email"
              onChangeText={(email) => {
                setEmail(email);
                setError(null);
              }}
              size="lg"
              color="black"
              bgColor="gray.100"
              w={inputFieldWidth}
              shadow={5}
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <FormControl.Label>
              <Text bold color="black">
                Password
              </Text>
            </FormControl.Label>
            <Input
              placeholderTextColor="gray.400"
              placeholder="Password"
              type="password"
              onChangeText={(password) => {
                setPassword(password);
                setError(null);
              }}
              size="lg"
              color="black"
              bgColor="gray.100"
              w={inputFieldWidth}
              shadow={5}
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={
                <Icon
                  as={<MaterialCommunityIcons name="alert-circle" />}
                  size={5}
                />
              }
            >
              <Text bold color="red.600">
                {error}
              </Text>
            </FormControl.ErrorMessage>
            {loading ? (
              <Button
                mt="10"
                w={buttonWidth}
                h={buttonHeight}
                bg="black"
                onPress={() => handleSignIn()}
                isLoading
                isLoadingText="Logging in"
              >
                Login
              </Button>
            ) : (
              <Button
                mt="10"
                w={buttonWidth}
                h={buttonHeight}
                bg="black"
                style={styles.dropShadow}
                onPress={() => handleSignIn()}
              >
                Login
              </Button>
            )}

            <Button
              w={buttonWidth}
              h={buttonHeight}
              my="3"
              bg="white"
              style={styles.dropShadow}
              onPress={() => navigation.navigate("Register Screen")}
            >
              Register
            </Button>
          </FormControl>

          <View flexDirection="row" alignSelf="flex-start" w="full">
            <InstagramButton />
            <View flexDirection="column" alignSelf="flex-end" h="full"></View>
          </View>
        </Center>
      </ImageBackground>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width + 20,
    height: Dimensions.get("window").height + 20,
  },
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
