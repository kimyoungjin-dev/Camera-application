import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { ActivityIndicator, Text } from "react-native";
import Revert from "../Contents/Revert";
import WhiteBalance from "../Contents/WhiteBalance";
import Screen from "../Contents/Screen";

const Container = styled.View`
  justify-content: flex-start;
  padding-top: 50px;
  align-items: center;
  background-color: #f67280;
  flex: 1;
`;

const Setting = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState("auto");

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
        <WhiteBalance setWhiteBalance={setWhiteBalance} />
        <Screen type={type} zoom={zoom} whiteBalance={whiteBalance} />
        <Revert type={type} setType={setType} setZoom={setZoom} />
      </Container>
    );
  }
};

export default Setting;
