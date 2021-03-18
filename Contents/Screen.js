import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  margin: 10px 0px;
`;

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Screen = ({ type, zoom, whiteBalance }) => {
  const onFacesDetected = (faces) => {
    console.log(faces);
  };
  return (
    <Container>
      <Camera
        style={{
          width: WIDTH / 1,
          height: HEIGHT / 2.5,
        }}
        type={type}
        zoom={zoom}
        whiteBalance={whiteBalance}
        onFacesDetected={onFacesDetected}
      />
    </Container>
  );
};

export default Screen;
