import React from "react";

import { colors } from "../colors";
import { Text } from "react-native";
const { tertiary } = colors;

const BigText = (props) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 30,
        color: tertiary,
        textAlign: left,
        fontFamily: "Roboto-Regular",
      }}
    >
      {props.children}
    </Text>
  );
};

export default BigText;
