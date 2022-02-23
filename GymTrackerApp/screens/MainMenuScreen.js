import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity  } from 'react-native';
import * as React from 'react';


import { getAuth } from "firebase/auth";



function MainMenuScreen(){

  const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main Menu Screen</Text>

        <TouchableOpacity style={styles.button}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create
({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

export default MainMenuScreen;
