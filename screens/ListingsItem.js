import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

import { db, auth } from "../controllers/firebaseConfig";
// import moment from "moment"; // Import moment library
// importing the firestore functions that you need
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ListingsItem = ({ item }) => {
  const navigation = useNavigation();
  const clickHandler = () => {
    navigation.navigate("Booking", { item });
  };
  //   const [name, setName] = useState(auth.currentUser.email.split("@")[0]);
  return (
    <View>
      <View>
        <Text>{`Name: ${item?.name || "NA"}`}</Text>
        <Text>{`Address: ${item?.address || "NA"}`}</Text>
      </View>
      <Pressable onPress={clickHandler}>
        <Text>Click me</Text>
      </Pressable>
    </View>
  );
};

export default ListingsItem;

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#F3F1F9",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    padding: 2,
    flexDirection: "column",
  },
  imgDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  details: {
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  saveButtonContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#624CAB",
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },

  imgContainer: {
    borderRadius: "50%",
    width: 60,
    height: 60,
  },
  img: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },

  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%", // Set each item to take up full width
    padding: 5,
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
  },
});
