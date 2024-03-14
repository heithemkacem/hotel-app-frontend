import React from "react";
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
import HotelScreen from "../screens/DashboardScreens/HotelScreen";
import ClientOTP from "../screens/ClientDashboard/ClientOTP";
import ClientHotel from "../screens/HotelDashboard/ClientHotel";
import Hotelotp from "../screens/ClientDashboard/HotelOTP";
import Reservation from "../screens/ClientDashboard/Reservation";
import RoomService from "../screens/ClientDashboard/RoomService";
import ChatScreen from "../screens/DashboardScreens/ChatScreen";
import Notifications from "../screens/DashboardScreens/Notifications";
import ClientCommunicationList from "../screens/HotelDashboard/ClientCommunicationList";
import RoomServiceScreen from "../screens/HotelDashboard/RoomService";
import ReservationScreen from "../screens/HotelDashboard/Reservation";
//!Other imports
import { colors } from "../components/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
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
  const { isConnected, role } = auth;
  const LogoutUI = () => (
    <Pressable
      onPress={() => {
        //logout
        store.dispatch(Logout());
      }}
    >
      <AntDesign name="logout" size={25} color="black" />
    </Pressable>
  );
  const languageUI = () => (
    <View style={styles.containerRootStack}>
      {LANGUAGES.map((language) => {
        const selectedLanguage = language.code === selectedLanguageCode;
        return (
          <Pressable
            key={language.code}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}
          >
            <Text
              style={[selectedLanguage ? styles.selectedText : styles.text]}
            >
              {language.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={initialRoute}
        screenOptions={{
          headerTitle: () => null,
          headerRight: languageUI,
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
        {isConnected && role === "ADMIN" ? (
          <>
            {/* Admin Screens */}
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerRight: LogoutUI,
                headerTitle: t("common:Dashboard"),
              }}
            />

            <Stack.Screen
              name="Clients"
              component={Clients}
              options={{
                headerTitle: t("common:listofclients"),
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
              name="Notifications"
              component={Notifications}
              options={{
                headerTitle: t("common:Notifications"),
              }}
            />
            <Stack.Screen
              name="EditPassword"
              component={EditPassword}
              options={{ headerTitle: t("common:EditPassword") }}
            />
            <Stack.Screen
              name="CreateHotel"
              component={CreateHotel}
              options={{ headerTitle: t("common:CreateHotel") }}
            />
            <Stack.Screen
              name="Hotels"
              component={Hotels}
              options={{ headerTitle: t("common:List_of_Hotels") }}
            />
            <Stack.Screen
              name="HotelScreen"
              component={HotelScreen}
              options={{
                headerTitle: t("common:hotelinfo"),
              }}
            />
          </>
        ) : isConnected && role === "CLIENT" ? (
          <>
            <Stack.Screen
              name="ClientOTP"
              component={ClientOTP}
              options={{
                headerLeft: LogoutUI,
              }}
            />
            <Stack.Screen
              name="ClientDashboard"
              component={ClientDashboard}
              options={{
                headerRight: LogoutUI,
                headerTitle: t("common:Dashboard"),
              }}
            />
            <Stack.Screen
              name="HotelScreen"
              component={HotelScreen}
              options={{
                headerTitle: t("common:hotelinfo"),
              }}
            />

            <Stack.Screen
              name="EditPassword"
              component={EditPassword}
              options={{ headerTitle: t("common:EditPassword") }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: t("common:Settings"),
              }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                headerTitle: t("common:Chat"),
              }}
            />
            <Stack.Screen
              name="Reservation"
              component={Reservation}
              options={{
                headerTitle: t("common:Reservation"),
              }}
            />
            <Stack.Screen
              name="RoomService"
              component={RoomService}
              options={{
                headerTitle: t("common:RoomService"),
              }}
            />

            <Stack.Screen
              name="Hotelotp"
              component={Hotelotp}
              options={{
                headerTitle: t("common:Yourhotel"),
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{
                headerTitle: t("common:Notifications"),
              }}
            />
          </>
        ) : isConnected && role === "HOTEL" ? (
          <>
            <Stack.Screen
              name="HotelDashboard"
              component={HotelDashboard}
              options={{
                headerRight: LogoutUI,
                headerTitle: t("common:Dashboard"),
              }}
            />
            <Stack.Screen
              name="ReservationScreen"
              component={ReservationScreen}
              options={{ headerTitle: t("common:Reservation") }}
            />
            <Stack.Screen
              name="RoomServiceScreen"
              component={RoomServiceScreen}
              options={{ headerTitle: t("common:RoomService") }}
            />
            <Stack.Screen
              name="EditPassword"
              component={EditPassword}
              options={{ headerTitle: t("common:EditPassword") }}
            />
            <Stack.Screen
              name="ClientCommunicationList"
              component={ClientCommunicationList}
              options={{ headerTitle: t("Group Chats") }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                headerTitle: t("common:Chat"),
              }}
            />
            <Stack.Screen
              name="ClientHotel"
              component={ClientHotel}
              options={{
                headerTitle: t("common:listofclients"),
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
              name="Notifications"
              component={Notifications}
              options={{
                headerTitle: t("common:Notifications"),
              }}
            />
          </>
        ) : (
          <>
            {/* Other Screens */}
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{}}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                headerTitle: t("common:HomePage"),
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerTitle: t("common:SignUp"),
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: t("common:Login"),
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
                headerTitle: t("common:forgotPassword"),
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerTitle: t("common:ResetPassword"),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
