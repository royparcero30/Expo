import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserByid } from './Api';

const UserDetail = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByid(id).then(setUser);
  }, []);

  if (!user)  return <Text>Loading...</Text>;

  return (
    <View>
      <Text>User Detail</Text>
      <Text>Username: {user.Userame}</Text>
    </View>
  );
};  

export default UserDetail;
