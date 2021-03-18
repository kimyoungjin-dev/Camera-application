import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as FaceDetector from "expo-face-detector";
import * as FileSystem from "expo-file-system";

const Container = styled.View`
  margin: 10px 0px;
`;

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const cameraRef = React.createRef();

const Screen = ({ type, zoom, whiteBalance }) => {
  const [smileDetected, setSmileDetected] = useState(false);
  const onFacesDetected = ({ faces }) => {
    const face = faces[0];
    if (face) {
      if (face.smilingProbability > 0.7) {
        setSmileDetected(true);
        takePhoto();
      }
    }
  };

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        let { uri } = await cameraRef.current.takePictureAsync({
          quality: 1,
        });
        if (uri) {
          savePhoto(uri);
        }
      }
    } catch (error) {
      alert("error");
      smileDetected(false);
    }
  };

  const savePhoto = async (uri) => {
    console.log(uri);
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
        ref={cameraRef}
        whiteBalance={whiteBalance}
        onFacesDetected={smileDetected ? null : onFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
        }}
      />
    </Container>
  );
};

export default Screen;
