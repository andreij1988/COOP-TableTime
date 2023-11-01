import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from "react"

import { db, auth } from "../controllers/firebaseConfig";

import { getDoc, doc } from "firebase/firestore";

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const Profile = ({ navigation, route }) => {

    useEffect(() => {
        console.log("Starting Retrieval")
        retrieveFromDb()
    }, [])

    const [userFirstName, setUserFirstName] = useState("f")
    const [userLastName, setUserLastName] = useState("l")
    const [userPhoneNumber, setUserPhoneNumber] = useState("p")
    const [dataLoaded, setDataLoaded] = useState(false);

    const [check, setCheck] = useState(true)
    const changeProfile = () =>{
    }

    const retrieveFromDb =  async () => {
        console.log(auth.currentUser.email)
        try {
            const docRef = doc(db, "user", auth.currentUser.email)
            const docSnap = await getDoc(docRef)
            const userInfo = docSnap.data()
            console.log(userInfo)
            setUserFirstName(userInfo.firstName)
            setUserLastName(userInfo.lastName)
            setUserPhoneNumber(userInfo.phone)
            setDataLoaded(true)
        } catch (err) {
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
                    <Text style={styles.tb}>First name: {userFirstName}</Text>
                    <Text style={styles.tb}>Last Name: {userLastName}</Text>
                    <Text style={styles.tb}>Phone Number: {userPhoneNumber}</Text>
              </View>
        </ScrollView>
                    )}
      </View>
    );
}

export default Profile;

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