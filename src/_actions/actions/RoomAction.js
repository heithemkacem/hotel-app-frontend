import axios from "axios";
import Toast from "react-native-toast-message";
import { devUrl, localUrl } from "../../util/hostUrl";
const currentUrl = devUrl;
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
