import { StyleSheet, Text, View, Button, TextInput  } from 'react-native';
import * as React from 'react';



function SignUpScreen({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [passsword, setNewPassword] = React.useState('')
    const [confirmPasswordd, confirmPassword] = React.useState('')

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Screen</Text>
  
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
  
        <TextInput
          style={styles.input}
          value={passsword}
          onChangeText={text => setNewPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
  
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPasswordd}
          onChangeText={text => confirmPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
  
        <Button
          style={{marginBottom: 20}}
          title="Log In"
          onPress={() => navigation.navigate('MainMenuScreen')}
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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUpScreen;