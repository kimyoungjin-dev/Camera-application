import React, { useState } from "react";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  margin: 10px 0px;
`;

const ALBUM_NAME = "SmilelyCam";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const cameraRef = React.createRef();

const Screen = ({ type, zoom, whiteBalance, setHasPermission }) => {
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
      alert(error);
      setSmileDetected(false);
    }
  };

  const savePhoto = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
        }
        setTimeout(() => {
          setSmileDetected(false);
        }, 2000);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.log(error);
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
        ref={cameraRef}
        whiteBalance={whiteBalance}
        onFacesDetected={smileDetected ? null : onFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
    </Container>
  );
};

export default Screen;
