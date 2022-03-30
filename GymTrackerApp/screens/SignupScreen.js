import { StyleSheet, Text, View, Button, TextInput, Alert, Image  } from 'react-native';
// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { authentication } from '../Firebase';

function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [passsword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const logo = '../pictures/GymTrackerLogo.png';

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
              Alert.alert
              (
                "Succes!",
                "Successfully created account!",
                [
                  {
                    text: "Cancel",
                  },
                ],
              );  
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

        <Image source={require(logo)} style={{ width: 370, height: 100, resizeMode: 'contain' }}/>

        <Text style={styles.textStyle}>Enter Email</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          textAlign={'center'}

        />
  
        <Text style={styles.textStyle}>Enter Password</Text>

        <TextInput
          style={styles.input}
          value={passsword}
          onChangeText={text => setNewPassword(text)}
          placeholder="Password"
          secureTextEntry
          textAlign={'center'}
        />

        <Text style={styles.textStyle}>Confirm Password</Text>

        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
          textAlign={'center'}
        />
        
        <View style={{width: 200}}>

        <Button
          color='#000000'
          style={{marginBottom: 20 }}
          title="Sign Up"
          onPress={SignUpUser}
          
        />
        </View>

        <View style={styles.bottom} />

  
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
    width: 240,
    margin: 12,
    borderWidth: 4,
    padding: 10,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  bottom: {
    width: 20, 
    height: 100,
  },
});

export default SignUpScreen;