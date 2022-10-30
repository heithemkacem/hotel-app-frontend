import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
const localUrl = "http://localhost:8080/";
const currentUrl = localUrl;

//!Logout User
export const Logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: SET_USER,
    payload: {},
  });
};
export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode,
});
