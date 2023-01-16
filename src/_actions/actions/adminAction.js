import axios from "axios";
const localUrl = "http://localhost:5000";
const devUrl = "https://sore-red-gopher-wear.cyclic.app/";
const currentUrl = devUrl;
import Toast from "react-native-toast-message";

//!Signup User
export const CreateHotelCall =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/admin/create-hotel`, credentials)
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
            moveTo("Dashboard");
            //make the error ""
            Toast.show({
              type: "success",
              text1: "Success",
              text2: t("common:CreatedHotelSuccessfully"),
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
