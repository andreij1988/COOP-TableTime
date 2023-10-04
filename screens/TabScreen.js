import { View, Text, Image, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../firebaseConfig";
import { signOut } from 'firebase/auth';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabScreen = ({ route, navigation }) => {

    const logOut = async () => {
        try {
            // 1. check if a user is currently logged in
            if (auth.currentUser === null) {
                alert("Sorry, no user is logged in.")
            }
            else {
                await signOut(auth)
                alert("Logout Complete!")
                navigation.navigate('SignIn')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => (
                    {
                        headerRight: () => (
                            <Button title='Sign Out' onPress={logOut}/>
                        ),
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
        
                            // Define the icon based on the route name
                            if (route.name === 'AddBookingScreen') {
                                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                            } 
        
                            // Returning the icon component
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor:"blue",
                        tabBarInactiveTintColor:"purple",
                    })}>
            <Tab.Screen component={AddBookingScreen}
             name="AddBookingScreen"
             options={{
                headerStyle: {
                  backgroundColor: '#E69F00',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                
              }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabScreen;