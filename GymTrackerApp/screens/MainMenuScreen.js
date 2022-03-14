import { StyleSheet, Text, View, Pressable, FlatList, Button  } from 'react-native';
import React, { useState, useEffect } from 'react'
import AddWorkout from '../components/addWorkout';
import { db } from "../Firebase";
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

  const MainMenuScreen = ({navigation}) => {

    const [workoutsDB, setWorkoutsDB] = useState([]);
    const workoutCol = collection(db, 'WorkoutDay');

    useEffect(() => {

      const GetData = async () => {
        // const workoutCol = collection(db, 'WorkoutDay');
        const workoutSnapshot = await getDocs(workoutCol);
        // const workoutList = workoutSnapshot.docs.map(doc => doc.data());
        setWorkoutsDB(workoutSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        // console.log(workoutList);
      }

      GetData();
    }, []);

 

  //Array for workouts
  // const [workouts, setWorkout] = useState([
  //     {} //text: 'Chest Day', key: '1'
  // ]);

  const submitHandler = async (text) => 
  {
    //Set New Exercise Name & Add it to a new document in the collection 
    const randomCollection = Math.random().toString();
    await setDoc(doc(db, "WorkoutDay", randomCollection ), {
      name: text,
    })

    // setWorkout((prevWorkout) => 
    // {
    //   return [
    //     { text: text, key: Math.random().toString() },
    //     ...prevWorkout
    //   ]
    // })
  };

  const onPressFunction = () => 
  { 
    navigation.navigate('ExerciseScreen')
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Enter Workout Name</Text>

        {/* <Pressable onPress={ GetData }>
          <Text>Get Data</Text>
        </Pressable> */}
        
        <AddWorkout submitHandler={submitHandler} />

        {/* Create a new button for exercises */}
        {/* <FlatList 
          data={workouts}
          renderItem={({ item }) => (
            <Pressable onPress={ onPressFunction }>
              <Text>{item.text}</Text>
            </Pressable>
          )}
        /> */}

          {workoutsDB.map((workoutName) => {
            return (
              // <Pressable onPress={ onPressFunction }>
              //   <Text>{workoutName.name}</Text>
              // </Pressable>
              <Button onPress={() => submitHandler(text) } title={workoutName.name} color='black'/> 

            );
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
