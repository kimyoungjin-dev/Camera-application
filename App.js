import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { ActivityIndicator, Text, View } from "react-native";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };
  }, []);

  if (hasPermission === true) {
    return (
      <View>
        <Text>접근 허용되었습니다.</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View>
        <Text>접근이 거절되었습니다.</Text>
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }

  return <></>;
};

export default App;
