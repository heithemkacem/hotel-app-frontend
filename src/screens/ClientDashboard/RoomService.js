import React from "react";
import { Formik } from "formik";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import RegularText from "../../components/texts/RegularText";
import ButtonStyle from "../../components/buttons/ButtonStyle";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View, Switch } from "react-native";
import { colors } from "../../components/colors";
import { useDispatch } from "react-redux";
import { roomServiceAction } from "../../_actions/actions/RoomAction";
import { styles } from "../../styles/styles";
import * as Yup from "yup";

const RoomService = ({ navigation }) => {
  const { primary, accent } = colors;
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dispatch = useDispatch();

  const handleOnSubmit = async (values, setSubmitting) => {
    dispatch(roomServiceAction(values, setSubmitting, moveTo, t));
  };
  const RoomServiceSchema = Yup.object().shape({
    RoomNumber: Yup.string().required(t("common:RoomNumberRequired")),
    RoomServiceComments: Yup.string().required(
      t("common:RoomServiceCommentsRequired")
    ),
  });

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <RegularText
          style={{
            marginBottom: 25,
            color: accent,
            fontFamily: "Roboto-Regular",
          }}
        >
          {t("common:enteryourinformations")}
        </RegularText>
        <Formik
          initialValues={{
            RoomNumber: "",
            RoomServiceComments: "",
          }}
          validationSchema={RoomServiceSchema}
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
                icon="bed"
                label={t("common:RoomNumber")}
                placeholder={t("common:EnterRoomNumber")}
                errors={touched.RoomNumber && errors.RoomNumber}
                style={{ marginBottom: 25 }}
                value={values.RoomNumber}
                onChangeText={handleChange("RoomNumber")}
              />
              <StyledTextInput
                language={selectedLanguageCode}
                icon="comment"
                label={t("common:RoomServiceComments")}
                placeholder={t("common:EnterRoomServiceComments")}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("RoomServiceComments")}
                onBlur={handleBlur("roomServiceComments")}
                value={values.RoomServiceComments}
                style={{ marginBottom: 25 }}
                errors={
                  touched.RoomServiceComments && errors.RoomServiceComments
                }
              />

              {!isSubmitting && (
                <ButtonStyle onPress={handleSubmit}>
                  {t("common:Submit")}
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

export default RoomService;
