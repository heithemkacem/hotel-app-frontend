import React from "react";
//!Importing all the screens in our project
import Onboarding from "./../components/slider/Onboarding";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import EmailVerification from "../screens/EmailVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Dashboard from "../screens/Dashboard";
import HomePage from "../screens/HomePage";
import Settings from "../screens/DashboardScreens/Settings";
import EditPassword from "../screens/DashboardScreens/EditPassword";
//!Other imports
import { colors } from "../components/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
//Redux
import store from "../_actions/store";
import { Logout } from "./../_actions/actions/authActions";
import { useSelector } from "react-redux";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];
const Stack = createStackNavigator();
const { primary, black } = colors;

const RootStack = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const auth = useSelector((state) => state.auth);
  const isConnected = auth.isConnected;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerTintColor: black,
          headerStyle: {
            height: 110,
            borderBottomWidth: 0,
            backgroundColor: primary,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
        initialRouteName={Onboarding}
      >
        {isConnected ? (
          <>
            <Stack.Screen
              name="Dashboard"
              //passing the user and the dahsboard component to the component prop inside a protected route
              component={Dashboard}
              options={{
                headerLeft: () => null,
                headerTitle: t("common:Dashboard"),
                //logout button
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      //logout
                      store.dispatch(Logout());
                    }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={25}
                      color="black"
                    />
                  </Pressable>
                ),
              }}
            />

            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: t("common:Settings"),
              }}
            />
            <Stack.Screen
              name="EditPassword"
              component={EditPassword}
              options={{ headerTitle: t("common:EditPassword") }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                headerLeft: () => null,
                headerTitle: "",
                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => {
                        const selectedLanguage =
                          language.code === selectedLanguageCode;
                        return (
                          <Pressable
                            key={language.code}
                            style={styles.buttonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                          >
                            <Text
                              style={[
                                selectedLanguage
                                  ? styles.selectedText
                                  : styles.text,
                              ]}
                            >
                              {language.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                ),
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: t("common:Login"),
                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => {
                        const selectedLanguage =
                          language.code === selectedLanguageCode;
                        return (
                          <Pressable
                            key={language.code}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                          >
                            <Text
                              style={[
                                selectedLanguage
                                  ? styles.selectedText
                                  : styles.text,
                              ]}
                            >
                              {language.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                ),
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerTitle: t("common:SignUp"),
                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => {
                        const selectedLanguage =
                          language.code === selectedLanguageCode;
                        return (
                          <Pressable
                            key={language.code}
                            style={styles.buttonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                          >
                            <Text
                              style={[
                                selectedLanguage
                                  ? styles.selectedText
                                  : styles.text,
                              ]}
                            >
                              {language.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                ),
              }}
            />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerification}
              options={{
                headerTitle: t("common:EmailVerification"),
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerTitle: t("common:ForgotPassword"),

                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => {
                        const selectedLanguage =
                          language.code === selectedLanguageCode;
                        return (
                          <Pressable
                            key={language.code}
                            style={styles.buttonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                          >
                            <Text
                              style={[
                                selectedLanguage
                                  ? styles.selectedText
                                  : styles.text,
                              ]}
                            >
                              {language.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                ),
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerTitle: t("common:ResetPassword"),
              }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                headerTitle: t("common:HomePage"),

                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => {
                        const selectedLanguage =
                          language.code === selectedLanguageCode;
                        return (
                          <Pressable
                            key={language.code}
                            style={styles.buttonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                          >
                            <Text
                              style={[
                                selectedLanguage
                                  ? styles.selectedText
                                  : styles.text,
                              ]}
                            >
                              {language.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </>
                ),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
