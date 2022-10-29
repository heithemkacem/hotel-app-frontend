//!This is our model will be shown when the user request to show the response
import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BigText from "./../texts/BigText";
import RegularText from "./../texts/RegularText";
import RegularButton from "./../buttons/RegularButton";
const { primary, black, success, fail, tertiary } = colors;
const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;
const ModalView = styled.View`
  background-color: ${primary};
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: ${black};
  shadow-offset: 0 2;
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
`;
const MessageModal = ({
  buttonHandler,
  type,
  headerText,
  message,
  buttonText,
  modalVisible,
}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <ModalPressableContainer onPress={buttonHandler}>
        <ModalView>
          <MaterialCommunityIcons
            name={type === "success" ? "check-circle" : "close-circle"}
            size={100}
            color={type === "success" ? success : fail}
          />
          <BigText style={{ fontSize: 25, color: black, marginVertical: 10 }}>
            {headerText}
          </BigText>
          <RegularText style={{ marginBottom: 20, color: black }}>
            {message}
          </RegularText>
          <RegularButton onPress={buttonHandler}>
            {buttonText || "Proceed"}
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
};

export default MessageModal;
