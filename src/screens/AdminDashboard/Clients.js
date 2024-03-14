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
import { listUsersAction } from "../../_actions/actions/adminAction";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/styles";
import { colors } from "../../components/colors";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Clients = ({ navigation }) => {
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
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsersAction(setData, t, setIsloading));
  }, []);

  // Use nullish coalescing operator to handle undefined or null
  const filteredData = (data.users ?? []).filter((user) => {
    const lowerCaseSearch = searchText.toLowerCase();
    return (
      (user.username &&
        user.username.toLowerCase().includes(lowerCaseSearch)) ||
      (user.firstName &&
        user.firstName.toLowerCase().includes(lowerCaseSearch)) ||
      (user.lastName &&
        user.lastName.toLowerCase().includes(lowerCaseSearch)) ||
      (user.email && user.email.toLowerCase().includes(lowerCaseSearch))
    );
  });

  const renderItem = ({ item, index }) => (
    <Pressable>
      <Card
        key={index}
        style={
          index === data.users.length - 1
            ? styles.lastCardView
            : styles.cardView
        }
      >
        <Card>
          <Text style={styles.descriptionTextHotels1}>
            {t("common:Username")}:{item.username}
          </Text>

          <Text style={styles.descriptionTextHotels1}>
            {t("common:firstName")} : {item.firstName}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            {t("common:lastName")} : {item.lastName}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            {t("common:Email")}: {item.email}
          </Text>
          <Text style={styles.descriptionTextHotels1}>
            {t("common:PhoneNumber")}: {item.phone}
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
        <Icon name="users" size={30} style={styles.titleIcon} />
        <Text style={styles.titleText}>{t("common:listofusers")}</Text>
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
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Clients;
