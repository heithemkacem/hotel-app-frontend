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
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/Fonts/Poppins-Regular.ttf"),
  });

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
