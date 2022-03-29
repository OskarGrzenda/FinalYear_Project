import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Platform, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, useAuth, authentication } from "../Firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc, onSnapshot, updateDoc, deleteField, FieldValue, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore';

const ProgressPictures = () => {

    const currentUser = useAuth();
    // const [randomImage, setRandomImage] = useState([]);
    const [weight, setWeight] = useState([]);
    const storage = getStorage();
    const [workoutsDB, setWorkoutsDB] = useState([]);
    const [image, setImage] = useState(null);

    // const [form, setForm] = useState({
    //   weight: "",
    //   image: "",
    // })


    useEffect (() => {
      const realtime = onSnapshot(collection(db, "ProgressInfo"), (snapshot) => {
        setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

    // const saveToDatabase = async () => 
    // {
    //   const reference = ref(storage, currentUser?.uid + '/'+ 'test.jpg' ); //+ 'test.jpg'
    //   await getDownloadURL(reference).then((x) => {
    //     setImage(x);
    //     console.log(x);
    //   })
    //   //Set New Exercise Name & Add it to a new document in the collection 
    //   const randomProgressID = Math.random().toString();
    //   await setDoc(doc(db, "ProgressInfo", randomProgressID ), {
    //     date: Timestamp.now().toDate(),
    //     weight: weight,
    //     uid: currentUser.uid,
    //     image: image,
    //   })
    // };


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);

        if (!result.cancelled) {
          const randomCollection = Math.random().toString();
          // setRandomImage(randomCollection);
          console.log("Before its set "+randomCollection);
          //Save it to this location with this name
          const reff = ref(storage, currentUser?.uid + '/' + randomCollection);
          //Convert image to array of bytes instead of a string
          const img = await fetch(result.uri);
          const bytes = await img.blob();

          await uploadBytes(reff, bytes);  

          const reference = ref(storage, currentUser?.uid + '/'+ randomCollection ); //+ 'test.jpg'
          // console.log("After its set "+randomImage);
          await getDownloadURL(reference).then((x) => {
            // setImage(x);
            console.log("The Url " + x);
            //Set New Exercise Name & Add it to a new document in the collection 
            const randomProgressID = Math.random().toString();
            var today = new Date().toString();
            
             setDoc(doc(db, "ProgressInfo", today ), {
              date: Timestamp.now().toDate(),
              weight: weight,
              uid: currentUser.uid,
              image: x,
            })
          })


        }
      };

      const deletDoc = async (id) =>
      {
        const docRef = doc(db, "ProgressInfo", id);
        await deleteDoc(docRef);
      }

    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.textStyle}>Progress Pictures</Text>

            {/* <Text>Currently logged in as: {currentUser?.email}</Text>
            <Text>User Id: {currentUser?.uid}</Text> */}

            <View style={{ flexDirection:"row" }}>

                <TextInput
                    style={styles.input}
                    placeholder='Weight'
                    onChangeText={setWeight}
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
                    <View style={{ width:200}} >
                      <Button color='red' title="X" onPress={() => deletDoc(data.id)} />
                    </View>
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
  },
  space: {
    width: 20, 
    height: 20,
  },
});

export default ProgressPictures;
