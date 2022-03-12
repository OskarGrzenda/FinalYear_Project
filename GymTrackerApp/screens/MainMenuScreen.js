import { StyleSheet, Text, View, Pressable, FlatList  } from 'react-native';
import React, { useState } from 'react'
import AddWorkout from '../components/addWorkout';
import { db } from "../Firebase";
import { doc, setDoc } from 'firebase/firestore';

  const MainMenuScreen = ({navigation}) => {


    const SendData = async ()=>{ 
      const workout = "Arms";
      
      await setDoc(doc(db, "WorkoutDay", "TestDocument" ), {
        name: workout,
      });
    }

  //Array for workouts
  const [workouts, setWorkout] = useState([
      {} //text: 'Chest Day', key: '1'
  ]);

  const submitHandler = (text) => 
  {
    setWorkout((prevWorkout) => 
    {
      return [
        { text: text, key: Math.random().toString() },
        ...prevWorkout
      ]
    })
  };

  const onPressFunction = () => 
  { 
    navigation.navigate('ExerciseScreen')
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Enter Workout Name</Text>

        <Pressable onPress={ SendData }>
          <Text>Set Data</Text>
        </Pressable>
        
        <AddWorkout submitHandler={submitHandler} />

        {/* Create a new button for exercises */}
        <FlatList 
          data={workouts}
          renderItem={({ item }) => (
            <Pressable onPress={ onPressFunction }>
              <Text>{item.text}</Text>
            </Pressable>
          )}
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MainMenuScreen;
