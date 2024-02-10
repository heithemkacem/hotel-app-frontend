import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { findHotelOtpAction } from "../_actions/actions/authActions";

const { primary, black } = colors;
const Clientotp = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dispatch = useDispatch();
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <IconHeader name="check" style={{ marginBottom: 30 }} />

        <Formik
          initialValues={{ otp: "" }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(findHotelOtpAction(values, setSubmitting, moveTo, t));
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
                icon="check"
                label={t("common:enteryourcode")}
                placeholder={t("common:enteryourcode")}
                keyboardType="otp"
                autoCapitalize="none"
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                style={{ marginBottom: 25 }}
                value={values.otp}
                errors={touched.otp && errors.otp}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  {t("common:Verify")}
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
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default Clientotp;
