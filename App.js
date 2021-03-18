import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
  flex: 1;
`;

const App = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
  }, []);

  if (hasPermission === null) {
    return (
      <Container>
        <ActivityIndicator size="large" color="white" />
      </Container>
    );
  } else if (hasPermission === false) {
    return (
      <Container>
        <Text>접근 차단</Text>
      </Container>
    );
  } else {
    return (
      <Container>
        <Camera
          style={{
            width: WIDTH / 1.2,
            height: HEIGHT / 2,
            borderRadius: 20,
            overflow: "hidden",
          }}
          type={type}
        />
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
            color="black"
          />
        </TouchableOpacity>
      </Container>
    );
  }
};

export default App;
