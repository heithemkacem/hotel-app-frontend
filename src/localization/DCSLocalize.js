import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ar from "./Translations/ar";
import en from "./Translations/en";
const LANGUAGES = {
  ar,
  en,
};
const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("user-language", (err, language) => {
      if (err || !language) {
        if (err) {
          console.log("Error fetching Languages from asyncstorage ", err);
        } else {
          console.log("No language is set, choosing FRENCH as fallback");
          callback(en);
        }
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language) => {
    //choose language from dropdown and save it to asyncstorage
    AsyncStorage.setItem("user-language", language);
  },
};

i18n.use(initReactI18next).init({
  lng: "en",
  compatibilityJSON: "v3",

  fallbackLng: "en",
  resources: {
    en: en,
    ar: ar,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
