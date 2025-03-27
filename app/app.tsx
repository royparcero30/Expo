import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        {/* Add User Screen */}
        <Stack.Screen name="AddUser" component={AddUser} options={{ title: 'Add New User' }} />

        {/* Edit User Screen */}
        <Stack.Screen name="EditUser" component={EditUser} options={{ title: 'Edit User' }} />

        {/* Delete User Screen */}
        <Stack.Screen name="DeleteUser" component={DeleteUser} options={{ title: 'Delete User' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
