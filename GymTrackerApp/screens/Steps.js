import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import { collection, doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, useAuth } from "../Firebase";

function Steps() {

  const [workoutsDB, setWorkoutsDB] = useState([]);
  var stepsCounter = 0;
  const currentUser = useAuth();

  // UseEffect function gets access to the Steps collection from firestore
  // Listens to real-time updates to return data in real-time
  useEffect (() => {
      const realtime = onSnapshot(collection(db, "Steps"), (snapshot) => {
        setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return realtime;
  }, []);

  // Everytime a change occurs in the file watchSteps() gets called and updates the steps
  useEffect(() => {
      watchSteps();
  }, []);
  
  // Function that counts the steps and updates them
  const watchSteps = async () =>
  {
    Pedometer.watchStepCount((result) => 
    {
      stepsCounter = result.steps;

      UpdateStepsInDatabase(stepsCounter);
    });
  };

  // Eveytime WatchSteps gets called it calls UpdateStepsInDatabase to update steps in the database
  const UpdateStepsInDatabase = async (stepsCounter) =>
  {
    setDoc(doc(db, "Steps", currentUser?.uid ), 
    {
      totalSteps: stepsCounter,
      uid: currentUser?.uid
    })
  };

    // Start the counter and initially set steps to 0
    const StartCounter = async () =>
    {
      setDoc(doc(db, "Steps", currentUser?.uid ), 
      {
        totalSteps: 0,
        uid: currentUser?.uid
      })
    };

  // Function that resets step count to zero in the database when the reset button is pressed
  const ResetStepCount = async () =>
  {
    // Pedometer.watchStepCount((result) => 
    // {
    //   result.steps = 0;

    //   // UpdateStepsInDatabase(stepsCounter);
    // });

    updateDoc(doc(db, "Steps", currentUser?.uid ), {
      totalSteps: 0,
    })
  };

  // Returns all the GUI components for the Steps page
  return (
    <View style={styles.container}>
      <View style={{height: 30}} />

      {workoutsDB.map((data) => {
        var DistanceCalc = data.totalSteps / 1312.34;
        var TotalDistance = DistanceCalc.toFixed(2);
        if(data.uid == currentUser?.uid)
        {
        return (
            <View style={{alignItems: "center"}}>
                <View style={{ justifyContent: "center" }}>
                    <CircularProgress
                    value={data.totalSteps}
                    maxValue={10000}
                    radius={200}
                    textColor={"#ff6a00"}
                    activeStrokeColor={"#ff6a00"}
                    inActiveStrokeColor={"#000000"}
                    inActiveStrokeWidth={40}
                    activeStrokeWidth={30}
                    title={"STEPS"}
                    titleColor={"black"}
                    titleStyle={{ fontWeight: "bold" }}
                    />
                </View>

                <View style={styles.space} />

                <View>
                  <View >
                    <Text style={[styles.textStyle]}>
                      Target: 10,000 Steps
                    </Text>
                  </View>

                  <View style={styles.space} />

                  <View>
                    <Text style={[ styles.textStyle]}>
                      Distance: {TotalDistance} km
                    </Text>
                  </View>

                  <View style={styles.space} />
                </View>
            </View>
            )
          }
        })}

        <View style={{ flexDirection:"row", justifyContent: 'center' }} >

    <View style={{ width:131}}>
      <Button title="Start" onPress={() => StartCounter()} color='#000000'/> 
    </View>

    <View style={{ width:131}}>
      <Button title="Reset" onPress={() => ResetStepCount()} color='#000000'/> 
    </View>

    </View>

  </View>
  );
}

const styles = StyleSheet.create
({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
      textStyle: {
        backgroundColor: "rgb(255, 106, 0)",
        height: 36,
        width : 350,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 20,
        overflow: "hidden",
        fontSize: 25,
        color: "white",
        fontWeight: "bold",   
        textAlign: 'center',  
      },
      space: {
        width: 20, 
        height: 20,
      },
});

export default Steps;




