import React, { useState } from "react";
import { Text, View, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { styles } from "../../styles/styles";
//import { Icon } from "react-native-elements";

const Settings = ({ navigation, route }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const { t, i18n } = useTranslation();
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const choisirLangue = async (selectedLanguageCode) => {
    if (selectedLanguageCode == "fr") {
      await I18nManager.forceRTL(false);
      setLanguage("fr");

      return;
    }
    if (selectedLanguageCode == "ar") {
      await I18nManager.forceRTL(true);
      setLanguage("ar");

      return;
    }
  };
  return (
    <View>
      <Text style={styles.textStyleSettings}>{t("common:Profile")}</Text>
      <Button
        onPress={() => moveTo("EditPassword")}
        style={styles.buttonNavigateSettings}
      >
        <Text style={styles.textButtonNavigateSettings}>
          {t("common:ModiferMdp")}
        </Text>
      </Button>
      <Text style={styles.textStyleSettings}>
        {t("common:languageSelector")}
      </Text>
      <Button onPress={() => choisirLangue("fr")} style={styles.buttonSettings}>
        <Text style={styles.textButtonSettings}>{t("common:Français")}</Text>
      </Button>
      <Button onPress={() => choisirLangue("ar")} style={styles.buttonSettings}>
        <Text style={styles.textButtonSettings}>{t("common:Arabe")}</Text>
      </Button>
    </View>
  );
};

export default Settings;
