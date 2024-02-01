import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "./../../components/colors";
const { accent, primary, textDark } = colors;
import RegularText from "../../components/texts/RegularText";
import { findHotelById } from "../../_actions/actions/hotelAction";

const ModifyHotel = ({ navigator, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findHotelById(setData, t, id));
  }, []);

  const hotelData = [
    { label: t("common:HotelName"), value: data.hotel?.hotelName },
    { label: t("common:HotelAddress"), value: data.hotel?.hotelAddress },
    { label: t("common:HotelCity"), value: data.hotel?.hotelCity },
    { label: t("common:HotelDescription"), value: data.hotel?.hotelDescription },
    { label: t("common:HotelEmail"), value: data.hotel?.hotelEmail },
    { label: t("common:HotelPhone"), value: data.hotel?.hotelPhone },
    { label: t("common:HotelPrice"), value: data.hotel?.hotelPrice },
    { label: t("common:HotelStars"), value: data.hotel?.hotelStars },
    { label: t("common:HotelRooms"), value: data.hotel?.hotelRooms },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("./../../assets/hot6.jpg")}  
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      
        <FlatList
         showsVerticalScrollIndicator={false}
          data={hotelData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",  
  },
  container: {
    flex: 1,
    padding: 16,
  },
  flatList: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    alignItems: 'center',  
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
   // backgroundColor: "rgba(255, 0, 0, 0.6)",
   backgroundColor: "rgba(191, 31, 177, 0.6)",
    borderRadius: 5,
    shadowColor: accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: primary, 
    
  },
  value: {
    fontSize: 16,
    color: primary,
    
  },
});

export default ModifyHotel;
