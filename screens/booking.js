import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../controllers/firebaseConfig";
const Booking = ({ route }) => {
  const { restaurantData  } = route.params;
  console.log("selectedItem", restaurantData);
  // add some changes
  const [name, setName] = useState("");
  const [numOfDiners, setNumOfDiners] = useState("");
  const [dineTime, setDineTime] = useState("option1"); // Default to the first option
  const [notes, setNotes] = useState("");
  const options = [
    { label: "7:30 PM", value: "7:30 PM" },
    { label: "8:00 PM", value: "8:00 PM" },
    { label: "8:30 PM", value: "8:30 PM" },
  ];
  const onBookTablePress = async () => {
    // Handle the form submission here
    console.log("Name:", name);
    console.log("Number of Diners:", numOfDiners);
    console.log("Selected Option:", dineTime);
    console.log("Notes:", notes);
    try {
      const bookingData = {
        guestName: name,
        guestCount: numOfDiners,
        dineTime: dineTime,
        addnlNotes: notes,
        restaurantName: restaurantData.name
      };
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      console.log("Booking confirmed with document ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding booking to db: ", e);
    }
    // You can perform any necessary actions like sending data to a server or storing it locally.
  };
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            paddingBottom: 20,
          }}
        >
          Booking for '{restaurantData.name}' restaurant
        </Text>
        <Text style={styles.label}>What is your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>How many people are expected to dine?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of diners"
          keyboardType="numeric"
          onChangeText={(text) => setNumOfDiners(text)}
        />
        <Text style={styles.label}>Select a time slot:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={dineTime}
            style={styles.picker}
            onValueChange={(value) => setDineTime(value)}
          >
            {options.map((option) => (
              <Picker.Item
                label={option.label}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Any other notes?</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter notes"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setNotes(text)}
        />
        <Pressable style={styles.button} onPress={onBookTablePress}>
          <Text style={styles.buttonText}>Book Table</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};
export default Booking;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    // paddingTop: 50,
    alignItems: "stretch",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    // No additional styles needed for the Picker component
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: "top",
  },
  button: {
    borderWidth: 1,
    borderColor: "#141D21",
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
