import React from 'react';
import { Forum } from './Forum';
import { useNavigation } from '@react-navigation/native';
import { ForumScreenNavigationProp } from '@/Types/navigation';

export const ForumContainer = () => {
  const navigation = useNavigation<ForumScreenNavigationProp>();

  return <Forum />;
};
