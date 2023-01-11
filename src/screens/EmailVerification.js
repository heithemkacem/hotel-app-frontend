import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { white, black, accent } = colors;
// custom components
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import RegularButton from "../components/buttons/RegularButton";
import IconHeader from "../components/icons/IconHeader";
import StyledCodeInput from "../components/inputs/CodeInput";
import ResendTimer from "../components/timers/ResendTimer";
import { ResendEmailAction } from "../_actions/actions/authActions";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const EmailVerification = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  // code input
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // resending email
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState(t("common:Resend"));
  const [resendingEmail, setResendingEmail] = useState(false);

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const dispatch = useDispatch();
  const resendEmail = async (triggerTimer) => {
    dispatch(
      ResendEmailAction(
        route,
        setResendingEmail,
        setResendStatus,
        setActiveResend,
        triggerTimer,
        t
      )
    );
  };
  const handleEmailVerification = async () => {
    setVerifying(true);
  };
  return (
    <MainContainer>
      <IconHeader name="lock-open" style={{ marginBottom: 30 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularText style={{ textAlign: "center", color: black }}>
          {t("common:Digit")}
        </RegularText>
        <StyledCodeInput
          moveto={moveTo}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
          route={route}
          navigation={navigation}
        />
        {!verifying && pinReady && (
          <RegularButton
            color={white}
            onPress={handleEmailVerification}
            disabled={pinReady}
            loading={verifying}
          >
            {t("common:Verify")}
          </RegularButton>
        )}
        {!verifying && !pinReady && (
          <RegularButton
            color={white}
            style={{ backgroundColor: accent }}
            disabled={true}
            loading={verifying}
          >
            {t("common:Verify")}
          </RegularButton>
        )}
        {verifying && (
          <RegularButton disabled={true}>
            <ActivityIndicator size={"small"} color={white} />
          </RegularButton>
        )}
        <ResendTimer
          language={selectedLanguageCode}
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
        />
      </ScrollView>
    </MainContainer>
  );
};
export default EmailVerification;
