//!This is the otp verification component
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import { VerifyOTPAction } from "./../../_actions/actions/authActions";
import { useTranslation } from "react-i18next";
const { secondary, black, accent } = colors;
const StyledCodeSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 35px;
`;
const CodeInputContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
`;

const HiddenTextInput = styled.TextInput`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`;
const CodeInputText = styled.View`
  min-width: 15px;
  padding: 12px;
  border-bottom-width: 3px;
  border-color: ${secondary};
`;
const CodeInputInText = styled.Text`
  font-size: 22px;
  StyledCodeInput
  font-weight: bold;
  text-align: center;
  color: ${black};
`;
const CodeInputFocuced = styled(CodeInputText)`
  border-color: ${accent};
`;
const CodeInput = ({
  route,
  code,
  setCode,
  maxLength,
  setPinReady,
  navigation,
}) => {
  const [focused, setFocused] = useState(false);
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);
  const handleOnPress = (index) => {
    setFocused(true);
    textInputRef?.current?.focus();
  };
  const handleOnSubmitEditing = () => {
    setFocused(false);
  };
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    //toggle pincode
    if (code.length === maxLength) {
      dispatch(VerifyOTPAction(code, route, setPinReady, moveTo, t));
    }
    return () => {
      setPinReady(false);
    };
  }, [code]);

  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;
    //Formmating
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocuced = isCurrentDigit || (isLastDigit && isCodeFull);
    const StyledCodeInput =
      focused && isDigitFocuced ? CodeInputFocuced : CodeInputText;
    return (
      <StyledCodeInput key={index}>
        <CodeInputInText>{digit}</CodeInputInText>
      </StyledCodeInput>
    );
  };
  return (
    <StyledCodeSection>
      <CodeInputContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </CodeInputContainer>

      <HiddenTextInput
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      ></HiddenTextInput>
    </StyledCodeSection>
  );
};

export default CodeInput;
