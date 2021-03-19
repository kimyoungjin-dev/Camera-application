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
      //status가 granted 인지 확인한다.

      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri); //asset을 만든다.
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME); //특정 이름을 가진 앨범을 쿼리한다.
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false); //앨범이 존재하지않는다면 , 앨범을 생성한다
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false); //앨범이있다면 ,asset을 앨범에 넣는다.
        }
        setTimeout(() => {
          setSmileDetected(false);
        }, 2000); //2초 간격으로 사진을찍는다.
      } else {
        setHasPermission(false); //status==="granted"가 아니라면 접근을 하지못한다는 문구를 보여준다.
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
