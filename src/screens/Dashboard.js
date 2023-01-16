import React from "react";
import { View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ImgComponent from "../components/imageComponent/ImgComponent";
import { useTranslation } from "react-i18next";
import { styles } from "../styles/styles";

const Dashboard = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const { t } = useTranslation();
  //context
  const [items, setItems] = React.useState([
    {
      name: "common:Settings",
      page: "Settings",
      img: require("../assets/imgDashboard/parametre.png"),
    },
    {
      name: "common:Create Hotel",
      page: "CreateHotel",
      img: require("../assets/imgDashboard/parametre.png"),
    },
    {
      name: "common:Hotels",
      page: "Hotels",
      img: require("../assets/imgDashboard/parametre.png"),
    },
  ]);

  return (
    <>
      <Text>Dashboard Admin</Text>

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
