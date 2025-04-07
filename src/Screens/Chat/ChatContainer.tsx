import React from 'react';
import { Chat } from './Chat';
import { useNavigation } from '@react-navigation/native';
import { ChatScreenNavigationProp } from '@/Types/navigation';

export const ChatContainer = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();

  return <Chat />;
};
