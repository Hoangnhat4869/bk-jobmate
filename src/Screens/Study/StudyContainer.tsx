import React from 'react';
import { Study } from './Study';
import { useNavigation } from '@react-navigation/native';
import { StudyScreenNavigationProp } from '@/Types/navigation';

export const StudyContainer = () => {
  const navigation = useNavigation<StudyScreenNavigationProp>();

  return <Study />;
};
