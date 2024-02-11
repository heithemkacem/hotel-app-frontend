import React, { useState, useLayoutEffect, useEffect } from "react";
import socket from "../../_actions/SocketCommunication/SocketIO";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../components/colors";
const ClientCommunicationList = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { lightGray, accent } = colors;
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch("http://192.168.251.104:5000/chat")
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
      {rooms?.map((room) => (
        <View
          key={room.id}
          style={{
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "center",
            textAlign: "left",
            paddingLeft: 20,
            backgroundColor: "white",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <Pressable
            onPress={() => {
              moveTo("ChatScreen");
            }}
          >
            <Text style={{ color: accent, fontSize: 20 }}>{room.name}</Text>
            <Text style={{ color: lightGray, fontSize: 13 }}>
              Tap to start chatting
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default ClientCommunicationList;
