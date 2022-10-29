import React from "react";
import { Text } from "react-native";
import { colors } from "../colors";
const { tertiary } = colors;

const RegularText = (props) => {
  return (
    <Text style={{ fontSize: 15, color: tertiary }} {...props}>
      {props.children}
    </Text>
  );
};

export default RegularText;
