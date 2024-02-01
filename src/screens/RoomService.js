import React from "react";
import { Formik } from "formik";
import StyledTextInput from "./../components/inputs/StyledTextInput";
import RegularText from "../components/texts/RegularText";
import ButtonStyle from "./../components/buttons/ButtonStyle";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View, Switch } from "react-native";
import { colors } from "./../components/colors";
import { useDispatch } from "react-redux";
import { roomServiceAction } from "./../_actions/actions/RoomAction";
import { styles } from "./../styles/styles";

const { primary, black } = colors;

const RoomService = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dispatch = useDispatch();

  const handleOnSubmit = async (values, setSubmitting) => {
    dispatch(roomServiceAction(values, setSubmitting, moveTo, t));
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <RegularText style={{ marginBottom: 25, color: black }}>
          {t("common:enteryourinformations")}
        </RegularText>
        <Formik
          initialValues={{
        
          
            RoomNumber: "",
            RoomServiceComments:"",
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
                icon="bed"
                label={t("common:RoomNumber")}
                placeholder={t("common:EnterRoomNumber")}
                component={
                  <Switch
                    value={values.RoomNumber}
                    onValueChange={(value) =>
                      handleChange("RoomNumber")(value)
                    }
                  />
                }
                style={{ marginBottom: 25 }}
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
