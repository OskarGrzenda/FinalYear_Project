import { StyleSheet, View, Button, ScrollView, Alert  } from 'react-native';
import React, { useState, useEffect } from 'react'
import AddWorkout from '../components/addWorkout';
import { db, useAuth } from "../Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore';

const MainMenuScreen = ({navigation}) => {

  const currentUser = useAuth();
  const [workoutsDB, setWorkoutsDB] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [exerciseDB, setExerciseDB] = useState([]);

  // UseEffect function gets access to the WorkoutDay collection from firestore
  // Listens to real-time updates to return data in real-time
  // Orders by date in descending order
  useEffect (() => {
    const collectionRef = collection(db, "WorkoutDay");
    const q = query(collectionRef, orderBy("date", "desc"));

    const realtime = onSnapshot(q, (snapshot) => {
      setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  // Functions that add a new workout day to the collection called WorkoutDay
  const addWorkouts = async (text, uid) => 
  {
    const randomCollection = Math.random().toString();
    await setDoc(doc(db, "WorkoutDay", randomCollection ), {
      name: text,
      uid: uid,
      ubid: randomCollection,
      date: Timestamp.now().toDate(),
    })
  };

  // Function that gets the current ID of the button and passes button ID to ExerciseScreen
  const openWorkout = (id) => 
  { 
    navigation.navigate('ExerciseScreen', {id})
  }

  // Function to delete the current workout day selected and the workouts data
  const deletDoc = async (id, name) =>
  {
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete " + name + "?",
      [
        // Alert box to confirm deletion YES will confirm and delete the data
        {
          text: "Yes",
          onPress: () => {
            const docRef = doc(db, "WorkoutDay", id);
            deleteDoc(docRef);
            {exerciseDB.map((data) => {
              if(data.uid == currentUser?.uid && id == data.buttonID)
              {
                const docRef = doc(db, "ExercisesDB", data.id);
                deleteDoc(docRef);
              }
            })}

            setShowBox(false);
          },
        },
        // No does nothing and closes the alert
        {
          text: "No",
        },
      ]
    );
  }
  
  // Returns all the GUI components for the Main Menu Screen
  return (
      <View style={styles.mainView}>
      <ScrollView>

        <View style={styles.space} />

        <AddWorkout sendData={addWorkouts} />

        <View style={styles.space} />

          {workoutsDB.map((data) => {
            if(data.uid == currentUser?.uid)
              {
                return (
                  <View>
                    <View style={{width: 390, borderBottomColor: 'black', borderBottomWidth: 1,}}/>
                    
                    <View style={{ flexDirection:"row", justifyContent: 'center' }} key={data.id} >
                        <View style={{width: 200, padding:10}} >
                          <Button onPress={() => openWorkout(data.id) } title={data.name}  color='black'/> 
                        </View>

                        <View style={styles.space} />

                        <View style={{padding:10}}>
                          <Button title={'X'} color='red' onPress={() => deletDoc(data.id, data.name) }></Button>
                        </View>
                    </View>

                    <View style={{width: 390, borderBottomColor: 'black', borderBottomWidth: 1,}}/>

                    <View style={styles.space} />
                  </View>
                );
              }
          })}
          <View style={styles.space} />

       </ScrollView>

      </View>
    );
  }

const styles = StyleSheet.create
({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    justifyContent: 'center'
  },
  space: {
    width: 20, 
    height: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  mainView:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

export default MainMenuScreen;
