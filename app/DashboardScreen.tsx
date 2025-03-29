import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import App from '.';
const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <Button
        title="Add User"
        onPress={() => navigation.navigate('AddUser')}
      />
      <Button
        title="Edit User"
        onPress={() => navigation.navigate('EditUser')}
      />
      <Button
        title="Delete User"
        onPress={() => navigation.navigate('DeleteUser')}
      />
      <Button
        title="View User Details"
        onPress={() => navigation.navigate('UserDetail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
