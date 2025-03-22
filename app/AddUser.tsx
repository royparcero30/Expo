import React, { useState} from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUser } from "./api";

const addUser = ({ navigation }) => {

const [Username, setUsername] = useState('');
const [Password, setPassword] = useState('');

const handleCreateUser = async () => {
    try {
        await createUser(Username, Password);
        Alert.alert('Success', 'User created');
        navigation.goBack();
    } catch (error) {
        Alert.alert('Error', error.response?.data?.message|| 'Failed to create user');
    }
};

return (
    <View>
        <Text>Add new User</Text>
        <TextInput placeholder="Username" value={Username} onChangeText={setUsername} />
        <TextInput placeholder="Password" secureTextEntry value={Password} onChangeText={setPassword} />
        <Button title="Create User" onPress={handleCreateUser} />
        </View>
);
};

export default addUser;