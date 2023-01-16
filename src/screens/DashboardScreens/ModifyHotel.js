import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const { findHotelById } = require("../../_actions/actions/hotelAction");
const ModifyHotel = ({ navigator, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findHotelById(setData, t, id));
  }, []);

  //extract the id from params

  return (
    <View>
      <Text>{data.hotel?._id}</Text>
      <Text>{data.hotel?.hotelName}</Text>
      <Text>{data.hotel?.hotelAddress}</Text>
      <Text>{data.hotel?.hotelCity}</Text>
      <Text>{data.hotel?.hotelDescription}</Text>
      <Text>{data.hotel?.hotelEmail}</Text>
      <Text>{data.hotel?.hotelPhone}</Text>
      <Text>{data.hotel?.hotelPrice}</Text>
      <Text>{data.hotel?.hotelImage}</Text>
      <Text>{data.hotel?.hotelStars}</Text>
      <Text>{data.hotel?.hotelRooms}</Text>
    </View>
  );
};
export default ModifyHotel;
