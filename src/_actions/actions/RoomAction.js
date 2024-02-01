import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://192.168.1.128:5000";
const devUrl = "https://sore-red-gopher-wear.cyclic.app/";
const currentUrl = localUrl;
export const roomServiceAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/roomservice/service`, credentials)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);

            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:requestsubmittedSuccessfully"),
            });

            moveTo("ClientDashboard", {
              id: response.data.id,
              otp: response.data.otp,
              email: response.data.email,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

