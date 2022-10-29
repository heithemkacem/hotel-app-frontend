import React from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularButton from "../components/buttons/RegularButton";
import Logo from "../components/imageComponent/Logo";
import { View } from "react-native";
//generate a random string
import { useTranslation } from "react-i18next";

const HomePage = ({ navigation }) => {
  const { t } = useTranslation();

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  return (
    <MainContainer>
      <Logo
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Logo_commune_Sousse.svg/1200px-Logo_commune_Sousse.svg.png"
        style={{ marginTop: "35%" }}
      />
      <View
        style={{
          height: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <RegularButton onPress={() => moveTo("Login")}>
          {t("common:Login")}
        </RegularButton>
        <RegularButton onPress={() => moveTo("Signup")}>
          {t("common:SignUp")}
        </RegularButton>
      </View>
    </MainContainer>
  );
};

export default HomePage;
