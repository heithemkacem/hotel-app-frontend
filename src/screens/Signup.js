import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import PressableText from "../components/texts/PressableText";
import { useTranslation } from "react-i18next";
import { SignupAction } from "../_actions/actions/authActions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const SignUp = ({ navigation }) => {
  const { primary, accent } = colors;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("common:Pleaseenteravalidemailaddress"))
      .required(t("common:Pleaseenteryouremailaddress")),
    password: Yup.string()
      .required(t("common:Required"))
      .min(8, t("common:TooShort"))
      .max(24, t("common:TooLong"))
      .matches(/(?=.*[0-9])/, t("common:Passwordmustcontainanumber"))
      .matches(/(?=.*[a-z])/, t("common:Passwordmustcontainalowercaseletter"))
      .matches(/(?=.*[A-Z])/, t("common:Passwordmustcontainauppercaseletter"))
      .matches(
        /(?=.*[!@#$%^&*])/,
        t("common:Passwordmustcontainaspecialcharacter")
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      t("common:Passwordsmustmatch")
    ),
    firstName: Yup.string().required(t("common:NameRequired")),
    lastName: Yup.string().required(t("common:FamilynameRequired")),
    username: Yup.string().required(t("common:UsernameRequired")),
    phone: Yup.number().required(t("common:PhoneRequired")),
  });

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularText
          style={{
            marginBottom: 25,
            color: accent,
            fontFamily: "Roboto-Regular",
          }}
        >
          {t("common:credential")}
        </RegularText>
        <Formik
          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(SignupAction(values, setSubmitting, moveTo, t));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <>
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:Username")}
                placeholder={t("common:EnterUserName")}
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={{ marginBottom: 15 }}
                value={values.username}
                errors={touched.username && errors.username}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:Name")}
                placeholder={t("common:EnterName")}
                autoCapitalize="none"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                style={{ marginBottom: 15 }}
                value={values.firstName}
                errors={touched.firstName && errors.firstName}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:FamilyName")}
                placeholder={t("common:EnterFamillyName")}
                autoCapitalize="none"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                style={{ marginBottom: 15 }}
                value={values.lastName}
                errors={touched.lastName && errors.lastName}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="email"
                label={t("common:email")}
                placeholder={t("common:enterEmail")}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 15 }}
                value={values.email}
                errors={touched.email && errors.email}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="phone"
                label={t("common:PhoneNumber")}
                placeholder={t("common:EnterPhoneNumber")}
                autoCapitalize="none"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                style={{ marginBottom: 15 }}
                value={values.phone}
                errors={touched.phone && errors.phone}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:Password")}
                placeholder="**********"
                isPassword={true}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 15 }}
                errors={touched.password && errors.password}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:ConfirmPassword")}
                isPassword={true}
                placeholder="**********"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                style={{ marginBottom: 15 }}
                errors={touched.confirmPassword && errors.confirmPassword}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  {t("common:SignUp")}
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

              <PressableText
                style={{ paddingTop: 15 }}
                onPress={() => moveTo("Login")}
              >
                {t("common:HaveAccount")}
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default SignUp;
