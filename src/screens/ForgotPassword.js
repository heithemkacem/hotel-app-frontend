import React from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularText from "../components/texts/RegularText";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";
import PressableText from "../components/texts/PressableText";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ForgotPasswordAction } from "../_actions/actions/authActions";
import * as Yup from "yup";
const ForgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
});
const { primary, black } = colors;
const ForgotPassword = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dispatch = useDispatch();
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  return (
    <MainContainer>
      <IconHeader name="key" style={{ marginBottom: 30 }} />
      <RegularText style={{ marginBottom: 25, color: black }}>
        {t("common:ProvideDetails")}
      </RegularText>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgetPassSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(ForgotPasswordAction(values, setSubmitting, moveTo, t));
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
              language={selectedLanguageCode}
              icon="email"
              label={t("common:enterEmail")}
              placeholder={t("common:enterEmail")}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={{ marginBottom: 25 }}
              value={values.email}
              errors={touched.email && errors.email}
            />

            {!isSubmitting && (
              <RegularButton onPress={handleSubmit}>
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
            <PressableText
              style={{ paddingTop: 15 }}
              onPress={() => moveTo("Signup")}
            >
              {t("common:DontHaveAccount")}
            </PressableText>
          </>
        )}
      </Formik>
    </MainContainer>
  );
};

export default ForgotPassword;
