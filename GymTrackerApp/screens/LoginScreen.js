import { StyleSheet, Text, View, Button, TextInput  } from 'react-native';
import * as React from 'react';

function LogInScreen({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [passsword, setPassword] = React.useState('')

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter Log In Details</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={passsword}
        onChangeText={text => setPassword(text)}
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
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white'
  },
});

export default LogInScreen;




