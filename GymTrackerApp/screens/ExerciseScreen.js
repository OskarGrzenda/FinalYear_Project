import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, FlatList, Dimensions, ScrollView  } from 'react-native';
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

  const deletDoc = async (exercise, weight, reps, sets, exerciseUID, object) =>
  {
    console.log(exercise);
    console.log(exerciseUID);
    console.log(object);

    // await updateDoc(doc(db, "WorkoutDay", id, exerciseArray[object]), {
    //   exerciseArray: arrayRemove({ exercise: exercise, weight: weight, reps: reps, sets: sets, exerciseUID: exerciseUID}),
    
    // })
  }

  return (
    <ScrollView>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <View style={styles.space} />

      <Text style={styles.textStyle}>Enter Exercise Information</Text>     

      {/* //The Id of the button that was just pressed */}
      {/* <Text>{id}</Text> */}

      <TextInput
          style={styles.input}
          placeholder='Exercise Name'
          onChangeText={exerciseName}
          textAlign={'center'}
        >
      </TextInput>

      <View style={{ flexDirection:"row" }}>
        <TextInput
          style={styles.inputSmall}
          placeholder='Weight'
          onChangeText={exerciseWeight}
          textAlign={'center'}
        >
        </TextInput>
        <TextInput
          style={styles.inputSmall}
          placeholder='Sets'
          onChangeText={exerciseSets}
          textAlign={'center'}
        >
        </TextInput>
        <TextInput
          style={styles.inputSmall}
          placeholder='Reps'
          onChangeText={exerciseReps}
          textAlign={'center'}
        >
        </TextInput>
      </View> 

      <View style={{ flexDirection:"row" }}>
        <Button onPress={() => sendToDatabase() } title='Add' color='#000000' /> 
      </View>

      <View style={styles.space} />

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
                      <View style={{alignItems: 'center', flexDirection:"row"}}>

                        <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 4, width: 300}}>
                          {/* <Text>{object}</Text> */}
                          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#ff6a00'}}>{obj.exercise}</Text>

                          <View style={{ flexDirection:"row", fontWeight: 'bold' }}>
                            <Text style={styles.textStyleExercises}>{obj.weight}</Text>
                            <View style={styles.spaceRow} />
                            <Text style={styles.textStyleExercises}> x  {obj.sets}  x</Text>
                            <View style={styles.spaceRow} />
                            <Text style={styles.textStyleExercises}>{obj.reps}</Text>
                          </View>

                        </View> 

                      
                        
                        <View style={styles.space} />

                        {/* {obj.exerciseUID} */}
                        <View style={{width: 50}}>
                          <Button  title='x' color='red' onPress={() => deletDoc(obj.exercise, obj.weight, obj.reps, obj.sets, obj.exerciseUID, object) }></Button> 
                        </View>

                      </View>
                      <View style={styles.space} />

                    </View>
                  );
                  output[i] = (tempItem);
                  i++;
                }

              return (
                <View key={data.id} >
                  {output}
                  {/* <Text>{output.exerciseArray[0].exercise}</Text> */}

                  {/* <LineChart
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
                  /> */}
                </View>
              );
          }
      })}

    </View>
    </ScrollView>

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
    margin: 2,
    borderWidth: 4,
    padding: 10,
    backgroundColor: 'white'
  },
  inputSmall: {
    height: 40,
    width: 77,
    margin: 2,
    borderWidth: 4,
    padding: 10,
    backgroundColor: 'white'
  },
  textStyle: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  textStyleExercises: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 20
  },
  space: {
    width: 20, 
    height: 20,
  },
  spaceRow: {
    width: 5, 
    height: 20,
  },
});

export default ExerciseScreen;
