import { StyleSheet, Text, View, Pressable, FlatList, Button  } from 'react-native';
import React, { useState, useEffect } from 'react'
import AddWorkout from '../components/addWorkout';
import { db, useAuth, authentication } from "../Firebase";
import { collection, doc, getDocs, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { signOut  } from "firebase/auth";

  const MainMenuScreen = ({navigation}) => {

    // const [workoutsDB, setWorkoutsDB] = useState([]);
    // const workoutCol = collection(db, 'WorkoutDay');

    const [workoutsDB, setWorkoutsDB] = useState([]);
    console.log(workoutsDB);

    useEffect (() => {
      const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
        setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

    // useEffect(() => {
    //   const GetData = async () => {
    //     // const workoutCol = collection(db, 'WorkoutDay');
    //     const workoutSnapshot = await getDocs(workoutCol);
    //     // const workoutList = workoutSnapshot.docs.map(doc => doc.data());
    //     setWorkoutsDB(workoutSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     // console.log(workoutList);
    //   }
    //   GetData();
    // }, []);

  const submitHandler = async (text) => 
  {
    //Set New Exercise Name & Add it to a new document in the collection 
    const randomCollection = Math.random().toString();
    await setDoc(doc(db, "WorkoutDay", randomCollection ), {
      name: text,
    })
  };

  const onPressFunction = () => 
  { 
    navigation.navigate('ExerciseScreen')
  }

  const deletDoc = async (id) =>
  {
    const docRef = doc(db, "WorkoutDay", id);
    await deleteDoc(docRef);
  }

  const currentUser = useAuth();

  
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Currently logged in as: {currentUser?.email}</Text>

        <Text>Enter Workout Name</Text>
        
        <AddWorkout submitHandler={submitHandler} />

          {workoutsDB.map((data) => {
            return (
                <View style={{ flexDirection:"row" }} >
                  <Button onPress={() => onPressFunction() } title={data.name} key={data.id} color='black'/> 
                  <Button title={'X'} color='red' onPress={() => deletDoc(data.id) }></Button>
                </View>
              );
          })}
          <Button title="Sign out" onPress={SignOutUser}></Button>

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
