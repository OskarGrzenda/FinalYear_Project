import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useAuth } from "../Firebase";

export default function AddWorkout( {sendData} ) {

    const [text, setText] = useState('');
    const currentUser = useAuth();
    // Sets workout name
    const changeHandler = (val) => {
        setText(val)
    }

    // Returns the GUI components for the creation of a new workout
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TextInput
                style={styles.input}
                placeholder='new workout'
                onChangeText={changeHandler}
                textAlign={'center'}
            />
            
            <View style={{width: 80}}>
                <Button onPress={() => sendData(text, currentUser.uid) } title='add' color='#000000' /> 
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 240,
        margin: 12,
        borderWidth: 4,
        padding: 10,
        backgroundColor: 'white'
      },
      textStyle: {
        justifyContent: 'center',
        backgroundColor: "rgb(255, 106, 0)",
        height: 36,
        width : 300,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 20,
        color: "white",
        fontWeight: "bold",   
        textAlign: 'center',  
        fontSize: 25,
        overflow: "hidden",
      },
})