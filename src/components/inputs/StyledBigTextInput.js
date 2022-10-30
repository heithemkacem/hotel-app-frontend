//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "./../texts/SmallText";
const { primary, secondary, lightGray, black } = colors;
const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -10px;
`;
const InputField = styled.TextInput`
  background-color: ${primary};
  padding-left: 65px;
  padding-right: 65px;
  font-size: 16px;
  height: 60px;
  color: ${black};

  border-width: 2px;
`;

const StyledBigTextInput = ({
  icon,
  label,
  isPassword,
  language,
  errors,
  ...props
}) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState("primary");
  const [hidePassword, setHidePassword] = useState(true);
  const customOnBlur = () => {
    props?.onBlur;
    setInputBackgroundColor("transparent");
  };
  const customOnFocus = () => {
    props?.onFocus;
    setInputBackgroundColor("transparent");
  };

  if (language === "en") {
    return (
      <View>
        <SmallText style={{ fontWeight: "600" }}>{label}</SmallText>
        <InputField
          {...props}
          placeholderTextColor={lightGray}
          style={{
            backgroundColor: inputBackgroundColor,
            ...props?.style,
            borderRadius: 20,
            borderColor: errors ? "red" : secondary,
          }}
          onBlur={customOnBlur}
          onFocus={customOnFocus}
          secureTextEntry={isPassword && hidePassword}
        />
        {
          //if there is an error show the error message and the icon of error message
          errors && (
            //show text that contain the error message
            <RowContainer>
              <Text style={{ color: "red" }}>{errors}</Text>
              <MaterialCommunityIcons
                name="alert-circle"
                size={25}
                color="red"
              />
            </RowContainer>
          )
        }
      </View>
    );
  } else {
    return (
      <View>
        <SmallText style={{ fontWeight: "600", textAlign: "right" }}>
          {label}
        </SmallText>
        <InputField
          {...props}
          placeholderTextColor={lightGray}
          style={{
            backgroundColor: inputBackgroundColor,
            ...props?.style,
            textAlign: "right",
            borderRadius: 20,
          }}
          onBlur={customOnBlur}
          onFocus={customOnFocus}
          secureTextEntry={isPassword && hidePassword}
        />
        {
          //if there is an error show the error message and the icon of error message
          errors && (
            //show text that contain the error message
            <RowContainer>
              <MaterialCommunityIcons
                name="alert-circle"
                size={25}
                color="red"
              />
              <Text style={{ color: "red", textAlign: "right" }}>{errors}</Text>
            </RowContainer>
          )
        }
      </View>
    );
  }
};

export default StyledBigTextInput;
