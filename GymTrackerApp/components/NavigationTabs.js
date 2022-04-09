import { StyleSheet, Text, View, Button, TextInput, Alert, Image  } from 'react-native';
import React, { useState, useEffect } from 'react'

// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserProfile from '../screens/UserProfile';
import ProgressPictures from '../screens/ProgressPictures';
import Steps from '../screens/Steps';

import App from '../App';

import { tabs } from '../App';


function NavigationTabs({ navigation }) {

    const profilePageName = "Profile";
    const progressPicturesName = "Pictures";
    const stepsName = "Steps";
    const Tab = createBottomTabNavigator();

    // const one = navigation.navigate('Tabs', { screen: 'UserProfile' });

    return (
        // <NavigationContainer>
        <Tab.Navigator 
            tabBarOptions={{
                labelStyle:{fontSize: 18},
                activeTintColor: 'red'
            }}>
  
          <Tab.Screen name={profilePageName} component={UserProfile} />
          <Tab.Screen name={progressPicturesName} component={ProgressPictures} />
          <Tab.Screen name={stepsName} component={Steps} />
  
        </Tab.Navigator> 
    //   </NavigationContainer>
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
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 4,
    padding: 10,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  bottom: {
    width: 20, 
    height: 100,
  },
});

export default NavigationTabs;


// initialRouteName={profilePageName}
// screenOptions={({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;
//     let rn = route.name;

//     if (rn === profilePageName) {
//       iconName = focused ? 'profile' : 'profile-outline';

//     } else if (rn === progressPicturesName) {
//       iconName = focused ? 'pictures' : 'pictures-outline';

//     } else if (rn === stepsName) {
//       iconName = focused ? 'steps' : 'steps-outline';
//     }

//     // You can return any component that you like here!
//   //   return <Ionicons name={iconName} size={size} color={color} />;
//   },
// })}
// tabBarOptions={{
//   activeTintColor: 'red',
//   inactiveTintColor: 'grey',
//   labelStyle: { paddingBottom: 10, fontSize: 10 },
//   style: { padding: 10, height: 70}
// }}