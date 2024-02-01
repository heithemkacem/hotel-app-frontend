import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//!Importing all the screens in our project
import Onboarding from "./../components/slider/Onboarding";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import EmailVerification from "../screens/EmailVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Dashboard from "../screens/Dashboard";
import ClientDashboard from "./../screens/ClientDashboard";
import HotelDashboard from "./../screens/HotelDashboard";
import HomePage from "../screens/HomePage";
import Settings from "../screens/DashboardScreens/Settings";
import EditPassword from "../screens/DashboardScreens/EditPassword";
import CreateHotel from "../screens/DashboardScreens/CreateHotel";
import Hotels from "../screens/DashboardScreens/Hotels";
import Clients from "../screens/DashboardScreens/Clients";
import ModifyHotel from "../screens/DashboardScreens/ModifyHotel";
import Clientotp from "../screens/Clientotp";
import ClientHotel from "../screens/ClientHotel";
import Hotelotp from "../screens/Hotelotp";
import Reservation from "../screens/Reservation";
import RoomService from "../screens/RoomService";
import ChatScreen from "../screens/ChatScreen";
import Notifications from "../screens/Notifications";
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
import { useSelector } from "react-redux"
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

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isConnected, role } = auth;
  console.log('Auth:', auth);
  console.log('roooooo',role);

  const initialRoute = 'Onboarding';

  return (
    <NavigationContainer>
      <Stack.Navigator
       // initialRouteName={initialRoute}
        screenOptions={{
          headerTitle: () => null,
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
          headerBackTitle: "Back",
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
      >
        {isConnected && role === "Admin" ? (
          <>
            {/* Admin Screens */}
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
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
              name="Clients"
              component={Clients}
              options={{
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
              name="Settings"
              component={Settings}
              options={{
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
              name="Notifications"
              component={Notifications}
              
              options={{
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
              name="EditPassword"
              component={EditPassword}
            />
            <Stack.Screen
              name="CreateHotel"
              component={CreateHotel}
             
            />
            <Stack.Screen
              name="Hotels"
              component={Hotels}
            />
            <Stack.Screen
              name="ModifyHotel"
              component={ModifyHotel}
              options={{
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
  
            {/* Add more Admin screens here */}
          </>
        ) : isConnected && role === "Client" ? (
          <>
            {/* Client Screens */}
            <Stack.Screen
              name="ClientDashboard"
              component={ClientDashboard}
              options={{
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
              name="Clientotp"
              component={Clientotp}
              options={{
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
              name="ModifyHotel"
              component={ModifyHotel}
              options={{
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
              name="EditPassword"
              component={EditPassword}
            />
              <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
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
              name="ChatScreen"
              component={ChatScreen}
              options={{
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
              name="Reservation"
              component={Reservation}
              options={{
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
              name="RoomService"
              component={RoomService}
              options={{
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
              name="Hotelotp"
              component={Hotelotp}
              options={{
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
              name="Clientotp"
              component={Clientotp}
              options={{
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
              name="Notifications"
              component={Notifications}
              
              options={{
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

            
            {/* Add more Client screens here */}
          </>
        ) : isConnected && role === "Hotel" ? (
          <>
            {/* Hotel Screens */}
            <Stack.Screen
              name="HotelDashboard"
              component={HotelDashboard}
              options={{
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
              name="EditPassword"
              component={EditPassword}
            />
           < Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
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
              name="ClientHotel"
              component={ClientHotel}
              options={{
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
              name="Settings"
              component={Settings}
              options={{
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
              name="Notifications"
              component={Notifications}
              
              options={{
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

            {/* Add more Hotel screens here */}
          </>
        ) : (
          <>
            {/* Other Screens */}
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => (
                        <Pressable
                          key={language.code}
                          style={styles.buttonContainer}
                          disabled={language.code === selectedLanguageCode}
                          onPress={() => setLanguage(language.code)}
                        >
                          <Text
                            style={[
                              language.code === selectedLanguageCode
                                ? styles.selectedText
                                : styles.text,
                            ]}
                          >
                            {language.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                ),
              }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
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
              name="Signup"
              component={Signup}
              options={{
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
                headerRight: () => (
                  <>
                    <View style={styles.containerRootStack}>
                      {LANGUAGES.map((language) => (
                        <Pressable
                          key={language.code}
                          disabled={language.code === selectedLanguageCode}
                          onPress={() => setLanguage(language.code)}
                        >
                          <Text
                            style={[
                              language.code === selectedLanguageCode
                                ? styles.selectedText
                                : styles.text,
                            ]}
                          >
                            {language.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                ),
              }}
            />
             <Stack.Screen
              name="EmailVerification"
              component={EmailVerification}
              options={{
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
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
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
            {/* Add more screens for other roles or states */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
