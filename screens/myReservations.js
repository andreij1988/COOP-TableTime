import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const MyReservations = () => {
  // Dummy data for reservations
  const reservations = [
    {
      id: "1",
      hotelName: "Byblos Downtown",
      reservationDate: "2023-09-28",
      reservationTime: "15:00",
      numberOfGuests: 2,
      image: require('../assets/hotel1.jpg')
    },
    {
      id: "2",
      hotelName: "Canoe",
      reservationDate: "2023-09-30",
      reservationTime: "18:30",
      numberOfGuests: 4,
      image: require('../assets/hotel2.jpg')
    },
    // Add more reservation objects here
  ];

  // Render each reservation item
  const renderItem = ({ item }) => (
    <View style={styles.reservationItem}>
        <View>
            <Image source={item.image} style={styles.hotelImage} />
        </View>
        <View>
            <Text style={styles.hotelName}>{item.hotelName}</Text>
            <Text>Date: {item.reservationDate}</Text>
            <Text>Time: {item.reservationTime}</Text>
            <Text>Guests: {item.numberOfGuests}</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  reservationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default MyReservations;
