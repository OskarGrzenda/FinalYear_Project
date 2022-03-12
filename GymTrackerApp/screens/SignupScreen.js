import { StyleSheet, Text, View, Button, TextInput  } from 'react-native';
import * as React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from '../Firebase';


function SignUpScreen({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [passsword, setNewPassword] = React.useState('')

    const [isSignedIn, setIsSignedIn] = React.useState(false);

    const SignUpUser = () =>{
        createUserWithEmailAndPassword(authentication, email, passsword)
        .then((re) =>{
            console.log(re);
            setIsSignedIn(true)
        })
        .catch((re) =>{
            console.log(re);
        })
    }

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
  
        <Button
          style={{marginBottom: 20}}
          title="Sign In"
          onPress={SignUpUser}
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