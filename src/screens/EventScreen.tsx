import { Container } from "native-base";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { EventType } from "../../types";

const EventScreen: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  return <Container></Container>;
};

export default EventScreen;

const styles = StyleSheet.create({});
