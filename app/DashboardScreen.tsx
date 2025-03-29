// screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button
        title="Add User"
        onPress={() => navigation.navigate('AddUser')}
      />
      <Button
        title="Edit User"
        onPress={() => navigation.navigate('EditUser', { id: 1 })}
      />
      <Button
        title="Delete User"
        onPress={() => navigation.navigate('DeleteUser', { id: 1 })}
      />
      <Button
        title="View User Details"
        onPress={() => navigation.navigate('UserDetail', { id: 1 })}
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

export default DashboardScreen;
