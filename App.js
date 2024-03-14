import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./src/localization/DCSLocalize";
import RootStack from "./src/navigators/RootStack";
import { Provider } from "react-redux";
import store from "./src/_actions/store";
import { setAuth } from "./src/util/setAuth";
import { Logout } from "./src/_actions/actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import Toast from "react-native-toast-message";
import { setUser, setRole } from "./src/_actions/types";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/Fonts/Poppins-Regular.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        if (screen) {
          navigation.navigate(screen);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  store.dispatch({ type: setUser, payload: { deviceId: expoPushToken } });
  console.log(notification, "notification");
  console.log(expoPushToken, "expoPushToken");
  AsyncStorage.getItem("jwt").then((token) => {
    if (token) {
      const decode = jwt_decode(token);
      setAuth(token);
      store.dispatch({ type: setRole, payload: decode.role });
      store.dispatch({ type: setUser, payload: decode });

      const currentDate = Date.now() / 1000;
      if (decode.exp < currentDate) {
        store.dispatch(Logout());
      }
    }
  });
  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <RootStack />
        <StatusBar style="auto" />
        <Toast />
      </Provider>
    );
  } else {
    null;
  }
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    console.log("Device is a physical device");
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log("existingStatus", existingStatus);
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      console.log("finalStatus", finalStatus);
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "114344c5-934b-484c-aec6-31d0cb9f72f0",
      })
    ).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notifications");
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FE9018",
    });
  }

  return token;
}
