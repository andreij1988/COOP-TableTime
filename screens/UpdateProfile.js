import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from "react"

import { db, auth } from "../controllers/firebaseConfig"

import { getDoc, doc, updateDoc, } from "firebase/firestore";

const UpdateProfile = ({ navigation, route }) => {

  useEffect(() => {
    console.log("Starting Retrieval")
    retrieveFromDb()
  }, [])


  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [dataLoaded, setDataLoaded] = useState(false);

  const retrieveFromDb = async () => {
    console.log(auth.currentUser.email)
    try {
      const docRef = doc(db, "user", auth.currentUser.email)
      const docSnap = await getDoc(docRef)
      const userInfo = docSnap.data()
      setUserFirstName(userInfo.firstName)
      setUserLastName(userInfo.lastName)
      setUserPhoneNumber(userInfo.phone)
      setDataLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }
  const onDiscardClicked = () => {
    navigation.goBack()
  }

  const onUpdateClicked = async () => {

    if (userFirstName == "" || userLastName == "") {
      alert(`First AND/OR Last Name cannot be empty`)
      return
    }
    if (userPhoneNumber.length < 10) {
      alert(`Phone number must have at least 10 digits`)
      return
    }
    try {
      const docRef = doc(db, "user", auth.currentUser.email)
      await updateDoc( docRef, {
        firstName : userFirstName,
        lastName : userLastName,
        phone: userPhoneNumber
      }
      )
      alert("You must log out for changes to be visible.")
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
            <TextInput placeholder="Enter First Name" onChangeText={setUserFirstName} value={userFirstName} autoCapitalize="none" style={styles.tb} />
            <TextInput placeholder="Enter Last Name" onChangeText={setUserLastName} value={userLastName} autoCapitalize="none" style={styles.tb} />
            <TextInput placeholder="Enter Phone Number" onChangeText={setUserPhoneNumber} value={userPhoneNumber} autoCapitalize="none" style={styles.tb} keyboardType="numeric" maxLength={10} />
          </View>
          <View>
            <Pressable style={styles.btnUp} onPress={onUpdateClicked}>
              <Text style={styles.btnLabel}>Update Profile</Text>
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

export default UpdateProfile;

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
    backgroundColor: "green",
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