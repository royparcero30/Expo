import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AddUser from './AddUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import DashboardScreen from './DashboardScreen'; 
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  AddUser: undefined;
  EditUser: { id: number };
  DeleteUser: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AddUser" component={AddUser} />
    <Stack.Screen name="EditUser" component={EditUser} />
    <Stack.Screen name="DeleteUser" component={DeleteUser} />
  </Stack.Navigator>
);

export default App;
