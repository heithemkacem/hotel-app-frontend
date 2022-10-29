import axios from "axios";
const localUrl = "http://localhost:8080/";
const devUrl = "https://tbgemobile-test.odoo.whitecapetech.com/";
const currentUrl = devUrl;
import Toast from "react-native-root-toast";

//!Edit Password Action

export const EditPasswordAction =
  (values, setSubmitting, id, moveTo, t) => async (dispatch) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}reset_password`, {
          oldPassword,
          newPassword,
          id,
          confirmNewPassword,
        })
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
            setSubmitting(false);
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

            moveTo("Settings");
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
          setSubmitting(false);
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

export const SearchReclamtionFleet =
  (setItems, id, t, setIsloading) => async (dispatch) => {
    try {
      //Call Backend
      setIsloading(true);
      axios
        .get(`${currentUrl}propriete_rec/${id}`)
        .then((response) => {
          setItems(response.data);
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
        })
        .finally(() => setIsloading(false));
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
export const SearchReclamtionBuilding =
  (setItems, id, t, setIsloading) => async (dispatch) => {
    try {
      //Call Backend
      setIsloading(true);
      axios
        .get(`${currentUrl}route_rec/${id}`)
        .then((response) => {
          setItems(response.data);
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
        })
        .finally(() => setIsloading(false));
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

export const SearchReclamtionLighting =
  (setItems, id, t, setIsloading) => async (dispatch) => {
    try {
      //Call Backend
      setIsloading(true);
      axios
        .get(`${currentUrl}eclairage_rec/${id}`)
        .then((response) => {
          setItems(response.data);
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
        })
        .finally(() => setIsloading(false));
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
export const SearchReclamtionOther =
  (setItems, id, t, setIsloading) => async (dispatch) => {
    try {
      //Call Backend

      setIsloading(true);
      axios
        .get(`${currentUrl}autre_rec/${id}`)
        .then((response) => {
          setItems(response.data);
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
        })
        .finally(() => setIsloading(false));
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
export const SearchNews = (setData, t, setIsloading) => async (dispatch) => {
  try {
    //Call Backend
    setIsloading(true);
    await axios
      .get(`${currentUrl}news`)
      .then((response) => {
        setData(response.data);
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
      })
      .finally(() => setIsloading(false));
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
