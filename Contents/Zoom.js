import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Container = styled.View`
  position: absolute;
  flex-direction: row;
  right: 0;
  padding-right: 10px;
`;

const Zoom = ({ setZoom, zoom }) => {
  return (
    <Container>
      <FontAwesome
        name={"plus-circle"}
        size={40}
        color="white"
        onPress={() => setZoom((zoom) => zoom + 0.03)}
        style={{ marginRight: 30 }}
      />

      <FontAwesome
        name={"minus-circle"}
        size={40}
        color="white"
        onPress={() => setZoom((zoom) => zoom - 0.03)}
      />
    </Container>
  );
};

export default Zoom;
