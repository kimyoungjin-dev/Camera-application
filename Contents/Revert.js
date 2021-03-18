import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import Zoom from "../Contents/Zoom";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Revert = ({ type, setType, setZoom }) => {
  return (
    <Container>
      <TouchableOpacity
        onPress={() =>
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )
        }
      >
        <Ionicons
          name={
            type === Camera.Constants.Type.back
              ? "camera-reverse"
              : "camera-outline"
          }
          size={50}
          color="white"
        />
      </TouchableOpacity>
      <Zoom setZoom={setZoom} />
    </Container>
  );
};

export default Revert;
