import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Center, Button, Box, Text, useToast } from "native-base";
import React from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonWidth = "85%";
  const buttonHeight = "16";
  const inputFieldWidth = "85%";

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const res = await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
      setLoading(false);
      toast.show({ description: "Account succesfully created!" });
      navigation.navigate("Home Screen");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      padding="10"
      bg={{
        linearGradient: {
          colors: ["red.400", "red.600"],
          start: [0, 1],
          end: [1, 0],
        },
      }}
    >
      <Center flex={1}>
        <Text fontSize="3xl" color="white" bold>
          Create New Account
        </Text>
        <Input
          m="3"
          mt="10"
          placeholder="enter your email address"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          size="lg"
          w={inputFieldWidth}
        />

        <Input
          mb="3"
          placeholder="enter your name"
          placeholderTextColor="white"
          onChangeText={(displayName) => setDisplayName(displayName)}
          size="lg"
          w={inputFieldWidth}
        />

        <Input
          type="password"
          placeholder="enter a password"
          placeholderTextColor="white"
          onChangeText={(password) => setPassword(password)}
          size="lg"
          w={inputFieldWidth}
        />
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
            Register
          </Button>
        ) : (
          <Button
            w={buttonWidth}
            h={buttonHeight}
            my="10"
            bg="white"
            size="lg"
            onPress={() => handleRegister()}
          >
            Register
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
