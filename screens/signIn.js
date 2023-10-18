import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";

import { db, auth } from "../controllers/firebaseConfig";

import { getDoc, doc } from "firebase/firestore";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const SignIn = ({ navigation, route }) => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onLoginClicked = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userName,
        userPassword
      );
      if (auth.currentUser === null) {
        alert(`Log in failed`);
      } else {
        const docRef = doc(db, "user", userName);
        const docSnap = await getDoc(docRef);
        const userInfo = docSnap.data();
        console.log(userInfo);
        const fullName = `${userInfo.lastName}, ${userInfo.firstName}`;
        navigation.navigate("TabScreen", {
          screen: "Restuarant Locations",
          params: { name: fullName },
        });
        // alert(`Welcoime`)
      }
    } catch (err) {
      console.log(err);
      alert("Wrong Password/Username‼️");
    }
  };

  const onSignUpClicked = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter Email Here"
          onChangeText={setUserName}
          value={userName}
          autoCapitalize="none"
          style={styles.tb}
        />
        <TextInput
          placeholder="Enter Password Here"
          onChangeText={setUserPassword}
          value={userPassword}
          autoCapitalize="none"
          style={styles.tb}
          secureTextEntry
        />
      </View>
      <View>
        <Pressable style={styles.btn} onPress={onLoginClicked}>
          <Text style={styles.btnLabel}>Log In</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={onSignUpClicked}>
          <Text style={styles.btnLabel}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  tb: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginVertical: 10,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#1344f2",
  },
  btnLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default SignIn;
