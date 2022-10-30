import React, { useState } from "react";
import { Formik } from "formik";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import RegularButton from "../../components/buttons/RegularButton";
import MainContainer from "../../components/containers/MainContainer";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "./../../components/colors";
import { useDispatch, useSelector } from "react-redux";
import { EditPasswordAction } from "./../../_actions/actions/userActions";
import Toast from "react-native-root-toast";
import { styles } from "../../styles/styles";
const { primary } = colors;

const EditPassword = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  //message
  const auth = useSelector((state) => state.auth);
  const id = auth.user.id;
  const dispatch = useDispatch();
  const handleOnSubmit = async (values, setSubmitting) => {
    //Call Backend
    dispatch(EditPasswordAction(values, setSubmitting, id, moveTo, t));
  };
  return (
    <View>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.newPassword == "" || values.confirmNewPassword == "") {
              Toast.show(t("common:FillFields"), {
                duration: 10000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: "red",
              });

              setSubmitting(false);
            } else if (values.newPassword !== values.confirmNewPassword) {
              Toast.show(t("common:Passwordsdonotmatch"), {
                duration: 10000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: "red",
              });

              setSubmitting(false);
            } else if (
              !values.newPassword.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
              )
            ) {
              Toast.show(t("common:PasswordRule"), {
                duration: 10000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: "red",
              });

              setSubmitting(false);
            } else {
              handleOnSubmit(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <>
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:OldPassword")}
                placeholder={t("common:EnterOldPassword")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
                style={{ marginBottom: 25 }}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:NewPassword")}
                placeholder={t("common:EnterNewPassword")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                style={{ marginBottom: 25 }}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:ConfirmNewPassword")}
                placeholder={t("common:EnterConfirmNewPassword")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                value={values.confirmNewPassword}
                style={{ marginBottom: 25 }}
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
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default EditPassword;
