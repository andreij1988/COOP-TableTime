import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../controller/firebaseConfig.js'
import { collection, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservRef = collection(db, "restaurants");
        const querySnapshot = await getDocs(reservRef);
        const reservDataArray = querySnapshot.docs.map((doc) => doc.data());
        setReservations(reservDataArray);


      } catch(error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchReservations();
  }, []);

  // Render each reservation item
  const renderItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <View>
        <Text style={styles.hotelName}>{item.name}</Text>
        {/* Add other fields here */}
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  reservationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MyReservations;
