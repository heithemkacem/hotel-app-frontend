//!Logo Component
import React from "react";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { Image } from "react-native";
const IconBg = styled.View`
  display: flex;
  width: ${ScreenHeight * 0.2}px;
  height: ${ScreenHeight * 0.2}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 25px;
  margin-bottom: 50px;
  fontfamily: "Roboto-Regular";
`;
const Logo = ({ src, ...props }) => {
  return (
    <IconBg style={{ ...props.style }}>
      <Image source={src} style={{ width: 130, height: 180 }} />
    </IconBg>
  );
};

export default Logo;
