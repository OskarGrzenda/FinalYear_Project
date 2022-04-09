import { StyleSheet, Text, View, Pressable, FlatList, Button, ScrollView, Alert  } from 'react-native';
import React, { useState, useEffect } from 'react'
import AddWorkout from '../components/addWorkout';
import { db, useAuth, authentication } from "../Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { signOut  } from "firebase/auth";
import NavigationTabs from '../components/NavigationTabs';

  const MainMenuScreen = ({navigation}) => {

    const currentUser = useAuth();
    const [workoutsDB, setWorkoutsDB] = useState([]);
    const [showBox, setShowBox] = useState(true);
    const [exerciseDB, setExerciseDB] = useState([]);

    useEffect (() => {
      const realtime = onSnapshot(collection(db, "WorkoutDay"), (snapshot) => {
        setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

    //Refrence to exercise database 
    useEffect (() => {
      const realtime = onSnapshot(collection(db, "ExercisesDB"), (snapshot) => {
        setExerciseDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
    }, []);

  const addWorkouts = async (text, uid) => 
  {
    //Set New Exercise Name & Add it to a new document in the collection 
    const randomCollection = Math.random().toString();
    await setDoc(doc(db, "WorkoutDay", randomCollection ), {
      name: text,
      uid: uid,
      ubid: randomCollection,
      // exerciseArray: [],
      date: Timestamp.now().toDate(),

    })
  };

  const openWorkout = (id) => 
  { 
    navigation.navigate('ExerciseScreen', {id})
  }

  const deletDoc = async (id, name) =>
  {
    return Alert.alert(
      "Delete",
      "Are you sure you want to delete " + name + "?",
      [
        // The "Yes" button
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
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }

  // const setStepsDB = async () =>
  // {
  //   setDoc(doc(db, "Steps", currentUser?.uid ), {
  //     totalSteps: "0",
  //     uid: currentUser?.uid,
  //   })
  // }

  // , setStepsDB()
  
  return (
      <View style={styles.mainView}>
      <ScrollView>

      {/* <Text>Currently logged in as: {currentUser?.email}</Text>
      <Text>User Id: {currentUser?.uid}</Text> */}

        {/* <View style={{ flexDirection:"row"}} >
          <View style={{ width:131}}>
            <Button color= '#000000' title="Profile" onPress={() => navigation.navigate('UserProfile')}/>
          </View>
          <View style={{ width:131}}>
            <Button title="Pictures" onPress={() => navigation.navigate('ProgressPictures')} color='#000000'/>
          </View>
          <View style={{ width:131}}>
            <Button title="Steps" onPress={() => {navigation.navigate('Steps') }} color='#000000'/> 
          </View>
        </View> */}

        <View style={styles.space} />

        <AddWorkout sendData={addWorkouts} />

        <View style={styles.space} />

          {workoutsDB.map((data) => {
            if(data.uid == currentUser?.uid)
              {
                return (
                  <View>

                    <View style={{width: 390, borderBottomColor: 'black', borderBottomWidth: 1,}}>
                    </View>
                    

                    <View style={{ flexDirection:"row", justifyContent: 'center' }} key={data.id} >
                        <View style={{width: 200, padding:10}} >
                          <Button onPress={() => openWorkout(data.id) } title={data.name}  color='#ff6a00'/> 
                        </View>

                        <View style={styles.space} />

                        <View style={{padding:10}}>
                          <Button title={'X'} color='red' onPress={() => deletDoc(data.id, data.name) }></Button>
                        </View>

                    </View>



                    <View style={{width: 390, borderBottomColor: 'black', borderBottomWidth: 1,}}>
                    </View>

                    <View style={styles.space} />

                  </View>
                );
              }
          })}

          <View style={styles.space} />


          {/* <NavigationTabs></NavigationTabs> */}

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
