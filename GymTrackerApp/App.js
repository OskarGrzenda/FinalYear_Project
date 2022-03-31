import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Image, Pressable  } from 'react-native';
import * as React from 'react';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import UserProfile from './screens/UserProfile';
import ProgressPictures from './screens/ProgressPictures';
import Steps from './screens/Steps';
import UpdateEmail from './screens/UpdateEmail';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const logo = './pictures/GymTrackerLogo.png';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require(logo)} style={{ width: 370, height: 100, resizeMode: 'contain' }}/>

      <View style={styles.space} />

      <View style={{width: 200}}>
        <Button color='#000000' title="Log In" style={styles.button} onPress={() => navigation.navigate('LoginScreen')}></Button>
        <View style={styles.space} />
        <Button color='#000000' title="Sign Up" style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}></Button>
      </View>

      <View style={styles.bottom} />

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
        <Stack.Screen name="Steps" component={Steps} />
        <Stack.Screen name="UpdateEmail" component={UpdateEmail} />

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
  button: {
    marginBottom: 20,
    padding: 30,
  },
  space: {
    width: 20, 
    height: 20,
  },
  bottom: {
    width: 20, 
    height: 150,
  },
});
