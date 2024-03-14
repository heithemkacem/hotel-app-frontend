import axios from "axios";
import { devUrl, localUrl } from "../../util/hostUrl";
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

export const findHotelByOtp = (setData, t, otp) => async (dispatch) => {
  try {
    // Call Backend
    const response = await axios.post(`${currentUrl}/hotel/findHotelOtp`, {
      otp,
    });

    const responseData = response.data;

    if (responseData.hotel) {
      const hotelsData = { hotels: [responseData.hotel] };
      setData(hotelsData);
    } else {
      setData(responseData);
    }
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

// find users
export const findUsersHotel = (setFilteredData, t, otp) => async (dispatch) => {
  try {
    // Call Backend
    const response = await axios.post(`${currentUrl}/hotel/userHotel`, { otp });
    const responseData = response.data;
    if (responseData && Object.keys(responseData).length > 0) {
      setFilteredData([responseData]); // Wrap the single user object in an array
    } else {
      setFilteredData([]);
    }
  } catch (error) {
    // Handle errors
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
