import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/styles";
import { colors } from "../../components/colors";
const { accent } = colors;
const ChatScreen = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState("");
  const chatData = [
    { id: 1, message: "Hello " },
    { id: 2, message: "How are you?" },
    { id: 3, message: "fine thank u?" },
    { id: 4, message: "How can I help?" },
    { id: 5, message: "i need edj ?" },
    { id: 6, message: "hh jeejj ?" },
    { id: 7, message: "How can ?" },
    { id: 8, message: "How can ?" },
    { id: 9, message: "How can ?" },
    { id: 10, message: "How can ?" },
    { id: 11, message: "How can ?" },
    { id: 12, message: "How can ?" },
    { id: 13, message: "How can ?" },
    // Add more messages as needed
  ];

  const handleSendMessage = () => {
    // Dispatch action to send message to the backend
    // dispatch(sendMessageAction(message));

    // Clear the message input field
    setMessage("");
  };

  return (
    <View style={styles.containerChatScreen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.id % 2 === 0 ? styles.evenMessage : styles.oddMessage,
            ]}
          >
            <Icon name="user" size={20} color="#333" style={styles.userIcon} />
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder={t("common:TypeYourMessage")}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>{t("common:Send")}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
