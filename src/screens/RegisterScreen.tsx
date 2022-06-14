import { useState } from "react";
import {
  StyleSheet,
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
} from "native-base";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import User from "../classes/User";

import validator from "validator";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

import TTBackground from "../../assets/images/TTLoginBackground.png";

const RegisterScreen = ({ navigation }) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [car, setCar] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const buttonWidth = "85%";
  const buttonHeight = "16";
  const inputFieldWidth = "85%";

  const handleRegister = async () => {
    const isFormComplete = checkFormFilledOut();
    if (!isFormComplete) return;

    const isEmailValid = validateEmail();
    if (!isEmailValid) return;

    const isNameValid = validateName();
    if (!isNameValid) return;

    const isPasswordValid = validatePassword();
    if (!isPasswordValid) return;

    if (error) return;

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const res = await updateProfile(userCredential.user, {
          displayName: displayName,
        });

        const userUId = userCredential.user.uid;

        const newUser = new User(userUId, email, displayName, car, false);

        console.log(newUser);

        // add user to the database when registered
        newUser.create();

        const isUserApproved = await User.isApproved(userUId);

        if (isUserApproved) {
          toast.show({ description: "Account succesfully created!" });
          navigation.navigate("Home Screen");
        } else {
          await signOut(auth);
          toast.show({ description: "Account pending approval" });
          navigation.navigate("SignIn Screen");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const checkFormFilledOut = () => {
    if (!displayName) {
      setError("You must enter a name");
      return false;
    }
    if (!password) {
      setError("You must enter a password");
      return false;
    }
    if (!email) {
      setError("You must enter an email");
      return false;
    }
    return true;
  };

  const validateName = () => {
    const isValid = validator.isAlpha(displayName);
    if (!isValid) {
      setError("Name must only contain letters");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const isValid = validator.isEmail(email);
    if (!isValid) {
      setError("Email is not valid");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const isValid = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isValid) {
      setError("Password is not strong enough");
      console.log(password);
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
            <Text fontSize="3xl" color="black" bold>
              Create New Account
            </Text>
            <FormControl.Label>
              <Text bold color="black">
                Email
              </Text>
            </FormControl.Label>
            <Input
              mb="4"
              placeholder="enter your email address"
              placeholderTextColor="gray.400"
              color="black"
              bgColor="gray.100"
              onChangeText={(email) => {
                setEmail(email);
                setError(null);
              }}
              size="lg"
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
                Name
              </Text>
            </FormControl.Label>
            <Input
              mb="4"
              placeholder="enter your name"
              placeholderTextColor="gray.400"
              color="black"
              bgColor="gray.100"
              onChangeText={(displayName) => {
                setDisplayName(displayName);
                setError(null);
              }}
              size="lg"
              w={inputFieldWidth}
              shadow={5}
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="account" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <FormControl.Label>
              <Text bold color="black">
                Car
              </Text>
            </FormControl.Label>
            <Input
              mb="4"
              placeholder="enter your car"
              placeholderTextColor="gray.400"
              color="black"
              bgColor="gray.100"
              onChangeText={(car) => {
                setCar(car);
                setError(null);
              }}
              size="lg"
              w={inputFieldWidth}
              shadow={5}
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="car" />}
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
              type="password"
              placeholder="enter a password"
              placeholderTextColor="gray.400"
              color="black"
              bgColor="gray.100"
              onChangeText={(password) => {
                setPassword(password);
                setError(null);
              }}
              size="lg"
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
                w={buttonWidth}
                h={buttonHeight}
                my="10"
                bg="white"
                size="lg"
                onPress={() => handleRegister()}
                isLoading
                isLoadingText="Registering"
              >
                <Text color="black">Register</Text>
              </Button>
            ) : (
              <Button
                w={buttonWidth}
                h={buttonHeight}
                my="10"
                bg="white"
                size="lg"
                style={styles.dropShadow}
                onPress={() => handleRegister()}
              >
                <Text color="black">Register</Text>
              </Button>
            )}
          </FormControl>
        </Center>
      </ImageBackground>
    </>
  );
};

export default RegisterScreen;

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
