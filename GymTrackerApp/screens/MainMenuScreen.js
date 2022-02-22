import { StyleSheet, Text, View, Button, TextInput  } from 'react-native';
import * as React from 'react';


function MainMenuScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main Menu Screen</Text>
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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MainMenuScreen;
