import React from "react";
import { colors } from "../colors";
import SmallText from "../texts/SmallText";
import { Pressable } from "react-native";
const { accent } = colors;

const PressableText = (props) => {
  if (props.language === "en") {
    return (
      <Pressable {...props} onPress={props.onPress}>
        <SmallText style={{ color: accent }}>{props.children}</SmallText>
      </Pressable>
    );
  } else {
    return (
      <Pressable {...props} onPress={props.onPress}>
        <SmallText style={{ color: accent }}>{props.children}</SmallText>
      </Pressable>
    );
  }
};

export default PressableText;
