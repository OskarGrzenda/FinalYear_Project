import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { authentication } from '../Firebase';
import { signInWithEmailAndPassword, signOut, updatePassword, sendPasswordResetEmail } from "firebase/auth";

function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [passsword, setPassword] = useState('')
  // const user = authentication.currentUser;

  const [forgotPasswordBoolean, setForgotPasswordBoolean] = useState(false);

  // const [newPassword, setNewPassword] = useState('')
  // const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [emailPassword, setNewPasswordEmail] = useState('')
  // const user = emailPassword;


  const LogInUser = ()=>{

    signInWithEmailAndPassword(authentication, email, passsword)
    .then((re) =>{
      // setIsSignedIn(true);
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

  const setBoolean = () => {
    setForgotPasswordBoolean(true);
  }

  const resetPassword = () => {
    sendPasswordResetEmail(authentication, emailPassword)
    .then(() => 
    {
      // Update successful.
      Alert.alert
      (
        "New Password Set",
        [
          {
            text: "Cancel",
          },
        ],
      );
    }).catch((error) => 
    {
      // An error ocurred
      // ...
      console.log("Error");
    });
    // setForgotPasswordBoolean(false);

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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


       {forgotPasswordBoolean == true?
        <View>
          <TextInput
          style={styles.input}
          value={emailPassword}
          onChangeText={text => setNewPasswordEmail(text)}
          placeholder="Enter Account Email"
            />

          {/* <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          placeholder="New Password"
            />

          <TextInput
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={text => setConfirmNewPassword(text)}
          placeholder="Confirm new Password"
            /> */}

          <Button title="Reset Password" onPress={resetPassword}></Button>

        </View>

         :

         <View>
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

            <Pressable onPress={setBoolean}>
              <Text>Forgot Password?</Text>
            </Pressable>

            <Button title="Sign In" onPress={LogInUser}></Button>

          </View>
      }

      {/* {isSignedIn === true? */}
        {/* <Button title="Sign out" onPress={SignOutUser}></Button> */}
        {/* // : */}
       {/* } */}
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




