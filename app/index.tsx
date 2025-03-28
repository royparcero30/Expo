import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./login";
import HomeScreen from "./home";
import AddUser from "./AddUser";
import { deleteUser } from "./Api";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";


const Stack = createStackNavigator();

const App = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddUser" component={AddUser} />
    <Stack.Screen name="EditUser" component={EditUser} />
    <Stack.Screen name="DeleteUser" component={DeleteUser} />
    </Stack.Navigator>

);


export default App;