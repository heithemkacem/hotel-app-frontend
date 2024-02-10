import { StyleSheet } from "react-native";
import { colors } from "../components/colors";
const { accent, black, primary, lightGray } = colors;
export const styles = StyleSheet.create({
  //Slider
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    top: 70,
  },

  containerOnBoarding: {
    flex: 1,
    backgroundColor: "#BF1FB1",
    padding: 10,
  },

  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  introTitleStyle: {
    marginTop: 30,
    fontSize: 25,
    color: "white",
    textAlign: "left",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
  },
  introTitleStyleAr: {
    marginTop: 30,
    fontSize: 25,
    color: "white",
    textAlign: "right",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 30,
  },
  introImageStyle: {
    marginTop: 30,
    width: 150,
    height: 150,
    //border raduis circle
    borderRadius: 150 / 2,
    //align the image in the center
    alignSelf: "center",
  },
  introTextStyle: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    color: "white",
    textAlign: "left",
    paddingTop: 30,
    lineHeight: 24,
  },
  introTextStyleAr: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 30,
    fontSize: 18,
    color: "white",
    textAlign: "right",
    paddingTop: 30,
    lineHeight: 24,
  },
  //RootStack
  containerRootStack: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
  //Card
  title: {
    color: "#444",
    fontWeight: "600",
  },
  text: {
    fontSize: 12,
    color: "#000",
    marginLeft: 25,
    fontWeight: "600",
  },
  selectedText: {
    marginLeft: 25,
    fontSize: 12,
    fontWeight: "600",
    color: "#BF1FB1",
  },
  //TextInputs
  textInput: {
    backgroundColor: "#f6f6f8",
    top: 10,
    height: 60,
    borderRadius: 30,
    padding: 20,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#0872c3",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
  },
  textButton: {
    textTransform: "none",
    color: "white",
  },
  //Settings
  textStyleSettings: {
    color: "#BF1FB1",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 27,
    marginRight: 27,
    paddingTop: 30,
  },

  buttonSettings: {
    backgroundColor: "#BF1FB1",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
    top: 10,
    marginTop: 16,
  },
  textButtonSettings: {
    textTransform: "none",
    color: "white",
    fontSize: 16,
  },
  textButtonNavigateSettings: {
    textTransform: "none",
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 27,
    marginRight: 27,
    paddingTop: 15,
  },
  buttonNavigateSettings: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
    top: 10,
    marginTop: 16,
  },
  //Dashboards
  gridView: {
    marginTop: 10,
    flex: 1,
  },

  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    height: 180,
    backgroundColor: "#fff",
    boxShadow:
      "rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px",
  },
  itemName: {
    fontSize: 13,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },

  //HotelsPage
  Loading: {
    flex: 1,
    justifyContent: "center",
  },
  searchInput1: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 20,
    border: 10,
    width: 350,
    marginLeft: 15,
    borderRadius: 10,
    shadowColor: accent,
    shadowOpacity: 0.4,
    shadowOffset: { width: 5, height: 5 },
    elevation: 20,
  },

  titleHotels: {
    color: "#000",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    paddingTop: 20,
    marginEnd: 10,
  },
  lastCardView1: {
    marginTop: 40,
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    padding: 35,
    marginBottom: "25%",
  },
  cardView1: {
    marginTop: 50,
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    padding: 35,
  },
  TextHotels: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  DescriptionTextHotels: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
  // chatscreen
  containerChatScreen: {
    flex: 1,
    backgroundColor: "#6B720",
  },
  chatContainer: {
    flexGrow: 1,
    padding: 16,
    //backgroundColor: lightGray,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: "70%",
  },
  oddMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3D3B40",
  },
  evenMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#525CEB",
  },
  messageText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    paddingRight: 30,
  },
  userIcon: {
    marginRight: 10,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    //borderTopWidth: 1,
    borderTopColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: "black",
  },
  sendButton: {
    backgroundColor: accent,
    borderRadius: 8,
    height: 45,
    display: "flex",
    alignItems: "center",

    padding: 15,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    //textAlign: "center",
  },
  // clientscreen
  title: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    color: black,
  },
  titleIcon: {
    marginRight: 10,
    color: accent,
  },
  containerClient: {
    flex: 1,
    backgroundColor: "#6B720",
    padding: 20,
  },
  cardView: {
    marginTop: 50,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#ffffff",
    shadowColor: accent,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 2 },
    borderWidth: 1,
    borderColor: "white",
  },

  lastCardView: {
    marginVertical: 10,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#ffffff",
    shadowColor: accent,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: "white", // You can change the border color as needed
  },

  textHotels: {
    fontSize: 16,

    marginBottom: 8,
    color: "#333",
  },
  descriptionTextHotels1: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 20,
    color: black,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    border: 10,
    borderRadius: 10,
    shadowColor: accent,
    shadowOpacity: 0.4,
    shadowOffset: { width: 5, height: 5 },
    elevation: 20,
  },

  // Notifications
  containerNotifi: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  markAsUnreadButton: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16,
  },
  markAsUnreadIcon: {
    marginRight: 10,
    color: accent,
  },
  markAsUnreadText: {
    fontSize: 16,
    color: black,
  },
  notificationList: {
    flexGrow: 1,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: accent,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginLeft: 150,
  },
  notificationText: {
    fontSize: 16,
    color: "white",
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
});
