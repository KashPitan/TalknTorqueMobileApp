import { useState } from "react";
import { StyleSheet, Image as rnImage, Keyboard } from "react-native";
import { Input, Center, Button, Box, Image, Text } from "native-base";
import { auth } from "../../firebase";
import { TTLOGO } from "../../assets/index";
import tandtlogo from "../../images/T&T2022Logo.png";
import React from "react";
// const logo = require("../../images/T&T2022Logo.png");

import { signInWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonWidth = "85%";
  const buttonHeight = "16";
  const inputFieldWidth = "85%";

  const handleSignIn = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.navigate("Home Screen");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      bg={{
        linearGradient: {
          colors: ["red.400", "red.600"],
          start: [0, 1],
          end: [1, 0],
        },
      }}
    >
      <Center padding="8" flex={1}>
        <Image source={tandtlogo} alt="T&T" size="2xl" width="full" />

        <Input
          m="3"
          placeholder="enter account email address"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          size="lg"
          color="white"
          w={inputFieldWidth}
        />

        <Input
          placeholder="enter password"
          placeholderTextColor="white"
          type="password"
          onChangeText={(password) => setPassword(password)}
          size="lg"
          color="white"
          w={inputFieldWidth}
        />
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
          onPress={() => navigation.navigate("Register Screen")}
        >
          Register
        </Button>
      </Center>
    </Box>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
