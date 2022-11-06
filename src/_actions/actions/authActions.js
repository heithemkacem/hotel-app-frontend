import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "https://hotel-app-1r94.onrender.com";
const currentUrl = localUrl;

//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/admin/auth`, credentials)
        .then((response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            const { token } = response.data;
            setAuth(token);
            AsyncStorage.setItem("jwt", token);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
            setSubmitting(false);
            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:Welcome"),
            });
            moveTo("Dashboard");
          } else if (response.data.status === "Verify") {
            setSubmitting(false);
            moveTo("EmailVerification", {
              email: credentials.email,
              id: response.data.id,
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

//!Signup User
export const SignupAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/client/signup`, credentials)
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
            moveTo("EmailVerification", {
              id: response.data.id,
              email: response.data.email,
            });
            //make the error ""
            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:Inscription_réussie"),
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

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/client/forget-password`, credentials)
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
              text2: t("common:verificationemailsent"),
            });

            moveTo("ResetPassword", {
              id: response.data.id,
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

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, moveTo, route, t) => async (dispatch) => {
    try {
      //Call Backend
      const email = route.params.email;
      await axios
        .post(`${currentUrl}/client/reset-password`, { values, email })
        .then((response) => {
          if (response.data.status === "Failed") {
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
              text2: t("common:Password_changed"),
            });

            moveTo("Login");
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
      setSubmitting(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//! Not tested
//!User Resend Password
export const ResendEmailAction =
  (
    route,
    setResendingEmail,
    setResendStatus,
    setActiveResend,
    triggerTimer,
    t
  ) =>
  async (dispatch) => {
    try {
      setResendingEmail(true);
      const email = route.params.email;
      const id = route.params.id;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/resendOTP`, { id, email })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setResendStatus(t("common:Sent"));

            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:OTP_has_been_resent"),
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
      setResendingEmail(false);
      // hold on briefly
      setTimeout(() => {
        setResendStatus(t("common:Resend"));
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed! ");
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };

//!User Verify OTP From Email Verification Screen
export const VerifyOTPAction =
  (code, route, setPinReady, moveTo, t) => async (dispatch) => {
    try {
      const otp = code;
      const { id } = route.params;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/verify`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);

            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:Your_account_has_been_verified"),
            });
            moveTo("Login");
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
    }
  };
//!User Verify OTP From Reset Password Screen
export const VerifyOTPlModifyPasswordAction =
  (code, route, setPinReady, t) => async (dispatch) => {
    try {
      const otp = code;
      const { id } = route.params;
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/verify-modify-password`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);

            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:You_can_set_your_new_password_now"),
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(response.data.message),
      });
    }
  };

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
