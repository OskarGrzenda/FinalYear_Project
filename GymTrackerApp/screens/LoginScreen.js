import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, Image } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { authentication } from '../Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

function LogInScreen({ navigation }) {

  const [email, setEmail] = useState('')
  const [passsword, setPassword] = useState('')
  const [forgotPasswordBoolean, setForgotPasswordBoolean] = useState(false);
  const logo = '../pictures/GymTrackerLogo.png';
  const [emailPassword, setNewPasswordEmail] = useState('')

  // Function that checks is if user exists
  // Makes sure that user has a verified email otherwise they can't log in
  const LogInUser = ()=>{
    signInWithEmailAndPassword(authentication, email, passsword)
    .then((re) =>{
      console.log(authentication.currentUser.emailVerified);
      if(authentication.currentUser.emailVerified == true)
      {
        navigation.navigate('Tabs');
      }
      else
      {
        Alert.alert
        (
          "Error",
          "Email has not been verified!",
          [
            {
              text: "Cancel",
            },
          ],
        );
      }

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

  // Sets boolean True and open forgot password functionality
  const setBooleanTrue = () => {
    setForgotPasswordBoolean(true);
  }
  // Sets boolean False and close forgot password functionality
  const setBooleanFalse = () => {
    setForgotPasswordBoolean(false);
  }
  // Function that sends a password reset email to the email entered
  const resetPassword = () => {
    sendPasswordResetEmail(authentication, emailPassword)
    .then(() => 
    {
      console.log("Successful!");
    }).catch((error) => 
    {
      console.log("Error");
    });
  }
  // Returns all the GUI components of the Log in screen
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

       {forgotPasswordBoolean == true?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 

          <Image source={require(logo)} style={{ width: 370, height: 100, resizeMode: 'contain' }}/>

          <Text style={styles.textStyle}>Enter account email</Text>

          <TextInput
            style={styles.input}
            value={emailPassword}
            onChangeText={text => setNewPasswordEmail(text)}
            placeholder="Enter Account Email"
            textAlign={'center'}
          />

          <View style={{width: 200}}>
            <Button color='#000000' title="Send Reset Link" onPress={resetPassword}></Button>
            <View style={styles.space} />
            <Button color='#000000' title="Back" onPress={setBooleanFalse}></Button>
          </View>

          <View style={styles.bottom} />

        </View>

         :

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
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              secureTextEntry
              textAlign={'center'}
            />

            <Pressable onPress={setBooleanTrue}>
              <Text>Forgot Password?</Text>
            </Pressable>

            <View style={{width: 200}}>
              <Button color='#000000' title="Log In" onPress={LogInUser}></Button>
            </View>

            <View style={styles.bottom} />

          </View>
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
    width: 240,
    margin: 12,
    borderWidth: 4,
    padding: 10,
    backgroundColor: 'white'
  },
  textStyle: {
    fontWeight: 'bold',
  },
  space: {
    width: 20, 
    height: 20,
  },
  bottom: {
    width: 20, 
    height: 100,
  },
});

export default LogInScreen;




