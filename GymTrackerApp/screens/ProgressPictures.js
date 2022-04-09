import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, ScrollView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, useAuth } from "../Firebase";
import { ref, uploadBytes, getStorage, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc, onSnapshot, Timestamp } from 'firebase/firestore';

const ProgressPictures = () => {

  const currentUser = useAuth();
  const [weight, setWeight] = useState([]);
  const storage = getStorage();
  const [workoutsDB, setWorkoutsDB] = useState([]);

  // UseEffect function gets access to the ProgressInfo collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "ProgressInfo"), (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  // Function that picks and image
  // Opens photo album on the users phone
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
    if (!result.cancelled) {
      const randomCollection = Math.random().toString();
      //Save it to this location with this name
      const reff = ref(storage, currentUser?.uid + '/' + randomCollection);
      //Convert image to array of bytes instead of a string
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      // Uploaded the converted image to storage in firebase
      await uploadBytes(reff, bytes);  

      // Get the image from this location
      const reference = ref(storage, currentUser?.uid + '/'+ randomCollection ); 
      // Download the image URL from firebase storage
      await getDownloadURL(reference).then((x) => {
          //Get the image URL and save it to the firestore database to be able to retreive URL and display for user       
          setDoc(doc(db, "ProgressInfo", randomCollection ), {
          date: Timestamp.now().toDate(),
          weight: weight,
          uid: currentUser.uid,
          image: x,
          imageid: randomCollection,
        })
      })
    }
  };

  // Function to delete the image
  const deletDoc = async (id, imageid) =>
  {
    // Alert confirming you want to delete the image
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete your progress picture?",
      [
        // Yes button will confirm and delete the image
        {
          text: "Yes",
          onPress: () => {
            const docRef = doc(db, "ProgressInfo", id);
            // Delete the image from firestore ProgressInfo collection
            deleteDoc(docRef);

            const desertRef = ref(storage, currentUser?.uid + '/' + imageid ); 
            // Delete the image from firebase storage
            deleteObject(desertRef);
          },
        },
        // No does nothing and hides alert
        {
          text: "No",
        },
      ]
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.space} />

          <View style={{ flexDirection:"row" }}>
              <TextInput
                  style={styles.input}
                  placeholder='Weight'
                  onChangeText={setWeight}
                  textAlign={'center'}
                  >
              </TextInput>
          </View>

          <View style={{width: 200}} >
            <Button title="Create Post" onPress={pickImage} color='#000000'/>
          </View>

          <View style={styles.space} />

          {workoutsDB.map((data) => {
            if(data.uid == currentUser?.uid)
            {
              return(
                <View style={{alignItems: 'center'}}>
                  <View style={{ alignItems: 'center', borderColor: 'black', borderWidth: 4 }}>
                    <Text style={styles.textStyle}>
                      {data.date.toDate().toDateString()} 
                    </Text>
                    <Text style={styles.textStyle}>
                      {data.weight}
                    </Text>
                    <Image source={{ uri: data.image }} style={{ width: 250, height: 250 }} />

                    <View style={styles.space} />

                  </View>
                  <View style={{ width:80}} >
                    <Button color='red' title="Delete" onPress={() => deletDoc(data.id, data.imageid)} />
                  </View>
                  <View style={styles.space} />

                </View>
              )
            }
          })}
      </View>
      </ScrollView>
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
  textStyle: {
    fontWeight: 'bold',
    justifyContent: 'center',
    backgroundColor: "black",
    color: "white",
    width : 250,
    textAlign: 'center',  
    fontSize: 15,
  },
  textStyleMain: {
    justifyContent: 'center',
    backgroundColor: "rgb(255, 106, 0)",
    height: 36,
    width : 300,
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 20,
    color: "white",
    fontWeight: "bold",   
    textAlign: 'center',  
    fontSize: 25,
  },
  space: {
    width: 20, 
    height: 20,
  },
});

export default ProgressPictures;
