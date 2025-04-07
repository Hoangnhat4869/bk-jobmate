import React from 'react';
import { Profile } from './Profile';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '@/Types/navigation';

export const ProfileContainer = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleEditProfile = () => {
    // Navigate to edit profile screen (to be implemented)
    console.log('Navigate to edit profile');
  };

  const handleViewResume = () => {
    // Navigate to resume view screen (to be implemented)
    console.log('Navigate to view resume');
  };

  return (
    <Profile 
      onEditProfile={handleEditProfile}
      onViewResume={handleViewResume}
    />
  );
};
