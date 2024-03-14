import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ImgComponent from "../../components/imageComponent/ImgComponent";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import socket from "../../_actions/SocketCommunication/SocketIO";
import { useSelector } from "react-redux";
import { localUrl } from "../../util/hostUrl";
const Dashboard = ({ navigation, route }) => {
  const { id, otp, email } = route.params;
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad, otp: otp });
  };

  const auth = useSelector((state) => state.auth);
  const { firstName, lastName } = auth.user;
  const groupName = firstName + " " + lastName;
  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch(`${localUrl}/chat`)
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    //check if group name aleady exists in the rooms.name list
    if (rooms.length > 0) {
      rooms.map((room) =>
        room.name.includes(groupName)
          ? null
          : socket.emit("createRoom", groupName)
      );
    } else {
      socket.emit("createRoom", groupName);
      console.log("room created");
    }
  }, []);
  const { t } = useTranslation();
  //context
  const [items, setItems] = React.useState([
    {
      name: "common:YourHotel",
      page: "Hotelotp",
      img: require("./../../assets/imgDashboard/hotel.png"),
    },
    {
      name: "common:Reservation",
      page: "Reservation",
      img: require("./../../assets/imgDashboard/booking.png"),
    },

    {
      name: "common:RoomService",
      page: "RoomService",
      img: require("./../../assets/imgDashboard/room.png"),
    },
    {
      name: "common:Notifications",
      page: "Notifications",
      img: require("./../../assets/imgDashboard/notif.png"),
    },

    {
      name: "common:Communication",
      page: "ChatScreen",
      img: require("./../../assets/imgDashboard/message.png"),
    },
    {
      name: "common:Settings",
      page: "Settings",
      img: require("./../../assets/imgDashboard/setting.png"),
    },
  ]);

  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
            <Text style={styles.itemName} onPress={() => moveTo(item.page)}>
              {t(item.name)}
            </Text>
            <ImgComponent src={item.img} onPress={() => moveTo(item.page)} />
          </View>
        )}
      />
    </>
  );
};

export default Dashboard;
