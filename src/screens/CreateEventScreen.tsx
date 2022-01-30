import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import uuid from "react-native-uuid";

import DateTimePicker from "@react-native-community/datetimepicker";
import ImagePicker from "../components/ImagePicker";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const CreateEventScreen = () => {
  const [formState, setFormState] = useState({
    name: "",
    date: new Date(1598051730000),
    description: "",
    location: "",
    gmapsLink: "",
  });

  const [image, setImage] = useState<null | string>(null);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [mode, setMode] = useState<string>("date");
  const inputFieldWidth = "85%";

  const onChangeDate = (event, selectedDate) => {
    //this function is called when you hit confirm or cancel which causes the app to crash
    //if cancel is hit because there is no date being passed through
    //to prevent it trying to run the logic below and failing this line checks if the date
    //   is being changed first
    if (!selectedDate) return;

    const currentDate = selectedDate || formState.date;
    setFormState({ ...formState, date: selectedDate });
    setDatePickerVisible(false);
    console.log("date changing");
  };

  const showTimePicker = () => {
    setMode("time");
    setDatePickerVisible(true);
  };

  const showDatePicker = () => {
    setMode("date");
    setDatePickerVisible(true);
  };

  const onSubmit = async () => {
    console.log("submit");
    // send image to storage first

    // const task = await eventImageRef.putFile();
    // get response saying image added
    // get image storage url
    // add to form data and submit
    // create new event record
    uploadImage();
  };

  const uploadImage = async () => {
    if (!image) return;

    const eventImageRef = ref(storage, uuid.v4());
    //convert image to array of bytes
    const img = await fetch(image);
    const bytes = await img.blob();
    const upload = await uploadBytes(eventImageRef, bytes);
    console.log(upload);
    console.log(await getDownloadURL(eventImageRef));
  };

  const setImageState = (imageUri: string) => {
    setImage(imageUri);
  };

  return (
    <>
      <Center mt="4">
        <Text fontSize="lg" bold={true} my="6">
          Create New Event
        </Text>
      </Center>
      <Divider />
      <ScrollView flex={1}>
        <VStack width="90%" mx="3" mt="6">
          <FormControl isRequired my="2">
            <FormControl.Label _text={{ bold: true }}>
              Event Name
            </FormControl.Label>
            <Input
              placeholder="John"
              size="lg"
              onChangeText={(value) =>
                setFormState({ ...formState, name: value })
              }
            />
          </FormControl>
          <FormControl my="2">
            <FormControl.Label _text={{ bold: true }}>
              Event Description
            </FormControl.Label>
            <TextArea
              placeholder="Event description"
              placeholderTextColor="gray.400"
              size="lg"
              onChangeText={(description) =>
                setFormState({ ...formState, description })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label _text={{ bold: true }}>
              Location
            </FormControl.Label>
            <Input
              placeholder="Google maps location link"
              placeholderTextColor="gray.400"
              onChangeText={(gmapsLink) =>
                setFormState({ ...formState, gmapsLink })
              }
              size="lg"
              color="black"
              //   w={inputFieldWidth}
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label _text={{ bold: true }}>Date</FormControl.Label>
            <Input
              value={
                formState.date ? formState.date.toString() : "Date not set"
              }
              placeholder="Date"
              placeholderTextColor="gray.400"
              onChangeText={(date) => setFormState({ ...formState, date })}
              size="lg"
              color="gray.400"
              isDisabled={true}
              //   w={inputFieldWidth}
            />
            <Button onPress={() => showDatePicker()}>Select Date</Button>
          </FormControl>

          <FormControl isRequired my="1">
            <FormControl.Label _text={{ bold: true }}>Time</FormControl.Label>
            <Input
              value={
                formState.date ? formState.date.toString() : "Date not set"
              }
              placeholder="Time"
              placeholderTextColor="gray.400"
              onChangeText={(date) => setFormState({ ...formState, date })}
              size="lg"
              color="gray.400"
              isDisabled={true}
            />

            <Button onPress={() => showTimePicker()}>Select Time</Button>
          </FormControl>

          <FormControl my="1">
            <FormControl.Label _text={{ bold: true }}>
              Event Image
            </FormControl.Label>
            <ImagePicker setParentImageState={setImageState} image={image} />
          </FormControl>

          <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Submit
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({});
