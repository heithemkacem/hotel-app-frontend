//!This the component of the main slider
import React, { useState } from "react";
import { SafeAreaView, View, Text, Button, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useTranslation } from "react-i18next";
import { styles } from "./../../styles/styles";
const LANGUAGES = [
  { code: "fr", label: "Français", country_code: "fr" },
  { code: "ar", label: "العربية", country_code: "ar" },
];
const Onboarding = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  console.log(selectedLanguageCode);
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const [showRealApp, setshowRealApp] = useState(false);
  //  const [isFirstLauch, setIsFirstLaunch]= React.useState(null);
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value =>{
  //     if(value == null){
  //       AsyncStorage.getItem('alreadyLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     }else{
  //       setIsFirstLaunch(false);
  //     }
  //   });

  // }, []);
  //  if( isFirstLauch == null){
  //    return null;
  // }else if(isFirstLauch == true){
  // return

  //  }else{
  //   return
  //  }
  const onDone = () => {
    setshowRealApp(true);
  };
  const onSkip = () => {
    setshowRealApp(true);
  };
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            backgroundColor: "#395e60",
            borderRadius: 16,
            fontWeight: "600",
            fontSize: 14,
            padding: 10,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    if (selectedLanguageCode == "fr") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image style={styles.introImageStyle} source={item.image} />
          <Text style={styles.introTitleStyle}>{item.title}</Text>
          <Text style={styles.introTextStyle}>{item.subtitle}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image style={styles.introImageStyle} source={item.image} />
          <Text style={styles.introTitleStyleAr}>{item.title}</Text>
          <Text style={styles.introTextStyleAr}>{item.subtitle}</Text>
        </View>
      );
    }
  };
  return (
    <>
      <AppIntroSlider
        style={styles.containerOnBoarding}
        data={[
          {
            key: "s1",
            backgroundColor: "#5f9ea0",
            image: require("../../assets/slider-image/bienvenue.png"),
            title: t("common:Bienvenue"),
            subtitle: t("common:paragraph1"),
          },
          {
            key: "s2",
            backgroundColor: "#5f9ea0",
            image: require("../../assets/slider-image/solution.png"),
            title: t("common:paragraph2"),
            subtitle: t("common:paragraph3"),
          },
          {
            key: "s3",
            backgroundColor: "#5f9ea0",
            image: require("../../assets/slider-image/maps.png"),
            title: t("common:paragraph4"),
            subtitle: t("common:paragraph5"),
          },
        ]}
        renderItem={renderItem}
        //  onDone={onDone}
        //  onSkip={onSkip}
        onSkip={() => moveTo("Login")}
        onDone={() => moveTo("HomePage")}
        showPrevButton={true}
        showSkipButton={true}
        renderNextButton={() => buttonLabel(t("common:Suivant"))}
        renderSkipButton={() => buttonLabel(t("common:Sauter"))}
        renderDoneButton={() => buttonLabel(t("common:Commencer"))}
        renderPrevButton={() => buttonLabel(t("common:Précédent"))}
        activeDotStyle={{
          backgroundColor: "#395e60",
          width: 30,
        }}
      />
    </>
  );
};

export default Onboarding;
