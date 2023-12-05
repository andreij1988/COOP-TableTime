import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView} from 'react-native';
import { useState } from "react"

import {db, auth } from "../controllers/firebaseConfig"

import {createUserWithEmailAndPassword} from "firebase/auth"

import { getDoc, doc, setDoc } from "firebase/firestore";

const SignUp = ({ navigation, route }) => {

  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userConfirmPassword, setUserConfirmPassword] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const onSignUpClicked = async () =>{
    console.log(userName)
    console.log(userPassword)

    if (userFirstName == "" || userLastName == ""){
      alert(`First AND/OR Last Name cannot be empty`)
      return
    }
    if (userPhoneNumber.length < 10){
      alert(`Phone number must have at least 10 digits`)
      return
    }
    if (userName == ""){
      alert(`Email Adress cannot be empty`)
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
    if (userPassword != userConfirmPassword){
      alert(`Passwords dont match`)
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userName, userPassword)
      const profileDataToAdd = {
        firstName: userFirstName,
        lastName: userLastName,
        phone: userPhoneNumber,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/1577px-Question_mark_alternate.svg.png"
    }
      await setDoc(doc(db, "user", userName), profileDataToAdd)
      const fullName = `${userLastName}, ${userFirstName}` 
      setUserFirstName("")
      setUserLastName("")
      setUserName("")
      setUserPassword("")
      setUserConfirmPassword("")
      setUserPhoneNumber("")
      navigation.navigate('TabScreen', {screen: "Restuarant Locations", params: {name: fullName}});
    }
    catch (err) {
      let dbError = String(err)
      console.log(err)
      if (dbError.includes("email")){
        alert('The email you provided is either invalid or already in use')
      } else {
        alert(err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView indicatorStyle={styles.scrollView}>
      <View>
        <TextInput placeholder="Enter First Name" onChangeText={setUserFirstName} value={userFirstName} autoCapitalize="none" style={styles.tb} />
        <TextInput placeholder="Enter Last Name" onChangeText={setUserLastName} value={userLastName} autoCapitalize="none" style={styles.tb} />
        <TextInput placeholder="Enter Phone Number" onChangeText={setUserPhoneNumber} value={userPhoneNumber} autoCapitalize="none" style={styles.tb} keyboardType="numeric" maxLength={10}/>
        <TextInput placeholder="Enter Email Here" onChangeText={setUserName} value={userName} autoCapitalize="none" style={styles.tb} />
        <TextInput placeholder="Enter Password Here" onChangeText={setUserPassword} value={userPassword} autoCapitalize="none" style={styles.tb} secureTextEntry />
        <TextInput placeholder="Confirm Password" onChangeText={setUserConfirmPassword} value={userConfirmPassword} autoCapitalize="none" style={styles.tb} secureTextEntry />
      </View>
      <Pressable style={styles.btn} onPress={onSignUpClicked}>
        <Text style={styles.btnLabel}>Register</Text>
      </Pressable>
      </ScrollView>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     padding: 20,
     borderRadius:10,
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
  btn: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor : "green",
},
btnLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight:"bold"
}
});