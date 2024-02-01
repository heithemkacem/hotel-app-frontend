import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SearchHotels } from "../../_actions/actions/hotelAction";
import { styles } from "./../../styles/styles";
import RowContainer from "../../components/containers/RownContainer";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Hotels = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SearchHotels(setData, t, setIsloading));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const searchHotels = (query) => {
    const filteredHotels = data.hotels.filter((hotel) =>
      hotel.hotelName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredHotels);
  };

  const renderHotels = () => {
    const hotelsToRender = filteredData && filteredData.length > 0 ? filteredData : data.hotels;
  
    return hotelsToRender ? (
      hotelsToRender.map((hotel, index) => (
        <Pressable
          key={index}
          onPress={() => moveTo("ModifyHotel", { id: hotel._id })}
        >
          <Card
            key={index}
            style={
              index === hotelsToRender.length - 1
                ? styles.lastCardView1
                : styles.cardView1
            }
          >
            <TouchableOpacity>
              <Image
                resizeMode={"contain"}
                source={{ uri: hotel.hotelImage }}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            <Text style={styles.TextHotels}>{hotel.hotelName}</Text>
            <Text style={styles.TextHotels}> hotelotp:{hotel.otp}</Text>
            {/* Additional hotel information */}
            {/* <RowContainer>
              <Text style={styles.DescriptionTextHotels}>
                Stars: {hotel.hotelStars}
              </Text>
              <Text style={styles.DescriptionTextHotels}>
                Rooms :{hotel.hotelRooms}
              </Text>
              <Text style={styles.DescriptionTextHotels}>
                Price :{hotel.hotelPrice} TND/Day
              </Text>
              <Text style={styles.DescriptionTextHotels}>
                City : {hotel.hotelCity}
              </Text>
            </RowContainer> */}
          </Card>
        </Pressable>
      ))
    ) : null;
  };
  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    searchHotels(query);
  };

  return isLoading ? (
    <ActivityIndicator style={styles.Loading} size="large" color="#5f9ea0" />
  ) : (
    <View>
          <Text style={styles.titleHotels}>
        {t(
          "common:You_find_all_the_hotels_in_our_database_you_can_search_for_a_hotel_by_name_or_by_city"
        )}
      </Text>
      
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TextInput
        style={styles.searchInput1}
        placeholder={t("common:Searchhotels")}
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
        <View>
          {data.hotels?.length !== 0 ? (
            renderHotels()
          ) : (
            <Text style={styles.titleHotels}>
              {t("common:No_hotels_found")}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Hotels;
