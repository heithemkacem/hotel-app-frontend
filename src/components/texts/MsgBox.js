import React from "react";
import { colors } from "../colors";
import { Text } from "react-native";
const { success, fail } = colors;

const MsgBox = (props) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 13,
        fontFamily: "Roboto-Regular",
        color: props.success ? success : fail,
        textAlign: center,
      }}
    >
      {props.children}
    </Text>
  );
};

export default MsgBox;
