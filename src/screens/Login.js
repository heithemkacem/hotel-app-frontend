import React from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import PressableText from "../components/texts/PressableText";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { LoginAction } from "../_actions/actions/authActions";
import * as Yup from "yup";

const Login = ({ navigation }) => {
  const { primary, accent } = colors;

  //Redux
  const dispatch = useDispatch();
  //Translating FR-AR
  const { t, i18n } = useTranslation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("common:Pleaseenteravalidemailaddress"))
      .required(t("common:Pleaseenteryouremailaddress")),
    password: Yup.string().required(t("common:Required")),
  });
  const selectedLanguageCode = i18n.language;

  //Move to an other Screen
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  //The error message

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
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(LoginAction(values, setSubmitting, moveTo, t));
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
            <>
              <StyledTextInput
                //style the place holder
                language={selectedLanguageCode}
                icon="email"
                label={t("common:email")}
                placeholder={t("common:enterEmail")}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 25 }}
                value={values.email}
                errors={touched.email && errors.email}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:Password")}
                placeholder={t("common:enterPassword")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 25 }}
                errors={touched.password && errors.password}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  {t("common:Login")}
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
                style={{ marginBottom: 15 }}
                onPress={() => moveTo("Signup")}
              >
                {t("common:NewAccount")}
              </PressableText>
              <PressableText onPress={() => moveTo("ForgotPassword")}>
                {t("common:ForgetPassword")}
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default Login;
