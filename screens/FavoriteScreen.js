import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const FavoriteScreen = () => {
  const favoriteData = [
    {
      id: "1",
      restaurantName: "Favorite Restaurant 1",
      guestName: "John",
      guestCount: 2,
      dineTime: "19:00",
    },
    {
      id: "2",
      restaurantName: "Favorite Restaurant 2",
      guestName: "Alice",
      guestCount: 4,
      dineTime: "20:30",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={favoriteData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <View style={styles.reservationDetails}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text>{item.restaurantName}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
