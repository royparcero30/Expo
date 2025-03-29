import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getUserByid } from './Api';

const UserDetail = ({ route }: any) => {
  const { id } = route.params;
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const fetchedUser = await getUserByid(id);
      setUser(fetchedUser);
    };
    fetchUserDetails();
  }, [id]);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>User Detail</Text>
      <Text>Username: {user.username}</Text>
      <Text>Full Name: {user.fullname}</Text>
      {/* Add other fields as needed */}
    </View>
  );
};

export default UserDetail;
