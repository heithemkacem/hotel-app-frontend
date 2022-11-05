import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
const localUrl = "http://localhost:8080/";
const currentUrl = localUrl;

//!Login Admin
export const AdminLoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/admin/auth`, credentials)
        .then((response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            const { token } = response.data;
            AsyncStorage.setItem("jwt", token);
            setSubmitting(false);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
            setAuth(token);
            Toast.show(t("common:Welcome"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
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
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
      });
    }
  };
//Login Hotel
export const HotelLoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/hotel/auth`, credentials)
        .then((response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            const { token } = response.data;
            AsyncStorage.setItem("jwt", token);
            setSubmitting(false);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
            setAuth(token);
            Toast.show(t("common:Welcome"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });
            moveTo("HotelDashboard");
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
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
      });
    }
  };

//Login Client
//Login Hotel
export const ClientLoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/client/auth`, credentials)
        .then((response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            const { token } = response.data;
            AsyncStorage.setItem("jwt", token);
            setSubmitting(false);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
            setAuth(token);
            Toast.show(t("common:Welcome"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });
            moveTo("ClientDashboard");
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
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            moveTo("EmailVerification", {
              id: response.data.id,
              email: response.data.email,
            });
            //make the error ""
            Toast.show(t("common:Inscription_réussie"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            Toast.show(t("common:verificationemailsent"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });

            moveTo("ResetPassword", {
              id: response.data.id,
              email: response.data.email,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            Toast.show(t("common:Password_changed"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });

            moveTo("Login");
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
      setSubmitting(false);
    } catch (error) {
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
      });
    }
  };
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
        .post(`${currentUrl}resendOTP`, { id, email })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setResendStatus(t("common:Sent"));
            Toast.show(t("common:OTP_has_been_resent"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });
          }
        })
        .catch((error) => {
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
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
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
        .post(`${currentUrl}verify`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);
            Toast.show(t("common:Your_account_has_been_verified"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });

            moveTo("Login");
          }
        })
        .catch((error) => {
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      Toast.show(t(error.message), {
        duration: 10000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
        .post(`${currentUrl}verify-modify-password`, { otp, id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show(t(response.data.message), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "red",
            });
          } else if (response.data.status === "Success") {
            setPinReady(true);
            Toast.show(t("common:You_can_set_your_new_password_now"), {
              duration: 10000,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "green",
            });
          }
        })
        .catch((error) => {
          Toast.show(t(error.message), {
            duration: 10000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        });
    } catch (error) {
      Toast.show(t(response.data.message), {
        duration: t(error.message),
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "red",
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
