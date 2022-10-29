import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SmallText from "../texts/SmallText";
const { accent } = colors;
const StyledPressable = styled.Pressable`
  align-self: flex-start;
`;
const PressableText = (props) => {
  return (
    <StyledPressable {...props} onPress={props.onPress}>
      <SmallText style={{ color: accent }}>{props.children}</SmallText>
    </StyledPressable>
  );
};

export default PressableText;
