import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./src/localization/DCSLocalize";
import RootStack from "./src/navigators/RootStack";
import { Provider } from "react-redux";
import store from "./src/_actions/store";
import { setAuth } from "./src/util/setAuth";
import { setUser, Logout } from "./src/_actions/actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import Toast from "react-native-toast-message";
export default function App() {
  //get jwt item from asynsStorage

  AsyncStorage.getItem("jwt").then((token) => {
    if (token) {
      const decode = jwt_decode(token);
      store.dispatch(setUser(decode));
      setAuth(token);
      const currentDate = Date.now() / 1000;
      if (decode.exp > currentDate) {
        store.dispatch(Logout());
      }
    }
  });
  return (
    <Provider store={store}>
      <RootStack />
      <StatusBar style="auto" />
      <Toast />
    </Provider>
  );
}
