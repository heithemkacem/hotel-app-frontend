//!This the component of the main slider
import React, { useState } from "react";
import { SafeAreaView, View, Text, Button, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useTranslation } from "react-i18next";
import { styles } from "./../../styles/styles";

const Onboarding = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  console.log(selectedLanguageCode);
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const [showRealApp, setshowRealApp] = useState(false);

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
            color: "#000000",
            backgroundColor: "#FFFFFF",
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
    if (selectedLanguageCode == "en") {
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
            backgroundColor: "#BF1FB1",
            image: require("../../assets/slider-image/bienvenue.png"),
            title: t("common:SlideOneTitle"),
            subtitle: t("common:SlideOneSubtitle"),
          },
          {
            key: "s2",
            backgroundColor: "#BF1FB1",
            image: require("../../assets/slider-image/solution.png"),
            title: t("common:SlideTwoTitle"),
            subtitle: t("common:SlideTwoSubtitle"),
          },
          {
            key: "s3",
            backgroundColor: "#BF1FB1",
            image: require("../../assets/slider-image/maps.png"),
            title: t("common:SlideThreeTitle"),
            subtitle: t("common:SlideThreeSubtitle"),
          },
        ]}
        renderItem={renderItem}
        //  onDone={onDone}
        //  onSkip={onSkip}
        onSkip={() => moveTo("Login")}
        onDone={() => moveTo("HomePage")}
        showPrevButton={true}
        showSkipButton={true}
        renderNextButton={() => buttonLabel(t("common:Next"))}
        renderSkipButton={() => buttonLabel(t("common:Skip"))}
        renderDoneButton={() => buttonLabel(t("common:Start"))}
        renderPrevButton={() => buttonLabel(t("common:Previous"))}
        activeDotStyle={{
          backgroundColor: "#FFFFFF",
          width: 30,
        }}
      />
    </>
  );
};

export default Onboarding;
