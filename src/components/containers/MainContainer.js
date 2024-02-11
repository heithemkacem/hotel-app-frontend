//!This is the main container where u can adjust the padding and margin of the app
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
const { primarygray } = colors;
const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${primarygray};
  fontfamily: "Roboto-Regular";
`;
const MainContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default MainContainer;
