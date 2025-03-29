// components/SomeComponent.tsx
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type SomeComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

const SomeComponent: React.FC = () => {
  const navigation = useNavigation<SomeComponentNavigationProp>();

  return (
    <Button
      title="Go to Dashboard"
      onPress={() => navigation.navigate('Dashboard')}
    />
  );
};

export default SomeComponent;
