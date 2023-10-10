import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground } from 'react-native';
import { useState } from "react"

<<<<<<< Updated upstream
import {db, auth } from '../controllers/firebaseConfig'
=======
import {db, auth } from "../controllers/firebaseConfig"

>>>>>>> Stashed changes
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
        phone: userPhoneNumber
    }
      await setDoc(doc(db, "user", userName), profileDataToAdd)
      navigation.navigate('TabScreen');
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
  tb: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    //backgroundColor:'#fff',
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
    backgroundColor : "blue",
},
btnLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight:"bold"
}
});
