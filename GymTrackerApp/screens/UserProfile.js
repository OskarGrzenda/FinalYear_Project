import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Platform, Appearance, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, useAuth, authentication, fbStorage } from "../Firebase";
import { updateEmail, sendEmailVerification, getAuth, deleteUser } from "firebase/auth";

import { ref, uploadBytes, getStorage, getDownloadURL, onSnapshot } from "firebase/storage";


const UserProfile = ({navigation}) => {

    const currentUser = useAuth();
    const storage = getStorage();

    const [image, setImage] = useState(null);
    const [newEmail, setEmail] = useState(null);
    const basicImage = '../pictures/profilePicture.png';
    const [profilePictureBoolean, setProfilePictureBoolean] = useState(true);

    //Save image to storage
    const pickImage = async () => {
        console.log("Picking Image");
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if(!result.cancelled) {
          // setImage(result.uri);

          const reff = ref(storage, 'profilePictures/' + currentUser.uid);

          //Convert image to array of bytes instead of a string
          const img = await fetch(result.uri);
          const bytes = await img.blob();

          await uploadBytes(reff, bytes);
          setProfilePictureBoolean(false);
          func();
        }
      };

      //Return image from storage
      useEffect (() => {
        const func = async () => {
          const reference = ref(storage, 'profilePictures/' + currentUser.uid);
          await getDownloadURL(reference).then((x) => {
            setImage(x);
          })

        }
        if(image == undefined)
        {
          func();
        }
      }, []);


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

      const deleteAccount = async () => {

        deleteUser(currentUser).then(() => {
          // User deleted.
          Alert.alert
          (
            "Succes!",
            "Successfully deleted account!",
            [
              {
                text: "Cancel",
              },
            ],
          );        

          navigation.navigate('Home');

        }).catch((error) => {
          // An error ocurred
          // ...
          console.log(error);
        });

      };


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>User Profile</Text>

            {/* {profilePictureBoolean == true?
              <View>
                <Image source={require(basicImage)} style={{ width: 160, height: 160 }}/>
              </View>

              :

              <View>
                {image && <Image source={{ uri: image }} style={{ width: 160, height: 160 }} />}
              </View>
            } */}

            <Image source={require(basicImage)} style={{ width: 160, height: 160 }}/>
            {image && <Image source={{ uri: image }} style={{ width: 160, height: 160 }} />}


            <Button title="Change Profile Picture" onPress={pickImage} />

            {/* <Text>Email: {currentUser?.email}</Text>
            <Text>User Id: {currentUser?.uid}</Text> */}

            <Text>Change Email</Text>
            <Text>Current Email</Text>
            <Text>{currentUser?.email}</Text>

            <TextInput
              style={styles.input}
              placeholder='New Email'
              onChangeText={setEmail}
                >
            </TextInput>
            <Button title="Update Email" onPress={() => changeEmail() } />

            <Button title="Delete Account" color='red' onPress={() => deleteAccount()}/>

        </View>
    );
}

const styles = StyleSheet.create
({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserProfile;
