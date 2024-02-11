import axios from "axios";
import jwt_decode from "jwt-decode";
import { setRole, setUser } from "../types";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://192.168.251.104:5000";
const currentUrl = localUrl;
//otp find hotel

export const findHotelOtpAction =
  (otp, setSubmitting, moveTo, t) => async () => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/hotel/findHotelOtp`, otp)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
          } else if (response.data.status === "Success") {
            AsyncStorage.setItem("hotel_id", response.data.hotel._id);
            AsyncStorage.setItem("hotel_name", response.data.hotel.hotelName);
            setSubmitting(false);
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:verificationotpsent"),
            });
            moveTo("ClientDashboard", {
              id: response.data.id,
              otp: otp,
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
            AsyncStorage.setItem("jwt", token);
            setAuth(token);
            const decode = jwt_decode(token);
            dispatch({ type: setRole, payload: decode.role });
            dispatch({ type: setUser, payload: decode });
            setSubmitting(false);
            console.log(decode);
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:Welcome"),
            });
            if (decode.role === "ADMIN") {
              moveTo("Dashboard");
            } else if (decode.role === "HOTEL") {
              moveTo("HotelDashboard", { otp: decode.otp });
            } else {
              moveTo("Clientotp");
            }
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
  (credentials, setSubmitting, moveTo, t) => async () => {
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
              text1: t("common:Success"),
              text2: t("common:SignupSuccess"),
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
  (credentials, setSubmitting, moveTo, t) => async () => {
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
              text1: t("common:Success"),
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
  (values, setSubmitting, moveTo, route, t) => async () => {
    try {
      //Call Backend
      const email = route.params.email;
      const { newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}/client/reset-password`, {
          newPassword,
          confirmNewPassword,
          email,
        })
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
              text1: t("common:Success"),
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
export const ResendEmailAction = (route, setResendStatus, t) => async () => {
  try {
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
          setResendStatus(t("common:Failed"));
        } else if (response.data.status === "Success") {
          Toast.show({
            type: "success",
            text1: t("common:Success"),
            text2: t("common:OTP_has_been_resent"),
          });
          setResendStatus(t("common:Sent"));
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: t("common:Error"),
          text2: t(error.message),
        });
        setResendStatus(t("common:Failed"));
      });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: t("common:Error"),
      text2: t(error.message),
    });
    setResendStatus(t("common:Failed"));
  }
};

//!User Verify OTP From Email Verification Screen
export const VerifyOTPAction =
  (code, route, setPinReady, moveTo, t) => async () => {
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
              text1: t("common:Success"),
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
  (code, route, setPinReady, t) => async () => {
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
              text1: t("common:Success"),
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
export const EditPasswordAction =
  (values, setSubmitting, id, moveTo, t) => async () => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}/client/reset_password`, {
          oldPassword,
          newPassword,
          id,
          confirmNewPassword,
        })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: t("common:Error"),
              text2: t(response.data.message),
            });
            setSubmitting(false);
          } else if (response.data.status === "Success") {
            Toast.show({
              type: "success",
              text1: t("common:Success"),
              text2: t("common:password_changed_successfully"),
            });
            setSubmitting(false);
            moveTo("Settings");
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: t("common:Error"),
            text2: t(error.message),
          });
          setSubmitting(false);
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:Error"),
        text2: t(error.message),
      });
      setSubmitting(false);
    }
  };

export const Logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: setUser,
    payload: {},
  });
};
