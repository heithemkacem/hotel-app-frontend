import axios from "axios";
const localUrl = "http://localhost:5000";
const devUrl = "https://sore-red-gopher-wear.cyclic.app/";
const currentUrl = localUrl;
import Toast from "react-native-toast-message";

export const SearchHotels = (setData, t, setIsloading) => async (dispatch) => {
  try {
    //Call Backend
    setIsloading(true);
    await axios
      .get(`${currentUrl}/hotel/hotels`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
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
export const findHotelById = (setData, t, id) => async (dispatch) => {
  try {
    //Call Backend

    await axios
      .post(`${currentUrl}/hotel/findHotel`, { id })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
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
