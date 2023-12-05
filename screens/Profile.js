import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground, ScrollView, ActivityIndicator, Image } from 'react-native';
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
    const [userPicture, setUserPicture] = useState("")
    const [dataLoaded, setDataLoaded] = useState(false);

    const [check, setCheck] = useState(true)
    const changeProfile = () => {
    }

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
    const updateProfileClicked = () => {
        navigation.navigate("Update Profile");
    }

    return (
        <View style={styles.container}>
            {!dataLoaded ? (
                <ActivityIndicator animating={true} size="large" />
            ) : (
                <ScrollView indicatorStyle={styles.scrollView}>
                               <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
           <Image source={{ uri: userPicture }} style={styles.imgContainer} />
            </View>
                    <View>
                        <Text style={styles.tb}>First name: {userFirstName}</Text>
                        <Text style={styles.tb}>Last Name: {userLastName}</Text>
                        <Text style={styles.tb}>Phone Number: {userPhoneNumber}</Text>
                    </View>
                    <Pressable style={styles.btn} onPress={updateProfileClicked}>
                        <Text style={styles.btnLabel}>Update Profile</Text>
                    </Pressable>
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
        borderRadius: 10,
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    imgContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#666665",
        width: 120,
        height: 120,
        resizeMode: 'contain'
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
        backgroundColor: "green",
    },
    btnLabel: {
        fontSize: 18,
        textAlign: "center",
        color: "black",
        fontWeight: "bold"
    }
});