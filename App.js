import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import signIn from './screens/signIn';
import signUp from './screens/signUp';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: false,
          headerTitleAlign: "center"
        }}
   
        initialRouteName="SignIn">
        <Stack.Screen component={signIn} name="SignIn"
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
          <Stack.Screen component={signUp} name="SignUp"
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
        {/* <Stack.Screen component={TabScreen} name="TabScreen"
          options={
            ({ route }) => (
              {
                headerTitle: () => (
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>{route.params.params.name}</Text>
                ),
                headerLeft: () => (
                  <Image source={{ uri: route.params.params.picture }} style={{
                    width: "40%",
                    height: "100%"
                  }} />
                )
              })}
              >
              </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
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
