import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserByid } from './api';

const UserDetail = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByid(id).then(setUser);
  }, [id]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>User Detail</Text>
      <Text>Username: {user.username}</Text>
    </View>
  );
};  

export default UserDetail;
