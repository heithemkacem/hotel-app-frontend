import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { Text } from "react-native";
const { black } = colors;
const StyledText = styled.Text`
  font-size: 13px;
  color: ${black};
  text-align: left;
`;
const SmallText = (props) => {
  return <Text {...props}>{props.children}</Text>;
};

export default SmallText;
