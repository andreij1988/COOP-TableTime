import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../controllers/firebaseConfig";

const MyReservations = () => {
    const [reservationsData, setReservationsData] = useState([]);

    useEffect(() => {
        // const fetchReservations = async () => {
        //     try {
        //         const reservationsRef = collection(db, "bookings");
        //         const querySnapshot = await getDocs(reservationsRef);
        //         const reservationsDataArray = querySnapshot.docs.map((doc) =>
        //             doc.data()
        //         );
        //         setReservationsData(reservationsDataArray);
        //     } catch (error) {
        //         console.error("Error fetching favourites:", error);
        //     }
        // };
        // fetchReservations();
        const reservationsRef = collection(db, "bookings");
        const unsubscribe = onSnapshot(reservationsRef, (snapshot) => {
            const reservationsDataArray = [];
            snapshot.forEach((doc) => {
                reservationsDataArray.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setReservationsData(reservationsDataArray);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* <Text>My Reservations</Text> */}
            <FlatList
                data={reservationsData}
                keyExtractor={(item) => item.guestName}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 10,
                        }}
                    >
                        <View style={{ padding: 10, width:"100%", borderColor: "blue", borderBottomWidth: 1 }}>
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
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time: </Text>
                                <Text style={{ fontSize: 16 }}>{item.dineTime}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
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
