import React from "react";
import { useDispatch } from "react-redux";
//!Importing all the screens in our project
import Onboarding from "./../components/slider/Onboarding";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import EmailVerification from "../screens/EmailVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Dashboard from "../screens/AdminDashboard/Dashboard";
import ClientDashboard from "../screens/ClientDashboard/ClientDashboard";
import HotelDashboard from "../screens/HotelDashboard/HotelDashboard";
import HomePage from "../screens/HomePage";
import Settings from "../screens/DashboardScreens/Settings";
import EditPassword from "../screens/DashboardScreens/EditPassword";
import CreateHotel from "../screens/AdminDashboard/CreateHotel";
import Hotels from "../screens/AdminDashboard/Hotels";
import Clients from "../screens/AdminDashboard/Clients";
import ModifyHotel from "../screens/DashboardScreens/ModifyHotel";
import Clientotp from "../screens/ClientDashboard/ClientOTP";
import ClientHotel from "../screens/HotelDashboard/ClientHotel";
import Hotelotp from "../screens/ClientDashboard/HotelOTP";
import Reservation from "../screens/ClientDashboard/Reservation";
import RoomService from "../screens/ClientDashboard/RoomService";
import ChatScreen from "../screens/ClientDashboard/ChatScreen";
import Notifications from "../screens/DashboardScreens/Notifications";
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

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isConnected, role } = auth;
  console.log("Auth:", auth);
  console.log("roooooo", role);

  const initialRoute = "Onboarding";

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={initialRoute}
        screenOptions={{
          headerTitle: () => null,
          headerBackTitle: "Back",
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
                headerTitle: "List of clients",
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
                headerTitle: "Settings",
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
                headerTitle: "Notification",
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
              options={{ headerTitle: "Edit Password" }}
            />
            <Stack.Screen
              name="CreateHotel"
              component={CreateHotel}
              options={{ headerTitle: "Create Hotel" }}
            />
            <Stack.Screen
              name="Hotels"
              component={Hotels}
              options={{ headerTitle: "List of Hotels" }}
            />
            <Stack.Screen
              name="ModifyHotel"
              component={ModifyHotel}
              options={{
                headerTitle: "Hotel Informations",
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
            <Stack.Screen
              name="Clientotp"
              component={Clientotp}
              options={{
                headerLeft: () => (
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
              name="ModifyHotel"
              component={ModifyHotel}
              options={{
                headerTitle: "Hotel Informations",
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
              options={{ headerTitle: "Edit Password" }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: "Settings",
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
                headerTitle: "Chat",
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
                headerTitle: "Reservation",
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
                headerTitle: "Room Service",
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
                headerTitle: "Your Hotel",
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
                headerTitle: "Notifications",
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
              options={{ headerTitle: "Edit Password" }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                headerTitle: "Chats",
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
                headerTitle: "List of Clients",
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
                headerTitle: "Settings",
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
                headerTitle: "Notifications",
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
                headerTitle: "Home",
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
                headerTitle: "Signup",
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
                headerTitle: "Login",
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
                headerTitle: "Email Verification",
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
                headerTitle: "Forgot Password",
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
                headerTitle: "Reset Password",
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
