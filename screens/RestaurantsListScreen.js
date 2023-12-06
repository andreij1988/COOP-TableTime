import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, Pressable,ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, query, getDocs,where } from "firebase/firestore";
import { db } from "../controllers/firebaseConfig";
import ListingsItem from "./ListingsItem";
import { Picker } from "@react-native-picker/picker";

const RestaurantsListScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState([]);
  const [foodType, setFoodType] = useState("All Types");

  const foodSelected = ['All Types' ,'Mixed' ,'Italian','Indian' ,'Middle East', 'Mexican']

  useEffect(() => {
    getUserLocation();
    getRestuarantLocation();
  }, []);

  const getRestuarantLocation = async () => {
    console.log(foodType)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert(`Permission to access location was denied`);
      return;
    } else {
      console.log("Granted");
    }
    let restList = ""
    if (foodType === "All Types"){
      restList = query(collection(db, "resturants"));
    }
    else {
      restList = query(collection(db, "resturants"), where ("food", "==", foodType));
    }
    try {
      let tempLD = [];
      const querySnapshot = await getDocs(restList);
      querySnapshot.forEach((doc) => {
        tempLD.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      let listingData = [];
      for (let i = 0; i < tempLD.length; i++) {
        const geocodedLocation = await Location.geocodeAsync(tempLD[i].address);
        const result = geocodedLocation[0];
        if (result === undefined) {
          console.log(`${tempLD[i].address} is undefined`);
        } else {
          listingData.push({
            ...tempLD[i],
            latitude: result.latitude,
            longitude: result.longitude,
          });
        }
      }
      setListings(listingData);
      setLoading(false); // Set isLoading to false when data is received
    } catch (error) {
      console.log(error);
    }
  };
  // function to get user location i.e. device location
  const getUserLocation = async () => {
    try {
      // 1. get permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(`Permission to access location was denied`);
        return;
      }
      // 2. if permission granted, then get the location
      let location = await Location.getCurrentPositionAsync();
      console.log(`The current location is:`);
      console.log(location);
      // Display location to UI
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleMarkerPress = (item) => {
    setSelectedListing(item);
  };

  const handleValueChange=(itemValue, itemIndex) =>setFoodType(itemValue)

  return (
    <SafeAreaView style={styles.container}>
            <ScrollView indicatorStyle={styles.scrollView}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      <Picker
        style={styles.picker}
        selectedValue={foodType}
        onValueChange={handleValueChange}>
          {
            foodSelected.map(foodType=> <Picker.Item key={foodType} label={foodType} value={foodType}/>)
          }
      </Picker>
        <Pressable style={styles.btnSearch} onPress={getRestuarantLocation}>
          <Text style={styles.btnLabel}>Search for Food</Text>
        </Pressable>
      </View>
      <View style={styles.mapContainer}>
        {userLocation && (
          <MapView style={styles.map} initialRegion={userLocation}>
            {/* Add Marker for user's location */}
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="You are here"
              pinColor="red"
            />
            {listings.map((listing) => (
              <Marker
                key={listing.id}
                coordinate={{
                  latitude: listing.latitude,
                  longitude: listing.longitude,
                }}
                onPress={() => handleMarkerPress(listing)}
              >
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{listing.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
        {/* <View style={styles.listingContainer}>\
          <FlatList
            data={listings}
            renderItem={({ item }) => <ListingsItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View> */}
        {selectedListing && <ListingsItem item={selectedListing} />}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
  },
  mapContainer: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-around",
  },
  map: {
    width: "100%",
    height: 330,
    borderRadius: 8,
    overflow: "hidden",
  },
  marker: {
    backgroundColor: "#1344f2",
    padding: 4,
    borderRadius: 6,
  },
  markerText: {
    color: "white",
    // fontWeight: "bold",
    fontSize: 12,
  },
  btnLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },
  btnSearch: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "gold",
  },  
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    borderRadius: 5,
    marginBottom: 15,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
export default RestaurantsListScreen;
