import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import DeleteUserApi from './api';


const DeleteUser = ({route, navigation }) => {
    const { id } = route.params;

    const handleDeleteUser = async () => {
        try {
            await DeleteUserApi(id);
            Alert.alert('Success', 'User deleted');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to delete User');
        }
    };

    return (
        <View>
            <Text> ARE YOU SURE YOU WANT TO DELETE THIS USER? </Text>
            <Button title="Delete" onPress={handleDeleteUser} />
            </View>
    );
};

export default DeleteUser;