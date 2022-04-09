import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { db, useAuth } from "../Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot} from 'firebase/firestore';

function ExerciseScreen( { route }){

  const {id} = route.params;
  const [workoutsDB, setWorkoutsDB] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const currentUser = useAuth();

  // Setting the exercise name from input box
  const exerciseName = (val) => {
    setName(val)
  }
  // Setting the exercise weight from input box
  const exerciseWeight = (val) => {
    setWeight(val)
  } 
  // Setting the exercise reps from input box
  const exerciseReps = (val) => {
    setReps(val)
  } 
  // Setting the exercise sets from input box
  const exerciseSets = (val) => {
    setSets(val)
  } 

  // UseEffect function gets access to the ExercisesDB collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
    const realtime = onSnapshot(collection(db, "ExercisesDB"), (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return realtime;
  }, []);

  // Adds all the exercise information to the database to a collection called ExercisesDB
  const sendToDatabase = async () => 
  {
    const randomExerciseID = Math.random().toString();

    await setDoc(doc(db, "ExercisesDB", randomExerciseID), {
        exercise: name,
        weight: weight,
        reps: reps,
        sets: sets,
        exerciseUID: randomExerciseID,
        buttonID: id,
        uid: currentUser?.uid
    })
  };

  // Delete the exercise by its ID
  const deletDoc = async (deleteById, exercise) =>
  {
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete " + exercise + "?",
      [
        // Yes confirms you want to delete the exercise
        {
          text: "Yes",
          onPress: () => {
            const docRef = doc(db, "ExercisesDB", deleteById);
            deleteDoc(docRef);
            setShowBox(false);
          },
        },
        // No does nothing and hides the alert
        {
          text: "No",
        },
      ]
    );
  }

  // Returns all the GUI components of the exercise screen
  return (
    <ScrollView>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={styles.space} />

        <Text style={styles.textStyle}>Enter Exercise Information</Text>     

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
          if(data.buttonID == id && currentUser?.uid == data.uid)
            {
              return(
                <View>
                  <View style={{alignItems: 'center', flexDirection:"row"}}>

                    <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 4, width: 300}}>
                      <Text style={{fontSize: 25, fontWeight: 'bold', color: '#ff6a00'}}>{data.exercise}</Text>

                      <View style={{ flexDirection:"row", fontWeight: 'bold' }}>
                        <Text style={styles.textStyleExercises}>{data.weight}</Text>
                        <View style={styles.spaceRow} />
                        <Text style={styles.textStyleExercises}> x  {data.sets}  x</Text>
                        <View style={styles.spaceRow} />
                        <Text style={styles.textStyleExercises}>{data.reps}</Text>
                      </View>
                    </View> 
                    
                    <View style={styles.space} />

                    <View style={{width: 50}}>
                      <Button  title='x' color='red' onPress={() => deletDoc(data.id, data.exercise) }></Button> 
                    </View>

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
