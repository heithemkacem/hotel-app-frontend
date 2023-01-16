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
} from "react-native";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SearchHotels } from "../../_actions/actions/adminAction";
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
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [isLoading, setIsloading] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SearchHotels(setData, t, setIsloading));
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.Loading} size="large" color="#5f9ea0" />
  ) : (
    <View>
      <Text style={styles.titleHotels}>
        {t(
          "common:You find all the hotels in our database, you can search for a hotel by name or by city"
        )}
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {data.hotels?.length === 0 ? (
            <Text style={styles.titleHotels}>
              {t("common:No hotels found")}
            </Text>
          ) : (
            data.hotels?.map((hotel, index) => (
              <Pressable
                key={index}
                onPress={() => moveTo("ModifyHotel", { id: hotel._id })}
              >
                <Card
                  key={index}
                  style={
                    index === data.hotels.length - 1
                      ? styles.lastCardView
                      : styles.cardView
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
                  <RowContainer>
                    <Text style={styles.DescriptionTextHotels}>
                      Stars: {hotel.hotelStars}
                    </Text>
                    <Text style={styles.DescriptionTextHotels}>
                      Rooms :{hotel.hotelRooms}
                    </Text>
                    <Text style={styles.DescriptionTextHotels}>
                      Price :{hotel.hotelPrice} TND/Day
                    </Text>
                  </RowContainer>
                  <Text style={styles.DescriptionTextHotels}>
                    City : {hotel.hotelCity}
                  </Text>
                </Card>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Hotels;
