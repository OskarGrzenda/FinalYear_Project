import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput  } from 'react-native';
import * as React from 'react';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import UserProfile from './screens/UserProfile';
import ProgressPictures from './screens/ProgressPictures';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
      />

      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
      />

    </View>
);
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} />
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProgressPictures" component={ProgressPictures} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create
({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
