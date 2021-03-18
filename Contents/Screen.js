import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as FaceDetector from "expo-face-detector";

const Container = styled.View`
  margin: 10px 0px;
`;

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Screen = ({ type, zoom, whiteBalance }) => {
  const [smileDetected, setSmileDetected] = useState(false);
  const onFacesDetected = ({ faces }) => {
    const face = faces[0];
    if (face) {
      if (face.smilingProbability > 0.7) {
        setSmileDetected(true);
        console.log("happy! ^^ ");
      } else if (face.smilingProbability < 0.6) {
        console.log("웃어보세요!");
      }
    }
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
        onFacesDetected={smileDetected ? null : onFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 100,
        }}
      />
    </Container>
  );
};

export default Screen;
