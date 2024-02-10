import React, { useState } from "react";
import { Formik } from "formik";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import RegularText from "../../components/texts/RegularText";
import ButtonStyle from "../../components/buttons/ButtonStyle";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "../../components/colors";
import { useDispatch, useSelector } from "react-redux";
import { reserveHotelAction } from "../../_actions/actions/ReservAction";
import { styles } from "../../styles/styles";
const { primary, black } = colors;

const Reservation = ({ navigation, route }) => {
  const { otp } = route.params;
  console.log("otttttttttppp2", otp);
  console.log("otttttttt2", otp.otp);
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dispatch = useDispatch();
  const handleOnSubmit = async (values, setSubmitting) => {
    //Call Backend

    dispatch(reserveHotelAction(values, setSubmitting, moveTo, t));
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <RegularText style={{ marginBottom: 25, color: black }}>
          {t("common:enteryourinformations")}
        </RegularText>
        <Formik
          initialValues={{
            otp: otp.otp,
            personNumber: "",
            firstName: "",
            lastName: "",
            clientEmail: "",
            checkInDate: "",
            checkOutDate: "",
            numberOfRooms: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleOnSubmit(values, setSubmitting);
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
                icon="account"
                label={t("common:firstName")}
                placeholder={t("common:EnterfirstName")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                style={{ marginBottom: 25 }}
                errors={touched.firstName && errors.firstName}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:lastName")}
                placeholder={t("common:EnterlastName")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                style={{ marginBottom: 25 }}
                errors={touched.lastName && errors.lastName}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="email"
                label={t("common:Email")}
                placeholder={t("common:Enteremail")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("clientEmail")}
                onBlur={handleBlur("clientEmail")}
                value={values.clientEmail}
                style={{ marginBottom: 25 }}
                errors={touched.clientEmail && errors.clientEmail}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="account"
                label={t("common:Numberofpersons")}
                placeholder={t("common:Enternumberperson")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("personNumber")}
                onBlur={handleBlur("personNumber")}
                value={values.personNumber}
                style={{ marginBottom: 25 }}
                errors={touched.personNumber && errors.personNumber}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="calendar"
                label={t("common:CheckInDate")}
                placeholder={t("common:SelectCheckInDate")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("checkInDate")}
                onBlur={handleBlur("checkInDate")}
                value={values.checkInDate}
                style={{ marginBottom: 25 }}
                errors={touched.checkInDate && errors.checkInDate}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="calendar"
                label={t("common:CheckOutDate")}
                placeholder={t("common:SelectCheckOutDate")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("checkOutDate")}
                onBlur={handleBlur("checkOutDate")}
                value={values.checkOutDate}
                style={{ marginBottom: 25 }}
                errors={touched.checkOutDate && errors.checkOutDate}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="bed"
                label={t("common:NumberOfRooms")}
                placeholder={t("common:EnterNumberOfRooms")}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("numberOfRooms")}
                onBlur={handleBlur("numberOfRooms")}
                value={values.numberOfRooms}
                style={{ marginBottom: 25 }}
                errors={touched.numberOfRooms && errors.numberOfRooms}
              />

              {!isSubmitting && (
                <ButtonStyle onPress={handleSubmit}>
                  {t("common:Reserve")}
                </ButtonStyle>
              )}
              {isSubmitting && (
                <ButtonStyle disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={primary}
                  ></ActivityIndicator>
                </ButtonStyle>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default Reservation;
