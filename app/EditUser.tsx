import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getUserByid, updateUser } from './Api'

const EditUser = ({ route, navigation }) => {
  const { id } = route.params;
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByid(id);
      setUsername(user.username);
    };
    fetchUser();
  }, [id]);

  const handleUpdateUser = async () => {
    try {
      await updateUser(id, username);
      Alert.alert('Success', 'User updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
    }
  };

  return (
    <View>
      <Text>Edit User</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Button title="Update User" onPress={handleUpdateUser} />
    </View>
  );
};

export default EditUser;
