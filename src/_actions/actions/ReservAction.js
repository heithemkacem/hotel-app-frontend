import axios from "axios";
import Toast from "react-native-toast-message";
const localUrl = "http://192.168.1.128:5000";
const devUrl = "https://tame-red-boa-sari.cyclic.app/";
const currentUrl = devUrl;
export const reserveHotelAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/reservation/reserve`, credentials)
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
              text2: t("common:ReservationcreatedSuccessfully"),
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
