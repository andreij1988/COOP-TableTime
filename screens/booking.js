import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../controllers/firebaseConfig";

import { Calendar } from "react-native-calendars";

const Booking = ({ navigation, route }) => {
  const { restaurantData } = route.params;

  // user name retrieval
  useEffect(() => {
    retrieveFromDb();
  }, []);

  const [userName, setUserName] = useState("");
  const [numOfDiners, setNumOfDiners] = useState("");
  const [dineTime, setDineTime] = useState("option1");
  const [notes, setNotes] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const onBookTablePress = async () => {
    console.log("Name:", userName);
    console.log("Number of Diners:", numOfDiners);
    console.log("Selected Option:", dineTime);
    console.log("Notes:", notes);
    try {
      const bookingData = {
        guestName: userName,
        guestCount: numOfDiners,
        dineTime: dineTime,
        dineDate: selectedDate,
        addnlNotes: notes,
        restaurantName: restaurantData.name,
      };
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      console.log("Booking confirmed with document ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding booking to db: ", e);
    }
  };

  const retrieveFromDb = async () => {
    try {
      const docRef = doc(db, "user", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      const userInfo = docSnap.data();
      setUserName(userInfo.firstName);
    } catch (err) {
      console.log(err);
    }
  };

  const convertTimeFormat = (time) => {
    const hours = parseInt(time.substring(0, 2));
    const minutes = parseInt(time.substring(2));

    if (hours === 12 && minutes === 0) {
      return "12:00 PM";
    }
    if (hours === 12 && minutes === 30) {
      return "12:30 PM";
    }

    const formattedHours = hours >= 12 ? hours - 12 : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const period = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const generateTimeOptions = (openTime) => {
    const options = [];
    let currentTime = openTime;

    while (currentTime !== "2330") {
      options.push({
        label: convertTimeFormat(currentTime),
        value: currentTime,
      });

      const currentHours = parseInt(currentTime.substring(0, 2));
      const currentMinutes = parseInt(currentTime.substring(2));

      if (currentMinutes === 30) {
        currentTime = `${currentHours + 1}00`;
      } else {
        currentTime = `${currentHours}30`;
      }
    }

    return options;
  };

  const openTimeFromDb = convertTimeFormat(restaurantData.openTime);
  const options = generateTimeOptions(restaurantData.openTime);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Booking for '{restaurantData.name}' restaurant
        </Text>
        <Text style={styles.label}>Booking under the name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <Text style={styles.label}>
          How many people are expected to dine?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of diners"
          keyboardType="numeric"
          onChangeText={(text) => setNumOfDiners(text)}
        />

        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity onPress={toggleCalendar}>
          <Text style={styles.dateText}>
            {selectedDate || "Select Date"}
          </Text>
        </TouchableOpacity>

        {isCalendarVisible && (
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "blue",
              },
            }}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          />
        )}

        <Text style={styles.label}>Select a time slot:</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "stretch",
  },
  heading: {
    fontSize: 28,
    paddingBottom: 20,
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
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#E9E9EB",
    borderColor: "#E9E9EB",
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    borderRadius: 5,
    marginBottom: 15,
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

export default Booking;
