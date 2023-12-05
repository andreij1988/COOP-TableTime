import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../controllers/firebaseConfig";

const MyReservations = ({ navigation, route }) => {
    const [reservationsData, setReservationsData] = useState([]);
    const [emptyArray, setEmptyArray] = useState(true)

    useEffect(() => {
        retrieveFromDb();
    }, []);

    const retrieveFromDb = async () => {
        const q = query(collection(db, "bookings"), where('guestEmail', '==', auth.currentUser.email));
        setEmptyArray(true)
        try {
            const querySnapshot = await getDocs(q);
            const reservationsDataArray = [];
            querySnapshot.forEach((doc) => {
                reservationsDataArray.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            if (reservationsDataArray.length > 0) {
                setEmptyArray(false)
            }
            setReservationsData(reservationsDataArray);
        } catch (err) {
            console.log(err)
        }
    }

    const updateReservation = () => {
        retrieveFromDb()
    }

    return (
        <View style={styles.container}>
            <Button title="Update Reservations" onPress={updateReservation} color={"green"} />
            {/* <Text>My Reservations</Text> */}
            {emptyArray ? (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>You have no reservations</Text>
                </View>
            ) : (
                <FlatList
                    data={reservationsData}
                    onPress={() => test}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                            }}
                        >
                            <TouchableOpacity onPress={() => { navigation.navigate("Booking Details", { bookingData: item });}}>
                                <View style={{ padding: 10, width: "100%", borderColor: "blue", borderBottomWidth: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Restaurant: </Text>
                                        <Text style={{ fontSize: 16 }}>{item.restaurantName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name: </Text>
                                        <Text style={{ fontSize: 16 }}>{item.guestName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Count: </Text>
                                        <Text style={{ fontSize: 16 }}>{item.guestCount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date: </Text>
                                        <Text style={{ fontSize: 16 }}>{item.dineDate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time: </Text>
                                        <Text style={{ fontSize: 16 }}>{item.dineTime}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                    }
                />
            )}
        </View >
    );
};

export default MyReservations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 50,
        alignItems: "stretch",
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#efefef",
        color: "#333",
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#efefef",
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        // No additional styles needed for the Picker component
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#efefef",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        textAlignVertical: "top",
    },
    button: {
        borderWidth: 1,
        borderColor: "#141D21",
        borderRadius: 8,
        paddingVertical: 16,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        textAlign: "center",
    },
});
