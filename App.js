import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground } from 'react-native';
<<<<<<< Updated upstream
import { useState } from "react"
=======
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import TabScreen from './screens/TabScreen';
>>>>>>> Stashed changes

export default function App() {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const onLoginClicked = () =>{

  }

  return (
<<<<<<< Updated upstream
    <View style={styles.container}>
      <View>
        <TextInput placeholder="Enter Email Here" onChangeText={setUserName} value={userName} autoCapitalize="none" style={styles.tb} />
        <TextInput placeholder="Enter Password Here" onChangeText={setUserPassword} value={userPassword} autoCapitalize="none" style={styles.tb} secureTextEntry />
      </View>
      <Pressable style={styles.btn} onPress={onLoginClicked}>
        <Text style={styles.btnLabel}>Log In</Text>
      </Pressable>
    </View>
=======
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: false,
          headerTitleAlign: "center"
        }}
   
        initialRouteName="SignIn">
        <Stack.Screen component={SignIn} name="SignIn"
           options={{
            headerStyle: {
              backgroundColor: '#E69F00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          >
          </Stack.Screen>
          <Stack.Screen component={SignUp} name="SignUp"
           options={{
            headerStyle: {
              backgroundColor: '#E69F00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          >
          </Stack.Screen>
        <Stack.Screen component={TabScreen} name="TabScreen"
          options={
            ({ route }) => (
              {
                // headerTitle: () => (
                //   <Text style={{ fontSize: 16, fontWeight: "bold" }}>{route.params.params.name}</Text>
                // ),
                // headerLeft: () => (
                //   <Image source={{ uri: route.params.params.picture }} style={{
                //     width: "40%",
                //     height: "100%"
                //   }} />
                // )
              })}
              >
              </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> Stashed changes
  );
}

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
