//!Resend email component
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SmallText from "./../texts/SmallText";
import PressableText from "./../texts/PressableText";
import { useTranslation } from "react-i18next";
import RownContainer from "./../containers/RownContainer";
const { accent, fail, success, black } = colors;

const ResendTimer = ({
  setResendStatus,
  resendStatus,
  resendEmail,
  pinReady,
  language,
  ...props
}) => {
  const { t } = useTranslation();
  const StyledView = styled.View`
    align-content: center;
    ${(props) => {
      return props.pinReady ? "opacity: 0.3;" : "opacity: 1;";
    }}
  `;
  const ResendText = styled.Text`
    color: ${accent}
      ${(props) => {
        const { resendStatus } = props;
        if (resendStatus == t("common:Failed")) {
          return `color : ${fail}`;
        } else if (resendStatus == t("common:Sent")) {
          return `color : ${success}`;
        }
      }};
  `;
  if (resendStatus == t("common:Sent")) {
    setTimeout(() => {
      setResendStatus(t("common:Resend"));
    }, 30000);
  }

  if (language == "ar") {
    return (
      <StyledView {...props} pinReady={pinReady}>
        <RownContainer>
          <PressableText
            onPress={() => resendEmail()}
            disabled={pinReady || resendStatus == t("common:Sent")}
            style={{ opacity: !pinReady ? 1 : 0.5 }}
          >
            <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
          </PressableText>
          <SmallText style={{ color: black, alignText: "right" }}>
            {t("common:Didint_recieve_this_email")}
          </SmallText>
        </RownContainer>
      </StyledView>
    );
  } else {
    return (
      <StyledView {...props} pinReady={pinReady}>
        <RownContainer>
          <SmallText style={{ color: black }}>
            {t("common:Didint_recieve_this_email")}
          </SmallText>
          <PressableText
            onPress={() => resendEmail()}
            disabled={pinReady || resendStatus == t("common:Sent")}
            style={{ opacity: !pinReady ? 1 : 0.5 }}
          >
            <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
          </PressableText>
        </RownContainer>
      </StyledView>
    );
  }
};

export default ResendTimer;
