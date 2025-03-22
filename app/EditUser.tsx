import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, Alert} from 'react-native';
import { getUserByid, updateUser } from "./Api";

const EditUser = ({ route, Navigation}) => {
    const [ username, setUsername] = useState('');

    
    useEffect(() => {
        getUserByid(id).then((user) => setUsername(user.username));
    }, []);

    const handleUpdateUser = async () => {
        try {
            await updateUser(id, username);
            Alert.alert('Success', 'User updated');
            Navigation.goback();
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update user');
        }
    };

     return (
            <View>
                <Text> EDIT USER </Text>
                <TextInput value={username}onChangeText={setUsername} />
                <Button title="UPDATE USER" onPress={handleUpdateUser} />
                </View>
        );
    };
    
    export default updateUser;