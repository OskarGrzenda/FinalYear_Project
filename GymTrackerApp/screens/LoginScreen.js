import { StyleSheet, Text, View, Button, TextInput, Alert   } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { authentication } from '../Firebase';
import { signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged } from "firebase/auth";

function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [passsword, setPassword] = useState('')

  const [isSignedIn, setIsSignedIn] = useState(false);

  const LogInUser = ()=>{
    signInWithEmailAndPassword(authentication, email, passsword)
    .then((re) =>{
      setIsSignedIn(true);
      navigation.navigate('MainMenuScreen')
    })
    .catch((err)=>{
      console.log(err);
      Alert.alert
      (
        "Error",
        "Invalid Log In Information",
        [
          {
            text: "Cancel",
          },
        ],
      );
    })
  }

  const SignOutUser = ()=>{
    signOut(authentication)
    .then((re) =>{
      setIsSignedIn(false);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
 
  // //Check if user exists and is signed in
  // //If they are signed then access app
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     //navigation.navigate('MainMenuScreen')
  //   } else {
  //     // User is signed out
  //     // ...
  //     //navigation.navigate('Home')
  //   }
  // });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter Log In Details</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={passsword}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />

      {/* <Button
        style={{marginBottom: 20}}
        title="Log In"
        onPress={ () => navigation.navigate('MainMenuScreen') } //() => navigation.navigate('MainMenuScreen')
      /> */}

      {isSignedIn === true?
        <Button title="Sign out" onPress={SignOutUser}></Button>
        :
        <Button title="Sign In" onPress={LogInUser}></Button>
      }
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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white'
  },
});

export default LogInScreen;




