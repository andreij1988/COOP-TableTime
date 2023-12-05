import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from "react"

import { db, auth } from "../controllers/firebaseConfig"

import { getDoc, doc, deleteDoc} from "firebase/firestore";

const MyReservationsDetails = ({ navigation, route }) => {
    const { bookingData } = route.params;

  useEffect(() => {
    console.log("Starting Retrieval")
    retrieveFromDb()
  }, [])


  const [dineDate, setDineDate] = useState("")
  const [dineTime, setDineTime] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [guestName, setGuestName] = useState("")
  const [resturantName, setResturantName] = useState("")
  const [resturantAddress, setResturantAddress] = useState("")
  const [notes, setNotes ] = useState("None entered")
  const [dataLoaded, setDataLoaded] = useState(false);

  const retrieveFromDb = async () => {
    try {
        const docRef = doc(db, "resturants", bookingData.restaurantID)
        const docSnap = await getDoc(docRef)
        const retrievedData = docSnap.data()
        setDineDate(bookingData.dineDate)
        setDineTime(bookingData.dineTime)
        setGuestCount(bookingData.guestCount)
        setGuestName(bookingData.guestName)
        setResturantName(bookingData.restaurantName)
        setResturantAddress(retrievedData.address)
        if (String(bookingData.addnlNotes) != ""){
            setNotes(bookingData.addnlNotes)
        }
        setDataLoaded(true)
      } catch (err) {
        console.log(err)
      }
    setDataLoaded(true)
  }
  const onDiscardClicked = () => {
    navigation.goBack()
  }

  const onDeleteReservation = async () => {
    try {
        const docRef = doc(db, "bookings", bookingData.id)
        deleteDoc(docRef)
      alert("Reservation has been deleted. Please press Update Reservations button to see changes.")
      navigation.goBack()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      {!dataLoaded ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <View>
          <View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Registered Name:</Text>
            <Text style={{ fontSize: 16}}>{guestName}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Restuarant Name:</Text>
            <Text style={{ fontSize: 16}}>{resturantName}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Restuarant Address:</Text>
            <Text style={{ fontSize: 16}}>{resturantAddress}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date Booked:</Text>
            <Text style={{ fontSize: 16}}>{dineDate}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time Booked:</Text>
            <Text style={{ fontSize: 16}}>{dineTime}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Guest Count:</Text>
            <Text style={{ fontSize: 16}}>{guestCount}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Notes for the reservation:</Text>
            <Text style={{ fontSize: 16}}>{notes}</Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.btnUp} onPress={onDeleteReservation}>
              <Text style={styles.btnLabel}>Delete Reservation</Text>
            </Pressable>
            <Pressable style={styles.btnDis} onPress={onDiscardClicked}>
              <Text style={styles.btnLabel}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

export default MyReservationsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  tb: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginVertical: 10
  },
  btnUp: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "red",
  },
  btnDis: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "gold",
  },
  btnLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  }
});