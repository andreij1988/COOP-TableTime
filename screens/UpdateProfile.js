import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from "react"

import { db, auth } from "../controllers/firebaseConfig"
import { updatePassword } from 'firebase/auth';

import { getDoc, doc, updateDoc } from "firebase/firestore";

const UpdateProfile = ({ navigation, route }) => {

  useEffect(() => {
    console.log("Starting Retrieval")
    retrieveFromDb()
  }, [])


  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userPicture, setUserPicture] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("")
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
      setUserPicture(userInfo.image)
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
        phone: userPhoneNumber,
        image: userPicture
      }
      )
      alert("You must log out for changes to be visible.")
      navigation.goBack()
    }
    catch (err) {
      console.log(err)
    }
  }

  const onUpdatePasswordClicked = async () => {

    if (userFirstName == "" || userLastName == "") {
      alert(`First AND/OR Last Name cannot be empty`)
      return
    }
    if (userPhoneNumber.length < 10) {
      alert(`Phone number must have at least 10 digits`)
      return
    }
    if (userPassword == ""){
      alert(`Password cannot be empty`)
      return
    }
    if (userPassword.length < 6){
      alert(`Password must be more than 6 charachters`)
      return
    }
    if (userPassword != userPasswordConfirm){
      alert(`Passwords dont match`)
      return
    }
    try {
      const docRef = doc(db, "user", auth.currentUser.email)
      await updateDoc( docRef, {
        firstName : userFirstName,
        lastName : userLastName,
        phone: userPhoneNumber,
        image: userPicture
      })
      await updatePassword(auth.currentUser, userPassword).then(() => {
        console.log("updated")
      }).catch((error) => {
        console.log("Badd password")
      });
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
        <ScrollView indicatorStyle={styles.scrollView}>
        <View>
          <View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>First Name:</Text>
            <TextInput placeholder="Enter First Name" onChangeText={setUserFirstName} value={userFirstName} autoCapitalize="none" style={styles.tb} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Last Name:</Text>
            <TextInput placeholder="Enter Last Name" onChangeText={setUserLastName} value={userLastName} autoCapitalize="none" style={styles.tb} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Phone:</Text>
            <TextInput placeholder="Enter Phone Number" onChangeText={setUserPhoneNumber} value={userPhoneNumber} autoCapitalize="none" style={styles.tb} keyboardType="numeric" maxLength={10} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Image Url:</Text>
            <TextInput placeholder="Image Url" onChangeText={setUserPicture} value={userPicture} autoCapitalize="none" style={styles.tb} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Password:</Text>
            <TextInput placeholder="Enter Password" onChangeText={setUserPassword} value={userPassword} autoCapitalize="none" style={styles.tb} secureTextEntry/>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Confirm Password:</Text>
            <TextInput placeholder="Confirm Password" onChangeText={setUserPasswordConfirm} value={userPasswordConfirm} autoCapitalize="none" style={styles.tb} secureTextEntry/>
            </View>
          </View>
          <View>
            <Pressable style={styles.btnUp} onPress={onUpdateClicked}>
              <Text style={styles.btnLabel}>Update Profile</Text>
            </Pressable>
            <Pressable style={styles.btnUpPass} onPress={onUpdatePasswordClicked}>
              <Text style={styles.btnLabel}>Update Password</Text>
            </Pressable>
            <Pressable style={styles.btnDis} onPress={onDiscardClicked}>
              <Text style={styles.btnLabel}>Go Back</Text>
            </Pressable>
          </View>
        </View>
        </ScrollView>
      )}
    </View>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10
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
    backgroundColor: "orange",
  },
  btnUpPass: {
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