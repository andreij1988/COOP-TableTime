import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TextInput, ImageBackground } from 'react-native';
import { useState } from "react"

export default function App() {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const onLoginClicked = () =>{

  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder="Enter Email Here" onChangeText={setUserName} value={userName} autoCapitalize="none" style={styles.tb} />
        <TextInput placeholder="Enter Password Here" onChangeText={setUserPassword} value={userPassword} autoCapitalize="none" style={styles.tb} secureTextEntry />
      </View>
      <Pressable style={styles.btn} onPress={onLoginClicked}>
        <Text style={styles.btnLabel}>Log In</Text>
      </Pressable>
    </View>
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
