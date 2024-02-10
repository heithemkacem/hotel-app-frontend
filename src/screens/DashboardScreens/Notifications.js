import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/styles";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const notificationData = [
    { id: 1, message: "New notification1" },
    { id: 2, message: "New notification2" },
    { id: 3, message: "New notification3" },
    { id: 4, message: "New notification4" },
    { id: 5, message: "New notification4" },
    { id: 6, message: "New notification4" },
    { id: 7, message: "New notification4" },
    { id: 8, message: "New notification4" },
    { id: 9, message: "New notification4" },
    { id: 10, message: "New notification4" },
    { id: 11, message: "New notification4" },
    // Add more notifications as needed
  ];

  const handleMarkAllAsUnread = () => {
    // Handle the logic for marking all notifications as unread
  };
  const { t } = useTranslation();
  return (
    <View style={styles.containerNotifi}>
      <TouchableOpacity
        onPress={handleMarkAllAsUnread}
        style={styles.markAsUnreadButton}
      >
        <Icon
          name="list"
          size={20}
          color="accent"
          style={styles.markAsUnreadIcon}
        />
        <Text style={styles.markAsUnreadText}>{t("common:mark")}</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notificationData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Icon name="bell" size={20} color="#333" style={styles.icon} />
            <Text style={styles.notificationText}>{item.message}</Text>
            <View style={styles.dot} />
          </View>
        )}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

export default Notifications;
