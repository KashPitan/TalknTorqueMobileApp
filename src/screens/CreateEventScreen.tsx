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
import { DateTime as Luxon } from "luxon";

import DateTimePicker from "@react-native-community/datetimepicker";
import ImagePicker from "../components/ImagePicker";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";

import { EventRecordType } from "../../types";
import Event from "../classes/Event";

const CreateEventScreen = () => {
  const [formState, setFormState] = useState({
    name: "",
    initialDate: new Date(Luxon.now().toMillis()),
    description: "",
    location: "",
    gmapsLink: "",
    time: "",
    displayTime: "",
    date: "",
    displayDate: "",
    day: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
  });
  const [errors, setErrors] = useState<string | null>(null);

  const [image, setImage] = useState<null | string>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [mode, setMode] = useState<string>("date");

  const onChangeDate = (event, selectedDate) => {
    // this function is called when you hit confirm or cancel which causes the app to crash
    // if cancel is hit because there is no date being passed through
    // to prevent it trying to run the logic below and failing this line checks if the date
    // is being changed first
    if (!selectedDate) return;

    //remove 'Z' from end of date string
    const splitDate = selectedDate.toString().split("G")[0].trim();

    const formattedDate = Luxon.fromFormat(
      splitDate,
      "EEE MMM dd yyyy HH:mm:ss"
    );

    if (mode === "date") {
      setFormState({
        ...formState,
        displayDate: formattedDate.toFormat("EEE MMM dd yyyy"),
        date: splitDate,
        day: formattedDate.day,
        month: formattedDate.month - 1,
        year: formattedDate.year,
      });
    } else if (mode === "time") {
      console.log(formattedDate.toFormat("HH:mm:ss"));

      setFormState({
        ...formState,
        displayTime: formattedDate.toFormat("HH:mm:ss"),
        time: splitDate,
        hours: formattedDate.hour,
        minutes: formattedDate.minute,
      });
    }

    setDatePickerVisible(false);
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
    setIsSubmittingForm(true);
    const isValidated = validate();
    if (isValidated === false) {
      setIsSubmittingForm(false);
      return;
    }

    const dateObjectForcConversion = new Date(
      formState.year,
      formState.month,
      formState.day,
      formState.hours,
      formState.minutes
    );

    const stamp = new Timestamp(dateObjectForcConversion.getTime() / 1000, 0);

    const eventImageDownloadUrl = await uploadImage();
    const newEventDoc: EventRecordType = {
      name: formState.name,
      description: formState.description,
      location: formState.location,
      gmapsLink: formState.gmapsLink,
      imageUri: eventImageDownloadUrl,
      date: stamp,
    };

    await Event.uploadEvent(newEventDoc);

    setIsSubmittingForm(false);
  };

  const uploadImage = async () => {
    if (!image) return;

    const eventImageRef = ref(storage, uuid.v4());

    //convert image to array of bytes
    const img = await fetch(image);
    const bytes = await img.blob();
    const upload = await uploadBytes(eventImageRef, bytes);

    const eventImageDownloadUrl = await getDownloadURL(eventImageRef);
    return eventImageDownloadUrl;
  };

  const setImageState = (imageUri: string) => {
    setImage(imageUri);
  };

  const validate = () => {
    if (formState.name === "") {
      setErrors("Event name is required");
      console.log("hi");
      return false;
    }

    if (formState.day === 0) {
      setErrors("Date is required");
      return false;
    }

    if (formState.hours === 0) {
      setErrors("Time is required");
      return false;
    }

    if (formState.location === "") {
      setErrors("Location is required");
      return false;
    }

    if (formState.gmapsLink) {
      if (formState.gmapsLink.includes("https://goo.gl/maps/")) {
        setErrors("Invalid google maps link");
        return false;
      }
    }
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
              placeholder="Event name not set"
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
              placeholder="Location not set"
              placeholderTextColor="gray.400"
              onChangeText={(location) =>
                setFormState({ ...formState, location })
              }
              size="lg"
              color="black"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label _text={{ bold: true }}>
              Google Maps Link
            </FormControl.Label>
            <Input
              placeholder="Google maps location link not set"
              placeholderTextColor="gray.400"
              onChangeText={(gmapsLink) =>
                setFormState({ ...formState, gmapsLink })
              }
              size="lg"
              color="black"
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label _text={{ bold: true }}>Date</FormControl.Label>
            <Input
              value={
                formState.date
                  ? formState.displayDate.toString()
                  : "Date not set"
              }
              placeholder="Date"
              placeholderTextColor="gray.400"
              onChangeText={(date) => setFormState({ ...formState, date })}
              size="lg"
              color="gray.400"
              isDisabled={true}
            />
            <Button onPress={() => showDatePicker()}>Select Date</Button>
          </FormControl>

          <FormControl isRequired my="1">
            <FormControl.Label _text={{ bold: true }}>Time</FormControl.Label>
            <Input
              value={formState.time ? formState.displayTime : "Time not set"}
              placeholder="Time"
              placeholderTextColor="gray.400"
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

            {errors && (
              <Box>
                <Text>Error: {errors}</Text>
              </Box>
            )}
          </FormControl>

          <Button
            onPress={onSubmit}
            isLoading={isSubmittingForm}
            isLoadingText="Submitting"
            colorScheme="cyan"
            mt="5"
          >
            Submit
          </Button>
        </VStack>
      </ScrollView>
      {datePickerVisible && (
        <DateTimePicker
          value={formState.initialDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({});
