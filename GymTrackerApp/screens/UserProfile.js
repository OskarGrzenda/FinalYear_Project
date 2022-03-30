import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Platform, Appearance, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, useAuth, authentication, fbStorage } from "../Firebase";
import { updateEmail, sendEmailVerification, getAuth, deleteUser, signOut } from "firebase/auth";
import { ref, uploadBytes, getStorage, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';


const UserProfile = ({navigation}) => {

    const currentUser = useAuth();
    const storage = getStorage();

    const [image, setImage] = useState(null);
    const [newEmail, setEmail] = useState(null);
    const basicImage = '../pictures/profilePicture.png';
    const [profilePictureBoolean, setProfilePictureBoolean] = useState(true);
    const booleanCheck = true;
    const [workoutsDB, setWorkoutsDB] = useState([]);
    const [workoutsDB2, setWorkoutsDB2] = useState([]);
    const [progressInfoDB, setProgressInfoDB] = useState([]);


    const [showBox, setShowBox] = useState(true);

    //Refernce to ProfilePictures collection
    useEffect (() => {
      const realtime = onSnapshot(collection(db, "ProfilePictures"), (snapshot) => {
        setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

    //Refernce to WorkoutDay collection
    useEffect (() => {
      const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
        setWorkoutsDB2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);
    //Refernce to ProgressInfo collection
    useEffect (() => {
      const realtime = onSnapshot(collection(db, "ProgressInfo"), (snapshot) => {
        setProgressInfoDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

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
          // booleanCheck = false;
          // func();

          const reference = ref(storage, 'profilePictures/' + currentUser?.uid ); //+ 'test.jpg'
          // console.log("After its set "+randomImage);
          //X is the URL
          await getDownloadURL(reference).then((x) => {
            // setImage(x);
            console.log("The Url " + x);
            //Set New Exercise Name & Add it to a new document in the collection 
             setDoc(doc(db, "ProfilePictures", currentUser?.uid ), {
              uid: currentUser.uid,
              image: x,
              boolean: false,
            })

          })
        }
      };

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

        return Alert.alert(
          "Delete",
          "Are you sure you want to delete your account?",
          [
            // The "Yes" button
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
                      // Delete the file
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
                      // Delete the file
                      deleteObject(profilePictureRef);
                    }
                  })}

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
                  console.log(error);
                });

                setShowBox(false);
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );

        // deleteUser(currentUser).then(() => {
        //   // User deleted.
        //   Alert.alert
        //   (
        //     "Succes!",
        //     "Successfully deleted account!",
        //     [
        //       {
        //         text: "Cancel",
        //       },
        //     ],
        //   );        

        //   navigation.navigate('Home');

        // }).catch((error) => {
        //   console.log(error);
        // });
      };

      const SignOutUser = ()=>{
        signOut(authentication)
        .then((re) =>{
          navigation.navigate('Home')
        })
        .catch((err)=>{
          console.log(err);
        })
      }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {/* <Text>User Profile</Text> */}
            <View style={styles.space} />

            {/* {profilePictureBoolean == true?
              <View>
                <Image source={require(basicImage)} style={{ width: 160, height: 160, borderColor: 'black', borderWidth: 4 }}/>
              </View>

              :

              <View>
                {workoutsDB.map((data) => {
                  // setProfilePictureBoolean(data.boolean);
                  if(data.id == currentUser?.uid)
                  {
                    return(
                      <View>
                        <Image source={{ uri: data.image }} style={{ width: 160, height: 160, borderColor: 'black', borderWidth: 4 }} />
                      </View>
                    )
                  }
                })}
              </View>
            } */}

                {workoutsDB.map((data) => {
                  // setProfilePictureBoolean(data.boolean);
                  if(data.id == currentUser?.uid)
                  {
                    return(
                      <View>
                        <Image source={{ uri: data.image }} style={{ width: 220, height: 220, borderColor: 'black', borderWidth: 4 }} />
                      </View>
                    )
                  }
                })}


            <Button color='#000000' title="Change Profile Picture" onPress={pickImage} />

            <View style={styles.space} />

            {/* <Text>Email: {currentUser?.email}</Text>
            <Text>User Id: {currentUser?.uid}</Text> */}

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

            <View style={{width: 200}}>
              <Button color='#000000' title="Update Email" onPress={() => changeEmail() } />
            </View>

            <View style={styles.space} />

            <View style={{width: 200}}>
              <Button title="Sign out" onPress={SignOutUser}></Button>
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
