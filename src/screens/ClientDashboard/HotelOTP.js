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
import { findHotelByOtp } from "../../_actions/actions/hotelAction";
import { styles } from "../../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Hotelotp = ({ navigation, route }) => {
  const { otp } = route.params;
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
  const [hotelData, setHotelData] = useState({ hotels: [] });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findHotelByOtp(setHotelData, t, otp.otp));
  }, []);

  const renderStars = (stars) => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(
        <AntDesign
          key={i}
          name="star"
          size={20}
          color="#BF1FB1" // You can customize the color
        />
      );
    }
    return starIcons;
  };

  return isLoading ? (
    <ActivityIndicator style={styles.Loading} size="large" color="#5f9ea0" />
  ) : (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {hotelData.hotels && hotelData.hotels.length !== 0 ? (
            hotelData.hotels.map((hotel, index) => (
              <Pressable
                key={index}
                onPress={() => moveTo("HotelScreen", { id: hotel._id })}
              >
                <Card
                  key={index}
                  style={
                    index === hotelData.hotels.length - 1
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

                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.TextHotels}>{hotel.hotelName}</Text>
                  </View>
                  {/* Render star rating based on hotel's star count */}

                  <View
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    {renderStars(hotel.hotelStars)}
                  </View>
                </Card>
              </Pressable>
            ))
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

export default Hotelotp;
