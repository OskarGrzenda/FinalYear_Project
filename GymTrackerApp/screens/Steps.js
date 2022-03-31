import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, Image, Dimensions } from 'react-native';

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

import { collection, doc, setDoc, deleteDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import { db, useAuth, authentication } from "../Firebase";

function Steps() {

    // const [StepCount, SetStepCount] = useState(0);
    const [workoutsDB, setWorkoutsDB] = useState([]);

    // var previousSteps = 0;
    // var resetSteps = 0;

   //On average 1312.34 steps per 1km
    // var DistanceCalc = StepCount / 1312.34;
    // var TotalDistance = DistanceCalc.toFixed(2);

    const [resetSteps, SetResetStepCount] = useState(0);
    const [previousSteps, SetPreviousStepCount] = useState(0);

      
    const currentUser = useAuth();

    useEffect (() => {
        const realtime = onSnapshot(collection(db, "Steps"), (snapshot) => {
          setWorkoutsDB(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return realtime;
    }, []);

    useEffect(() => {
        watchSteps();
    }, []);
   
    const watchSteps = async () =>
    {

      Pedometer.watchStepCount((result) => 
      {
        SetPreviousStepCount(result.steps);
        var stepsCounter = result.steps;
        // result.steps = result.steps - resetSteps;
        // var newStepsCounter = result.steps;
        // console.log("StepCounter " + stepsCounter);
        // console.log("Temp " +newSteps);
        UpdateStepsInDatabase(stepsCounter);

      });
    };

    const UpdateStepsInDatabase = async (stepsCounter) =>
    {
      setDoc(doc(db, "Steps", currentUser?.uid ), 
      {
        totalSteps: stepsCounter,
        uid: currentUser?.uid
      })
    };

    const ResetStepCount = async () =>
    {
      SetResetStepCount(previousSteps);
      // console.log(previousSteps);
      updateDoc(doc(db, "Steps", currentUser?.uid ), {
            totalSteps: "0",
          })
    };

  return (
    <View style={styles.container}>
      <View style={{height: 30}} />

        {/* <Text>
            {StepCount}
        </Text> */}
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

        


    <View style={{ width:131}}>
        <Button title="Reset" onPress={() => ResetStepCount()} color='#000000'/> 
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




