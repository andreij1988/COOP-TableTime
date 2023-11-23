import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../controllers/firebaseConfig";
import { getUserFavorites } from "../controllers/favoriteController";
import { collection, onSnapshot } from "firebase/firestore";

const FavoriteScreen = () => {
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    // Call the function to get user favorites and update the state
    const fetchUserFavorites = async () => {
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

          setFavoriteData(favorites);
        });

        // Returning the unsubscribe function in case you need to stop the listener
        return unsubscribe;
      } catch (error) {
        console.error("Error getting user favorites: ", error);
        setFavoriteData([]);
      }
    };

    fetchUserFavorites(); // Invoke the function to fetch user favorites
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={favoriteData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <View style={styles.reservationDetails}>
              {/* <Text style={styles.detailLabel}>Restaurant:</Text> */}
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.food}</Text>
            </View>
          </View>
        )}
      />
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
    fontSize: 16,
    fontWeight: "bold",
    // marginBottom: 20,
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
    fontWeight: "bold",
  },
});

export default FavoriteScreen;
