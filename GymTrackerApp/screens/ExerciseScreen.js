import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, FlatList  } from 'react-native';
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';

function ExerciseScreen(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Exercise Screen</Text>        
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
});

export default ExerciseScreen;
