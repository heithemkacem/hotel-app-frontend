//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "./../texts/SmallText";
const { primary, secondary, accent, lightGray, black } = colors;
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

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${secondary};
  padding-right: 10px;
`;
const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 15px;
  z-index: 1;
`;

const RightIconArabe = styled.View`
  position: absolute;
  top: 35px;
  right: 5px;
  z-index: 1;
  border-left-width: 2px;
  padding-left: 4px;
  border-color: ${secondary};
  padding-right: 10px;
`;
const LeftIconArabe = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
`;
const StyledTextInput = ({
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
        <LeftIcon>
          <MaterialCommunityIcons name={icon} size={30} color={accent} />
        </LeftIcon>
        <SmallText style={{ fontWeight: "600", marginBottom: 5 }}>
          {label}
        </SmallText>
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

        {isPassword && (
          <RightIcon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <MaterialCommunityIcons
              name={hidePassword ? "eye-off" : "eye"}
              size={30}
              color={accent}
            ></MaterialCommunityIcons>
          </RightIcon>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <RightIconArabe>
          <MaterialCommunityIcons name={icon} size={30} color={accent} />
        </RightIconArabe>
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
        {isPassword && (
          <LeftIconArabe
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <MaterialCommunityIcons
              name={hidePassword ? "eye-off" : "eye"}
              size={30}
              color={accent}
            ></MaterialCommunityIcons>
          </LeftIconArabe>
        )}
      </View>
    );
  }
};

export default StyledTextInput;
