import React, { useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import RegularText from "../../components/texts/RegularText";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../../components/colors";
import PressableText from "../../components/texts/PressableText";
import { useTranslation } from "react-i18next";
import { CreateHotelCall } from "../../_actions/actions/adminAction";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
const CreateHotel = ({ navigation }) => {
  const { black, primary } = colors;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const CreateHotelSchema = Yup.object().shape({
    hotelEmail: Yup.string()

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
    hotelName: Yup.string().required(t("common:hotelName")),
    hotelAddress: Yup.string().required(t("common:hotelAddress")),
    hotelCity: Yup.string().required(t("common:hotelCity")),
    hotelStars: Yup.number().required(t("common:hotelStars")),
    hotelRooms: Yup.number().required(t("common:hotelRooms")),
    hotelPrice: Yup.number().required(t("common:hotelPrice")),
    hotelDescription: Yup.string().required(t("common:hotelDescription")),
    hotelImage: Yup.string().required(t("common:hotelImage")),
    hotelPhone: Yup.number().required(t("common:hotelPhone")),
  });

  const selectedLanguageCode = i18n.language;
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularText style={{ marginBottom: 25, color: black }}>
          {t("common:credential")}
        </RegularText>
        <Formik
          initialValues={{
            hotelEmail: "",
            password: "",
            confirmPassword: "",
            hotelName: "",
            hotelAddress: "",
            hotelCity: "",
            hotelStars: "",
            hotelRooms: "",
            hotelPrice: "",
            hotelDescription: "",
            hotelImage: "",
            hotelPhone: "",
          }}
          validationSchema={CreateHotelSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(CreateHotelCall(values, setSubmitting, moveTo, t));
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
                label={t("common:HotelName")}
                placeholder={t("common:EnterHotelName")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelName")}
                onBlur={handleBlur("hotelName")}
                style={{ marginBottom: 15 }}
                value={values.hotelName}
                errors={touched.hotelName && errors.hotelName}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelCity")}
                placeholder={t("common:hotelCity")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelCity")}
                onBlur={handleBlur("hotelCity")}
                style={{ marginBottom: 15 }}
                value={values.hotelCity}
                errors={touched.hotelCity && errors.hotelCity}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelStars")}
                placeholder={t("common:EnterhotelStars")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelStars")}
                onBlur={handleBlur("hotelStars")}
                style={{ marginBottom: 15 }}
                value={values.hotelStars}
                errors={touched.hotelStars && errors.hotelStars}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelAddress")}
                placeholder={t("common:EnterhotelAdress")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelAddress")}
                onBlur={handleBlur("hotelAddress")}
                style={{ marginBottom: 15 }}
                value={values.hotelAddress}
                errors={touched.hotelAddress && errors.hotelAddress}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="email"
                label={t("common:hotelEmail")}
                placeholder={t("common:enterhotelEmail")}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("hotelEmail")}
                onBlur={handleBlur("hotelEmail")}
                style={{ marginBottom: 15 }}
                value={values.hotelEmail}
                errors={touched.hotelEmail && errors.hotelEmail}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="phone"
                label={t("common:hotelPhone")}
                placeholder={t("common:EnterPhoneNumber")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelPhone")}
                onBlur={handleBlur("hotelPhone")}
                style={{ marginBottom: 15 }}
                value={values.hotelPhone}
                errors={touched.hotelPhone && errors.hotelPhone}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelRooms")}
                placeholder={t("common:EnterhotelRooms")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelRooms")}
                onBlur={handleBlur("hotelRooms")}
                style={{ marginBottom: 15 }}
                value={values.hotelRooms}
                errors={touched.hotelRooms && errors.hotelRooms}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelPrice")}
                placeholder={t("common:EnterhotelPrice")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelPrice")}
                onBlur={handleBlur("hotelPrice")}
                style={{ marginBottom: 15 }}
                value={values.hotelPrice}
                errors={touched.hotelPrice && errors.hotelPrice}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelDescription")}
                placeholder={t("common:EnterhotelDescription")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelDescription")}
                onBlur={handleBlur("hotelDescription")}
                style={{ marginBottom: 15 }}
                value={values.hotelDescription}
                errors={touched.hotelDescription && errors.hotelDescription}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:hotelImage")}
                placeholder={t("common:EnterhotelImage")}
                autoCapitalize="none"
                onChangeText={handleChange("hotelImage")}
                onBlur={handleBlur("hotelImage")}
                style={{ marginBottom: 15 }}
                value={values.hotelImage}
                errors={touched.hotelImage && errors.hotelImage}
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
                  {t("common:CreateHotel")}
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

export default CreateHotel;
