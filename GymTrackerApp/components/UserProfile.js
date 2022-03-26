import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserProfile = () => {

    const [date, setDate] = useState([]);
    const [weight, setWeight] = useState([]);

    const saveToDatabase = async () => 
    {
        console.log(date);
        console.log(weight);
    };

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>User Profile</Text>
            <View style={{ flexDirection:"row" }}>

                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    onChangeText={setDate}
                    >
                </TextInput>      
                <TextInput
                    style={styles.input}
                    placeholder='Weight'
                    onChangeText={setWeight}
                    >
                </TextInput>
            </View>

            <Button onPress={() => saveToDatabase() } title='save' color='coral' /> 

            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        </View>

    );
}

const styles = StyleSheet.create
({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserProfile;
