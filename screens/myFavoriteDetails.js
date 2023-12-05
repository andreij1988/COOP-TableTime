import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator, Alert, ScrollView, Image } from 'react-native';
import { useState, useEffect } from "react"

import { db, auth } from "../controllers/firebaseConfig"
import {
  removeFromFavorites,
} from "../controllers/favoriteController";

import { getDoc, doc, deleteDoc} from "firebase/firestore";

const MyFavoriteDetails = ({ navigation, route }) => {
    const { favoriteData } = route.params;

  useEffect(() => {
    console.log("Starting Retrieval")
    retrieveFromDb()
  }, [])

  const [resturantName, setResturantName] = useState("")
  const [resturantAddress, setResturantAddress] = useState("")
  const [resturantFood, setResturantFood] = useState("")
  const [resturantPhone, setResturantPhone] = useState("")
  const [resturantRating, setResturantRating] = useState("")
  const [resturantOpenTime, setResturantOpenTime] = useState("")
  const [resturantCloseTime, setResturantCloseTime] = useState("")
  const [resturantDescription, setResturantDescription] = useState("")
  const [resturantEmail, setResturantEmail] = useState("")
  const [resturantPicture, setResturantPicture] = useState("")
  const [dataLoaded, setDataLoaded] = useState(false);

  const retrieveFromDb = async () => {
    try {
        const docRef = doc(db, "resturants", favoriteData.id)
        const docSnap = await getDoc(docRef)
        const retrievedData = docSnap.data()
        setResturantName(favoriteData.restaurantName)
        setResturantAddress(favoriteData.restaurantAddress)
        setResturantDescription(retrievedData.description)
        setResturantPhone(favoriteData.restuarantPhone)
        setResturantFood(favoriteData.restaurantFood)
        setResturantEmail(retrievedData.email)
        setResturantRating(retrievedData.rating)
        setResturantCloseTime(retrievedData.closeTime)
        setResturantOpenTime(retrievedData.openTime)
        setResturantPicture(retrievedData.image)
        setDataLoaded(true)
      } catch (err) {
        console.log(err)
      }
    setDataLoaded(true)
  }
  const onDiscardClicked = () => {
    navigation.goBack()
  }

  const onDeleteFavorite = async () => {
    try {
      await removeFromFavorites(favoriteData?.id);
      alert("Favorite has been deleted. Please press Update Favorites button to see changes.")
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
          <ScrollView indicatorStyle={styles.scrollView}>
          <View>
           <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
           <Image source={{ uri: resturantPicture }} style={styles.imgContainer} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name:</Text>
            <Text style={{ fontSize: 16}}>{resturantName}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>
            <Text style={{ fontSize: 16}}>{resturantDescription}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Address:</Text>
            <Text style={{ fontSize: 16}}>{resturantAddress}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Food Served:</Text>
            <Text style={{ fontSize: 16}}>{resturantFood}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Phone:</Text>
            <Text style={{ fontSize: 16}}>{resturantPhone}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email:</Text>
            <Text style={{ fontSize: 16}}>{resturantEmail}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rating:</Text>
            <Text style={{ fontSize: 16}}>{resturantRating} Stars</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Opening Time:</Text>
            <Text style={{ fontSize: 16}}>{resturantOpenTime}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Closing Time:</Text>
            <Text style={{ fontSize: 16}}>{resturantCloseTime}</Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.btnUp} onPress={onDeleteFavorite}>
              <Text style={styles.btnLabel}>Delete Favorite</Text>
            </Pressable>
            <Pressable style={styles.btnDis} onPress={onDiscardClicked}>
              <Text style={styles.btnLabel}>Go Back</Text>
            </Pressable>
          </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default MyFavoriteDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  imgContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666665",
    width: 120,
    height: 120,
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