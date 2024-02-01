//!This is the component of all reclamtion and dahsboard image
import React from "react";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { Image } from "react-native";
const IconBg = styled.View`
  display: flex;
  width: ${ScreenHeight * 0.25}px;
  height: ${ScreenHeight * 0.18}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
const StyledPressable = styled.Pressable`
  align-self: center;
`;
const ImgComponent = ({ src, ...props }) => {
  return (
    <StyledPressable {...props} onPress={props.onPress}>
      <IconBg style={{ ...props.style }}>
        <Image style={{ width: 170, height: 100 }} source={src} />
      </IconBg>
    </StyledPressable>
  );
};

export default ImgComponent;
