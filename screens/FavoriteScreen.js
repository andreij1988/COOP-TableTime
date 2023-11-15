// FavoriteScreen.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Screen</Text>
      {/* Display fixed data */}
      <Text style={styles.favoriteItem}>Favorite Item 1</Text>
      <Text style={styles.favoriteItem}>Favorite Item 2</Text>
      {/* Add more items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  favoriteItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default FavoriteScreen;
