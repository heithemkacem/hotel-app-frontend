import React, { useState, useLayoutEffect, useEffect } from "react";
import socket from "../../_actions/SocketCommunication/SocketIO";
import { Text, View } from "react-native";
import { colors } from "../../components/colors";
import { localUrl } from "./../../util/hostUrl";
import ChatComponent from "../../components/chat/ChatComponent";
import { FlatList } from "react-native";
import { styles } from "../../util/styles";
const ClientCommunicationList = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { lightGray, accent } = colors;
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch(`${localUrl}/chat`)
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  //👇🏻 Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);
  return (
    <View style={{ marginTop: 5 }}>
      {rooms.length > 0 ? (
        <FlatList
          data={rooms}
          renderItem={({ item }) => <ChatComponent item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.chatemptyContainer}>
          <Text style={styles.chatemptyText}>No rooms created!</Text>
          <Text>You will be notified when a new romm is created</Text>
        </View>
      )}
    </View>
  );
};

export default ClientCommunicationList;
