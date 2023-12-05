import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { auth, db } from "../controllers/firebaseConfig";
import { getUserFavorites } from "../controllers/favoriteController";
import { collection, onSnapshot } from "firebase/firestore";

const FavoriteScreen = ({navigation, route} ) => {
  const [favoriteData, setFavoriteData] = useState([]);
  const [emptyArray, setEmptyArray] = useState(true)

  useEffect(() => {
    fetchUserFavorites(); // Invoke the function to fetch user favorites
  }, []);

  // Call the function to get user favorites and update the state
  const fetchUserFavorites = async () => {
    setEmptyArray(true)
    try {
      const userFavoritesRef = collection(
        db,
        `user/${auth.currentUser.email}/favorites`
      );

      const unsubscribe = onSnapshot(userFavoritesRef, (snapshot) => {
        const favorites = [];
        snapshot.forEach((doc) => {
          favorites.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched favorites successfully!", favorites);
        if (favorites.length > 0) {
          setEmptyArray(false)
        }
        setFavoriteData(favorites);
      });

      // Returning the unsubscribe function in case you need to stop the listener
      return unsubscribe;
    } catch (error) {
      console.error("Error getting user favorites: ", error);
      setFavoriteData([]);
    }
  };

  const updateFavorites = () => {
    fetchUserFavorites()
  }

  return (
    <View style={styles.container}>
      <Button title="Update Favorite" onPress={updateFavorites} color={"green"} />
      {emptyArray ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>You have no favorites</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={favoriteData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { navigation.navigate("Favorite Restuarant", { favoriteData: item });}}>
            <View style={styles.reservationItem}>
              <View style={styles.reservationDetails}>
                <Text style={styles.detailLabel}>Restaurant:</Text>
                <Text style={styles.title}>{item.restaurantName}</Text>
              </View>
              <View style={styles.reservationDetails}>
                <Text style={styles.detailLabel}>Food Type:</Text>
                <Text style={styles.title}>{item.restaurantFood}</Text>
              </View>
              <View style={styles.reservationDetails}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.title}>{item.restaurantAddress}</Text>
              </View>
              <View style={styles.reservationDetails}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.title}>{item.restuarantPhone}</Text>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    paddingTop: 70,
  },
  title: {
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  reservationItem: {
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    paddingBottom: 15,
    marginBottom: 15,
  },
  reservationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoriteScreen;
