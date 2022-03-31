import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, Image } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword, signOut, updatePassword, sendPasswordResetEmail, updateEmail } from "firebase/auth";
import { db, useAuth, authentication } from "../Firebase";

function UpdateEmail() {

    const currentUser = useAuth();
    const [newEmail, setEmail] = useState(null);


    const changeEmail = async () => {
        updateEmail(authentication.currentUser, newEmail)
        .then(() => {
          sendEmailVerification(authentication.currentUser)
          .then(() => {
            navigation.navigate('LoginScreen');
            Alert.alert
            (
              "Email sent to new email",
              "Verify your email to be able to log in again!",
              [
                {
                  text: "Cancel",
                },
              ],
            );  

          });
        })
        .catch((error) => {
          Alert.alert
          (
            "Error",
            "New email invalid or in use",
            [
              {
                text: "Cancel",
              },
            ],
          );        
          });

      };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{borderColor: 'black', borderWidth: 4, alignItems: 'center' }}>
              <Text style={styles.textStyle}>Current Email</Text>
              <Text style={styles.textStyle}>{currentUser?.email}</Text>
              <Text style={styles.textStyle}>Enter your new email</Text>

              <TextInput
                style={styles.input}
                placeholder='New Email'
                onChangeText={setEmail}
                textAlign={'center'}
              >
              </TextInput>
            </View>

            <View style={styles.space} />


            <View style={{width: 200}}>
              <Button color='#000000' title="Update Email" onPress={() => changeEmail() } />
            </View>
       
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

export default UpdateEmail;




