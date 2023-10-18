import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ListingsItem = ({ item }) => {
  const navigation = useNavigation();
  const clickHandler = () => {
    navigation.navigate("Booking", { item });
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={{ uri: item.image }} style={styles.imgContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name || "Name not available"}</Text>
          <Text style={styles.description}>
            {item.description || "Description not available"}
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>{`Address: ${item.address || "NA"}`}</Text>
        <Text style={styles.details}>{`Food: ${item.food || "NA"}`}</Text>
        <Text style={styles.details}>{`Phone: ${item.phone || "NA"}`}</Text>
      </View>
      <Pressable onPress={clickHandler} style={styles.btn}>
        <Text style={styles.btnLabel}>BOOK</Text>
      </Pressable>
    </View>
  );
};
export default ListingsItem;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  imgContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666665",
    width: 80,
    height: 80,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    color: "#666665",
  },
  detailsContainer: {
    flexDirection: "column",
    marginLeft: 10,
    paddingTop: 10,
  },
  details: {
    fontSize: 15,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "gray",
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
