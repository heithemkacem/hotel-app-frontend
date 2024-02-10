import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { findUsersHotel } from "../../_actions/actions/hotelAction";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/styles";
import { colors } from "../../components/colors";
const { accent, black } = colors;
const dimensions = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ClientHotel = ({ navigation }) => {
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

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findUsersHotel(setFilteredData, t, "65ac2e483aac661bcd55af49"));
  }, []); // Use empty dependency array for one-time effect

  // Use nullish coalescing operator to handle undefined or null
  const filteredUsers = (filteredData ?? []).filter((user) => {
    const lowerCaseSearch = searchText.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseSearch) ||
      user.firstName.toLowerCase().includes(lowerCaseSearch) ||
      user.clientEmail.toLowerCase().includes(lowerCaseSearch)
    );
  });

  const renderItem = ({ item, index }) => (
    <Pressable>
      <Card
        key={index}
        style={
          index === filteredUsers.length - 1
            ? styles.lastCardView
            : styles.cardView
        }
      >
        <Card>
          <Text style={styles.descriptionTextHotels1}>
            client id: {item._id}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            Firstname: {item.firstName}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            Lastname: {item.lastName}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            email: {item.clientEmail}
          </Text>
        </Card>
      </Card>
    </Pressable>
  );

  return isLoading ? (
    <ActivityIndicator style={styles.loading} size="large" color="#5f9ea0" />
  ) : (
    <View style={styles.containerClient}>
      <View style={styles.title}>
        <Icon name="list" size={30} style={styles.titleIcon} />
        <Text style={styles.titleText}>{t("common:listofclients")}</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={"black"}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ClientHotel;
