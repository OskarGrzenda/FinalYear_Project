import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, useAuth, authentication } from "../Firebase";
import { deleteUser, signOut } from "firebase/auth";
import { ref, uploadBytes, getStorage, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const UserProfile = ({navigation}) => {

    const currentUser = useAuth();
    const storage = getStorage();
    const [workoutsDB, setWorkoutsDB] = useState([]);
    const [workoutsDB2, setWorkoutsDB2] = useState([]);
    const [progressInfoDB, setProgressInfoDB] = useState([]);
    const [exerciseDB, setExerciseDB] = useState([]);

  // UseEffect function gets access to the ProfilePictures collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "ProfilePictures"), (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  // UseEffect function gets access to the WorkoutDay collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
      setWorkoutsDB2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  // UseEffect function gets access to the ProgressInfo collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "ProgressInfo"), (snapshot) => {
      setProgressInfoDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  // UseEffect function gets access to the ExercisesDB collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "ExercisesDB"), (snapshot) => {
      setExerciseDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  //Save image to storage
  const pickImage = async () => {

    // Launch the album on user device and select image
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    
    // If the user picks an image continue
    // Else it just exits and no image is selected
    if(!result.cancelled) {
      const reff = ref(storage, 'profilePictures/' + currentUser.uid);
      //Convert image to array of bytes instead of a string
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      // Uploaded the converted image to storage in firebase
      await uploadBytes(reff, bytes);

      const reference = ref(storage, 'profilePictures/' + currentUser?.uid ); 
      //X is the URL
      // Download the image URL from firebase storage
      await getDownloadURL(reference).then((x) => {
          //Get the image URL and save it to the firestore database to be able to retreive URL and display for user       
          setDoc(doc(db, "ProfilePictures", currentUser?.uid ), {
          uid: currentUser.uid,
          image: x,
          boolean: false,
        })
      })
    }
  };

  // Function that deletes the users account and all the data related to the user from the database
  const deleteAccount = async () => {
    // Alerts user to confirm are they sure they want to delete their account
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete your account?",
      [
        // Yes button confirms and deletes account
        {
          text: "Yes",
          onPress: () => {
            deleteUser(currentUser).then(() => {
              //Delete the information in WorkoutDay collection related to the currentUser
              {workoutsDB2.map((data) => {
                  if(currentUser?.uid == data.uid)
                  {
                    const docRef = doc(db, "WorkoutDay", data.id);
                    deleteDoc(docRef);
                  }
              })}
              //Delete the information in ProgressInfo collection related to the currentUser
              {progressInfoDB.map((data) => {
                if(currentUser?.uid == data.uid)
                {
                  const docRef = doc(db, "ProgressInfo", data.id);
                  deleteDoc(docRef);

                  const desertRef = ref(storage, currentUser?.uid + '/' + data.imageid ); 
                  // Delete the image from storage
                  deleteObject(desertRef);
                }
              })}

              //Delete the information in ProfilePictures collection related to the currentUser
              {workoutsDB.map((data) => {
                if(currentUser?.uid == data.uid)
                {
                  const docRef = doc(db, "ProfilePictures", data.id);
                  deleteDoc(docRef);

                  const profilePictureRef = ref(storage, "profilePictures/" + currentUser?.uid); 
                  // Delete the image from storage
                  deleteObject(profilePictureRef);
                }
              })}

              // Dlete all the exercises relating to the current user from ExercisesDB collection
              {exerciseDB.map((data) => {
                if(data.uid == currentUser?.uid)
                {
                  const docRef = doc(db, "ExercisesDB", data.id);
                  deleteDoc(docRef);
                }
              })}

              // Alert User deleted
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
              console.log(error);
            });

          },
        },
        // No button closes alert and nothing happens
        {
          text: "No",
        },
      ]
    );
  };

  // Function to sign out the current user that is logged in
  const SignOutUser = ()=>{
    signOut(authentication)
    .then((re) =>{
      navigation.navigate('Home')
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // Returns all the GUI for the UserProfile
  return (
      <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.space} />

          {workoutsDB.map((data) => {
            if(data.id == currentUser?.uid)
            {
              return(
                <View>
                  <Image source={{ uri: data.image }} style={{ width: 220, height: 220, borderColor: 'black', borderWidth: 4 }} />
                </View>
              )
            }
          })}

          <View style={styles.space} />

          <Button color='#000000' title="Change Profile Picture" onPress={pickImage} />

          <View style={styles.space} />

          <View style={styles.space} />

          <View style={{width: 200}}>
            <Button title="Update Email" color='black' onPress={() => navigation.navigate('UpdateEmail')}/>
          </View>

          <View style={styles.space} />

          <View style={{width: 200}}>
            <Button color='black' title="Sign out" onPress={SignOutUser}></Button>
          </View>

          <View style={styles.space} />

          <View style={{width: 200}}>
            <Button title="Delete Account" color='red' onPress={() => deleteAccount()}/>
          </View>

      </View>
  );
}

const styles = StyleSheet.create
({
  input: {
      height: 40,
      width: 240,
      margin: 12,
      borderWidth: 4,
      padding: 10,
      backgroundColor: 'white'
    },
  space: {
    width: 20, 
    height: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default UserProfile;
