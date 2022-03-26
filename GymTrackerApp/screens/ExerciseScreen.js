import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, FlatList, Dimensions  } from 'react-native';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { db, useAuth, authentication } from "../Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, updateDoc, deleteField, FieldValue, arrayUnion, arrayRemove } from 'firebase/firestore';
import { MainMenuScreen } from './MainMenuScreen';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit'

function ExerciseScreen( { route }){

  const {id} = route.params;
    
  const [workoutsDB, setWorkoutsDB] = useState([]);

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const exerciseName = (val) => {
    setName(val)
  }

  const exerciseWeight = (val) => {
    setWeight(val)
  } 

  const exerciseReps = (val) => {
    setReps(val)
  } 

  const exerciseSets = (val) => {
    setSets(val)
  } 

  useEffect (() => {
    const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  const sendToDatabase = async () => 
  {
    const randomExerciseID = Math.random().toString();

    await updateDoc(doc(db, "WorkoutDay", id), {

      exerciseArray: arrayUnion({
        exercise: name,
        weight: weight,
        reps: reps,
        sets: sets,
        exerciseUID: randomExerciseID,
      })

    })
  };

  const deletDoc = async (exercise, weight, reps, sets, exerciseUID) =>
  {
    console.log(exercise);

    await updateDoc(doc(db, "WorkoutDay", id), {
      exerciseArray: arrayRemove({ exercise: exercise, weight: weight, reps: reps, sets: sets, exerciseUID: exerciseUID}),
    
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Exercises</Text>     

      <Text>{id}</Text>

      <TextInput
          style={styles.input}
          placeholder='Exercise Name'
          onChangeText={exerciseName}
        >
      </TextInput>

      <View style={{ flexDirection:"row" }}>
        <TextInput
          style={styles.input}
          placeholder='Weight'
          onChangeText={exerciseWeight}
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder='Reps'
          onChangeText={exerciseReps}
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder='Sets'
          onChangeText={exerciseSets}
        >
        </TextInput>
      </View> 

      <View style={{ flexDirection:"row" }}>
        <Button onPress={() => sendToDatabase() } title='save' color='coral' /> 
      </View>

      {/* data.exerciseArray[i].exercise, data.exerciseArray[i].weight, data.exerciseArray[i].reps, data.exerciseArray[i].sets, data.exerciseArray[i].exerciseUID */}
      {workoutsDB.map((data) => {
        if(data.ubid == id) //[0].exercise
          {
              var output=[];
              var i = 0;
              var obj;
                for(var object in data.exerciseArray)//var i = 0; i < data.exerciseArray.length; i++
                {
                  // console.log(i);
                  obj = data.exerciseArray[object];
                  var tempItem=
                  (
                    <View>
                      <Text>{object}</Text>
                      <Text>{obj.exercise}</Text>

                      <View style={{ flexDirection:"row" }}>
                        <Text>{obj.weight}</Text>
                        <Text>{obj.reps}</Text>
                        <Text>{obj.sets}</Text>
                      </View>

                      <Button title={'X'} color='red' onPress={() => deletDoc(obj.exercise, obj.weight, obj.reps, obj.sets, obj.exerciseUID) }></Button>
                    
                      
                    </View> 
                  );
                  output[i] = (tempItem);
                  i++;
                }

              return (
                <View key={data.id} >
                  {output}
                  {/* <Text>{output.exerciseArray[0].exercise}</Text> */}

                  <LineChart
                    data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                        data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                        ]
                    }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                  />
                </View>
              );
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
