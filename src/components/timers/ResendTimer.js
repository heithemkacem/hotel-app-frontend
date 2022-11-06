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
  activeResend,
  setActiveResend,
  resendStatus,
  resendEmail,
  targetTimeInSeconds,
  pinReady,
  language,
  ...props
}) => {
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
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  let resendTimerInterval;
  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    const resendTimerInterval = setInterval(
      () => calculateTimeLeft(finalTime),
      1000
    );
  };

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };
  useEffect(() => {
    triggerTimer(targetTimeInSeconds);
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  if (language == "ar") {
    return (
      <StyledView {...props} pinReady={pinReady}>
        <RownContainer>
          <PressableText
            onPress={() => resendEmail(triggerTimer)}
            disabled={pinReady}
            style={{ opacity: activeResend ? 1 : 0.5 }}
          >
            <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
          </PressableText>
          <SmallText style={{ color: black, alignText: "right" }}>
            {t("common:Didint_recieve_this_email")}
          </SmallText>
        </RownContainer>
        {!activeResend && (
          <SmallText style={{ color: black, alignText: "right" }}>
            {t("common:in")}
            <SmallText
              style={{ color: black, alignText: "right", fontWeight: "600" }}
            >
              {" "}
              {timeLeft || targetTime}{" "}
            </SmallText>
            {t("common:second")}
          </SmallText>
        )}
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
            onPress={() => resendEmail(triggerTimer)}
            disabled={pinReady}
            style={{ opacity: activeResend ? 1 : 0.5 }}
          >
            <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
          </PressableText>
        </RownContainer>
        {!activeResend && (
          <SmallText style={{ color: black }}>
            {t("common:in")}
            <SmallText style={{ fontWeight: "600", color: black }}>
              {" "}
              {timeLeft || targetTime}{" "}
            </SmallText>
            {t("common:second")}
          </SmallText>
        )}
      </StyledView>
    );
  }
};

export default ResendTimer;
