import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, FlatList  } from 'react-native';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { db, useAuth, authentication } from "../Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { MainMenuScreen } from './MainMenuScreen';

function ExerciseScreen(){

  const [workoutsDB, setWorkoutsDB] = useState([]);

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const changeHandler = (val) => {
    setName(val)
}

  useEffect (() => {
    const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  const sendToDatabase = async (name, id) => 
  {
    console.log(id);
    // console.log("Button ID" );
    //Set New Exercise Name & Add it to a new document in the collection 

    await updateDoc(doc(db, "WorkoutDay", id), {
      exercise: name,
    })
    
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Exercises</Text>     
      <TextInput
          style={styles.input}
          placeholder='Exercise Name'
          onChangeText={changeHandler}
        >
      </TextInput>

      <View style={{ flexDirection:"row" }}>
        <TextInput
          style={styles.input}
          placeholder='Weight'
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder='Reps'
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder='Sets'
        >
        </TextInput>
      </View> 

      {workoutsDB.map((data) => {
        if(data.ubid == data.id)
        {
          return (
            <Button onPress={() => sendToDatabase(name, data.id) } title='save' color='coral' />  
          )
        }
      })} 
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

export default ExerciseScreen;
