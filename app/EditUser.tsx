import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, Alert} from 'react-native';
import { getUserByid, updateUser } from "./Api";

const EditUser = ({ route, navigation}) => {
    const { id } = route.params;
    const [ Username, setUsername] = useState('');

    useEffect(() => {
        getUserByid(id).then((user) => setUsername(user.Username));
    }, []);

    const handleUpdateUser = async () => {
        try {
            await updateUser(id, Username);
            Alert.alert('Success', 'User updated');
            navigation.goback();
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update user');
        }
    };

     return (
            <View>
                <Text> EDIT USER </Text>
                <TextInput value={Username}onChangeText={setUsername} />
                <Button title="UPDATE USER" onPress={handleUpdateUser} />
                </View>
        );
    };
    
    export default EditUser;