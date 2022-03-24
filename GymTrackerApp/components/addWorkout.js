import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useAuth } from "../Firebase";

export default function AddWorkout( {sendData} ) {
    const [text, setText] = useState('');
    const currentUser = useAuth();
    const changeHandler = (val) => {
        setText(val)
    }

    return (
        <View>
            <TextInput
                style={StyleSheet.input}
                placeholder='new workout'
                onChangeText={changeHandler}
            >
            </TextInput>
            <Button onPress={() => sendData(text, currentUser.uid) } title='add workout' color='coral' /> 
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})