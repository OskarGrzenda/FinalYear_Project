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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const logo = './pictures/GymTrackerLogo.png';
const shoe = './pictures/shoe.png';
const dumbbell = './pictures/dumbbell.png';
const profile = './pictures/profile.png';
const pictures = './pictures/pictures.png';
const Tab = createBottomTabNavigator();

//Function for my homescreen that displays all the information of how my page home page looks
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

//Different screens that are part of the tab navigation
function Tabs()
{
  return(
    <Tab.Navigator>
      <Tab.Screen name="Workouts"  component={MainMenuScreen} options={{tabBarIcon: ({ focused }) => (<Image source={require(dumbbell)} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>)}} />
      <Tab.Screen name="Pictures" component={ProgressPictures} options={{tabBarIcon: ({ focused }) => (<Image source={require(pictures)} style={{ width: 35, height: 35, resizeMode: 'contain' }}/>)}}/>
      <Tab.Screen name="Steps" component={Steps} options={{tabBarIcon: ({ focused }) => (<Image source={require(shoe)} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>)}}/>
      <Tab.Screen name="Profile" component={UserProfile} options={{tabBarIcon: ({ focused }) => (<Image source={require(profile)} style={{ width: 30, height: 30, resizeMode: 'contain' }}/>)}}/>
    </Tab.Navigator>
  );
}

//Navigation container for navigating around all my different screens on the app
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
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
