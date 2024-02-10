import axios from "axios";
const localUrl = "http://192.168.1.128:5000";
const devUrl = "https://tame-red-boa-sari.cyclic.app/";
const currentUrl = devUrl;
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
      console.log(hotelsData);
    } else {
      setData(responseData);
      console.log(responseData);
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
    console.log("Backend Response Data:", responseData);
    if (responseData && Object.keys(responseData).length > 0) {
      setFilteredData([responseData]); // Wrap the single user object in an array
      console.log("Filtered Users:", [responseData]);
    } else {
      setFilteredData([]);
      console.log("No users found or unexpected response structure");
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
