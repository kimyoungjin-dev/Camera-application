import React from "react";
import { TouchableOpacity, Text } from "react-native";
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

const Contents = styled.View`
  align-items: center;
`;

const Revert = ({ type, setType, setZoom }) => {
  return (
    <Container>
      <Contents>
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
        <Text style={{ color: "white", fontSize: 15 }}>
          {type === Camera.Constants.Type.back ? "셀카모드로 전환" : "되돌리기"}
        </Text>
      </Contents>
      <Zoom setZoom={setZoom} />
    </Container>
  );
};

export default Revert;
