import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useAuth } from "../Firebase";

export default function AddWorkout( {sendData} ) {
    const [text, setText] = useState('');
    const currentUser = useAuth();
    const changeHandler = (val) => {
        setText(val)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {/* <Text style={styles.textStyle}>Enter Workout Name</Text> */}

            <TextInput
                style={styles.input}
                placeholder='new workout'
                onChangeText={changeHandler}
                textAlign={'center'}
            >
            </TextInput>
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