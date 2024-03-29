import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import StyledCodeInput from "../components/inputs/ModifyPasswordCodeInput";
import ResendTimer from "../components/timers/ResendTimer";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  ResetPasswordAction,
  ResendEmailAction,
} from "./../_actions/actions/authActions";

import * as Yup from "yup";

const ResetPassword = ({ navigation, route }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const FormWrapper = styled.View`
    ${(props) => {
      return props.pinReady ? "opacity: 1;" : "opacity: 0.3;";
    }}
  `;

  const { primary, accent } = colors;
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const ResetSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(t("common:EnterNouveaumotdepasse"))
      .min(8, t("common:TooShort"))
      .max(24, t("common:TooLong"))
      .matches(/(?=.*[0-9])/, t("common:Passwordmustcontainanumber"))
      .matches(/(?=.*[a-z])/, t("common:Passwordmustcontainalowercaseletter"))
      .matches(/(?=.*[A-Z])/, t("common:Passwordmustcontainauppercaseletter"))
      .matches(
        /(?=.*[!@#$%^&*])/,
        t("common:Passwordmustcontainaspecialcharacter")
      ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      t("common:Passwordsmustmatch")
    ),
  });
  //code
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [resendStatus, setResendStatus] = useState(t("common:Resend"));

  const resendEmail = async () => {
    dispatch(ResendEmailAction(route, setResendStatus, t));
  };
  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularText
          style={{
            textAlign: "center",
            color: accent,
            fontFamily: "Roboto-Regular",
          }}
        >
          {t("common:Enter_the4digitcode_sent_to_your_email")}
        </RegularText>
        <StyledCodeInput
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
          route={route}
          pinReady={pinReady}
        />
        <ResendTimer
          language={selectedLanguageCode}
          pinReady={pinReady}
          setResendStatus={setResendStatus}
          resendStatus={resendStatus}
          resendEmail={resendEmail}
          style={{ marginBottom: 25 }}
        />
        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validationSchema={ResetSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              ResetPasswordAction(values, setSubmitting, moveTo, route, t)
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
          }) => (
            <FormWrapper pinReady={pinReady}>
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock-open-variant"
                label={t("common:NewPassword")}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("newPassword")}
                value={values.newPassword}
                onBlur={handleBlur("newPassword")}
                style={{ marginBottom: 25 }}
                editable={pinReady}
                errors={touched.newPassword && errors.newPassword}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock-open-variant"
                label={t("common:Confirm_New_Password")}
                placeholder="**********"
                secureTextEntry={true}
                isPassword={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("confirmNewPassword")}
                value={values.confirmNewPassword}
                onBlur={handleBlur("confirmNewPassword")}
                style={{ marginBottom: 25 }}
                editable={pinReady}
                errors={touched.confirmNewPassword && errors.confirmNewPassword}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit} disabled={!pinReady}>
                  {t("common:Submit")}
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={primary}
                  ></ActivityIndicator>
                </RegularButton>
              )}
            </FormWrapper>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default ResetPassword;
