//!Get the location and trad the app between arabic and french
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ar from "./Translations/ar";
import en from "./Translations/en";
const LANGUAGES = {
  ar,
  en,
};
const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("user-language", (err, language) => {
      if (err || !language) {
        if (err) {
          console.log("Error fetching Languages from asyncstorage ", err);
        } else {
          console.log("No language is set, choosing french as fallback");
        }

        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language) => {
    AsyncStorage.setItem("user-language", "en");
  },
};
i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
