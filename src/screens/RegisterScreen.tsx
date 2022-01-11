import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Center, Button, Box, Text } from "native-base";
import React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonWidth = "85%";
  const buttonHeight = "16";
  const inputFieldWidth = "85%";

  const handleRegister = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
    } catch (error) {
      setLoading(false);
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
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
          placeholder="enter an email address"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          size="lg"
          w={inputFieldWidth}
        />

        <Input
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
