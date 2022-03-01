import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, FlatList  } from 'react-native';
import React, { useState } from 'react'
import AddWorkout from '../components/addWorkout';

function MainMenuScreen(){

  const [workouts, setWorkout] = useState([
    { } //text: 'Chest Day', key: '1'
  ]);

  const submitHandler = (text) => {
    setWorkout((prevTodos) => {
      return [
        { text: text, key: Math.random().toString() },
        ...prevTodos
      ]
    })
  };

  const onPressFunction = () => {

  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main Menu Screen</Text>

        <Text>Enter Workout Name</Text>
        
        <AddWorkout submitHandler={submitHandler} />
        <FlatList 
          data={workouts}
          renderItem={({ item }) => (
            <Pressable onPress={onPressFunction}>
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
