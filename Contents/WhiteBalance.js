import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
`;

const WhiteBalance = ({ setWhiteBalance }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => setWhiteBalance("auto")}>
        <MaterialCommunityIcons name="autorenew" size={30} color="white" />
        <Text>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setWhiteBalance("sunny")}>
        <Ionicons name="partly-sunny-outline" size={30} color="black" />
        <Text>sunny</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setWhiteBalance("shadow")}>
        <Ionicons
          name="color-fill-outline"
          size={30}
          color="black"
          onPress={() => setWhiteBalance("shadow")}
        />
        <Text>Yellow</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setWhiteBalance("fluorescent")}>
        <MaterialCommunityIcons
          name="cloud"
          size={30}
          color="black"
          onPress={() => setWhiteBalance("fluorescent")}
        />
        <Text>dark</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setWhiteBalance("incandescent")}>
        <MaterialCommunityIcons
          name="zodiac-aquarius"
          size={30}
          color="black"
          onPress={() => setWhiteBalance("incandescent")}
        />
        <Text>aqua</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default WhiteBalance;
