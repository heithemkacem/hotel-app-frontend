import React from "react";
import { Text } from "react-native";

const ModifyHotel = ({ navigator, route }) => {
  //extract the id from params
  const { id } = route.params;
  return <Text>{id}</Text>;
};
export default ModifyHotel;
