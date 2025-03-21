import React, { useState} from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUser } from "./Api";

const addUser = ({ navigation }) => {

const [username, setUsername] = useState('');
const [password, sterPassword] = useState('');

const handleCreateUser = async () => {
    try {
        await createUser(username, password);
        Alert.alert('Success', 'User created');
        navigation.goBack();
    } catch (error) {
        Alert.alert('Error', error.response?.data?.message|| 'Failed to create user');
    }
};

return (
    <View>
        <Text>Add new User</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={sterPassword} />
        <Button title="Create User" onPress={handleCreateUser} />
        </View>
);
};

export default addUser;