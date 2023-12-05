import { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favoriteController";
import {
  doc,
  getDoc
} from "firebase/firestore";
import { db, auth } from "../controllers/firebaseConfig";

const ListingsItem = ({ item }) => {

  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  const clickHandler = () => {
    navigation.navigate("Booking", { restaurantData: item });
  };

  const favoriteHandler = async () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited === true) {
      await addToFavorites({ ...item, user_id: auth.currentUser.email });
    } else {
      await removeFromFavorites(item?.id);
    }
    // Implement logic to handle adding/removing from favorites based on isFavorited state
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={{ uri: item.image }} style={styles.imgContainer} />
        <View style={styles.textContainer}>
          <View style={styles.titleAndHeart}>
            <Text style={styles.title}>
              {item.name || "Name not available"}
            </Text>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={24}
              color={isFavorited ? "green" : "black"}
              onPress={favoriteHandler}
            />
          </View>
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={clickHandler} style={styles.bookBtn}>
          <Text style={styles.btnLabel}>BOOK</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
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
  },
  titleAndHeart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8, // Add some space between title and description
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
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  bookBtn: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default ListingsItem;
