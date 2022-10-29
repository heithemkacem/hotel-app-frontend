import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
import PressableText from "../components/texts/PressableText";
import { useTranslation } from "react-i18next";
import { SignupAction } from "../_actions/actions/authActions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter.")
    .matches(/(?=.*[A-Z])/, "Password must contain a uppercase letter.")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  name: Yup.string().required("Name Required"),
  familyName: Yup.string().required("Family name Required"),
  address: Yup.string().required("Address Required"),
});
const { primary, black } = colors;
const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  return (
    <MainContainer>
      <RegularText style={{ marginBottom: 25, color: black }}>
        {t("common:credential")}
      </RegularText>
      <Formik
        initialValues={{
          name: "",
          familyName: "",
          address: "",
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
              label={t("common:Name")}
              placeholder={t("common:EnterName")}
              autoCapitalize="none"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              style={{ marginBottom: 15 }}
              value={values.name}
              errors={touched.name && errors.name}
            />
            <StyledTextInput
              language={selectedLanguageCode}
              icon="account"
              label={t("common:FamilyName")}
              placeholder={t("common:EnterFamillyName")}
              autoCapitalize="none"
              onChangeText={handleChange("familyName")}
              onBlur={handleBlur("familyName")}
              style={{ marginBottom: 15 }}
              value={values.familyName}
              errors={touched.familyName && errors.familyName}
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
              icon="bank"
              label={t("common:Address")}
              placeholder={t("common:Address")}
              autoCapitalize="none"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              style={{ marginBottom: 15 }}
              value={values.address}
              errors={touched.address && errors.address}
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
              {t("common:credential")}
            </PressableText>
          </>
        )}
      </Formik>
    </MainContainer>
  );
};

export default SignUp;