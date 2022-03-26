import { StyleSheet, Text, View, Button, TextInput, Alert  } from 'react-native';
// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { authentication } from '../Firebase';

function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [passsword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const [isSignedIn, setIsSignedIn] = useState(false);

    const SignUpUser = () =>{
      if(passsword == confirmPassword)
      {
        createUserWithEmailAndPassword(authentication, email, passsword)
        .then((re) =>{
            console.log(re);
            // setIsSignedIn(true)
            sendEmailVerification(authentication.currentUser)
            .then(() => {
              navigation.navigate('LoginScreen')

              console.log("Email Sent!")
            });

        })
        .catch((re) =>{
            console.log(re);
            if(passsword.length < 6)
            {
              Alert.alert
              (
                "Error",
                "Password must be 6 digits or greater!",
                [
                  {
                    text: "Cancel",
                  },
                ],
              );
            }
            else if(email == "")
            {
              Alert.alert
              (
                "Error",
                "Input email!",
                [
                  {
                    text: "Cancel",
                  },
                ],
              );
            }
            else if(re)
            {
              Alert.alert
              (
                "Error",
                "Not a valid email or email in use!",
                [
                  {
                    text: "Cancel",
                  },
                ],
              );
            }
        })
      }
      else if(passsword != confirmPassword)
      {
        Alert.alert
        (
          "Error",
          "Passwords don't match!",
          [
            {
              text: "Cancel",
            },
          ],
        );
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Screen</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
  
        <TextInput
          style={styles.input}
          value={passsword}
          onChangeText={text => setNewPassword(text)}
          placeholder="Password"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
        />
        
        <Button
          style={{marginBottom: 20}}
          title="Sign In"
          onPress={SignUpUser}
        />
  
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
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUpScreen;