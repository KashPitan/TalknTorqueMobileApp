import React, { useState } from 'react';
import { Box, Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/themes';

const Footer = () => {
  const [selected, setSelected] = useState(1);
  return (
    <HStack bg="white" alignItems="center" safeAreaBottom shadow={6} h="9%">
      <Pressable
        bg={selected === 0 ? 'gray.100' : 'white'}
        mx="4"
        rounded={'xl'}
        py="3"
        flex={1}
        onPress={() => setSelected(0)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 0 ? 'home' : 'home-outline'}
              />
            }
            color={selected === 0 ? colors.text.highlight : colors.text.light}
            size="xl"
          />
        </Center>
      </Pressable>
      <Pressable
        bg={selected === 1 ? 'gray.100' : 'white'}
        mx="4"
        py="2"
        rounded={'xl'}
        flex={1}
        onPress={() => setSelected(1)}
      >
        <Center>
          <Icon
            mb="1"
            as={<MaterialIcons name="search" />}
            color={selected === 1 ? colors.text.highlight : colors.text.light}
            size="xl"
          />
        </Center>
      </Pressable>
      <Pressable
        bg={selected === 2 ? 'gray.100' : 'white'}
        mx="4"
        py="2"
        rounded="xl"
        flex={1}
        onPress={() => setSelected(2)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 2 ? 'account' : 'account-outline'}
              />
            }
            color={selected === 2 ? colors.text.highlight : colors.text.light}
            size="xl"
          />
        </Center>
      </Pressable>
    </HStack>
  );
};

export default Footer;
