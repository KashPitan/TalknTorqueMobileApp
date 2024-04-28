import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { Box, Button, Center, Checkbox, HStack, Text } from 'native-base';
import React, { FC, useEffect, useState, memo } from 'react';
import { auth, db } from '../../../firebase';
import { EventType } from '../../../types';
import AttendanceList from './AttendanceList';
import { colors } from '../../constants/themes';

const EventAttendance: FC<{ event: EventType }> = ({
  children,
  event,
}): JSX.Element => {
  const [attendanceList, setAttendanceList] = useState<{}>({});
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    console.log(event.attendance);
    const eventAttendanceListListener = onSnapshot(
      doc(db, 'events', event.id),
      (doc) => {
        const docData = doc.data();
        if (docData) {
          const attendanceListFromDocument = docData.attendance;
          setAttendanceList(attendanceListFromDocument);
        }
      }
    );

    return () => {
      // close attendance list listener when navigation from page
      eventAttendanceListListener();
    };
  }, []);

  useEffect(() => {
    // set the attendance status of the current user based on the event attendance information
    const currentUserDisplayName = auth.currentUser?.displayName;
    const currentUserId = auth.currentUser?.uid;

    if (currentUserDisplayName && currentUserId) {
      setIsAttending(attendanceList[currentUserId]);
    } else {
      setIsAttending(false);
    }
  }, [attendanceList]);

  const onChangeCheckbox = () => {
    setIsAttending(!isAttending);
  };

  const onConfirmButtonHandler = async () => {
    setIsSubmitting(true);
    const eventRef = doc(db, 'events', event.id);

    const currentUserDisplayName = auth.currentUser?.displayName;
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId || !currentUserDisplayName) return;
    try {
      const userRef = doc(db, 'users', currentUserId);
      const userDocSnapshot = await getDoc(userRef);

      if (!userDocSnapshot.exists()) return;
      const user = userDocSnapshot.data();
      const pushToken = user.pushNotificationToken;

      const data = {
        name: currentUserDisplayName,
        pushNotificationToken: pushToken,
      };

      const attendeeIdentifier = `attendance.${currentUserId}`;

      // update attendance array: remove user is submitting attending: false and vice versa
      await updateDoc(eventRef, {
        [attendeeIdentifier]: isAttending ? data : deleteField(),
      });
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Box p="6">
        <HStack my="2">
          <Checkbox
            isChecked={isAttending}
            onChange={onChangeCheckbox}
            colorScheme="green"
            value="one"
          />
          <Text bold fontSize="md" ml="2">
            Are you coming?
          </Text>
        </HStack>

        <AttendanceList attendanceList={attendanceList} />
        <Center>
          <Button
            onPress={onConfirmButtonHandler}
            isLoading={isSubmitting}
            rounded="full"
            width="90%"
            bgColor={colors.text.highlight}
            color={colors.text.highlight}
          >
            <Text fontSize="lg" bold color={colors.text.white}>
              {isAttending ? 'Join Event' : 'Mark as NOT attending'}
            </Text>
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default memo(EventAttendance);
