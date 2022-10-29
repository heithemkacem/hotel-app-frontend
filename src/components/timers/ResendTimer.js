//!Resend email component
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SmallText from "./../texts/SmallText";
import PressableText from "./../texts/PressableText";
import { useTranslation } from "react-i18next";
import RownContainer from "./../containers/RownContainer";
const { accent, fail, success, black } = colors;
const StyledView = styled.View`
  align-content: center;
`;
const ResendText = styled.Text`
  color: ${accent}
    ${(props) => {
      const { resendStatus } = props;

      if (resendStatus == "Failed!") {
        return `color : ${fail}`;
      } else if (resendStatus == "Sent!") {
        return `color : ${success}`;
      }
    }};
`;
const ResendTimer = ({
  activeResend,
  setActiveResend,
  resendStatus,
  resendEmail,
  targetTimeInSeconds,

  ...props
}) => {
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

  return (
    <StyledView {...props}>
      <RownContainer>
        <SmallText style={{ color: black }}>
          {t("common:Didint_recieve_this_email")}?
        </SmallText>
        <PressableText
          onPress={() => resendEmail(triggerTimer)}
          disabled={!activeResend}
          style={{ opacity: activeResend ? 1 : 0.5 }}
        >
          <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </PressableText>
      </RownContainer>
      {!activeResend && (
        <SmallText style={{ color: black }}>
          {t("common:in")}
          <SmallText style={{ fontWeight: "600", color: black }}>
            {timeLeft || targetTime}
          </SmallText>
          {t("common:second")}
        </SmallText>
      )}
    </StyledView>
  );
};

export default ResendTimer;
