import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Heading, 
  Icon, 
  Switch,
  Divider
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/Context/AuthContext';

export interface ISettingsProps {
  darkMode: boolean;
  notifications: boolean;
  language: string;
  onToggleDarkMode: (value: boolean) => void;
  onToggleNotifications: (value: boolean) => void;
  onChangeLanguage: () => void;
  onNavigateToAccount: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToHelp: () => void;
  onNavigateToAbout: () => void;
}

export const Settings = (props: ISettingsProps) => {
  const {
    darkMode,
    notifications,
    language,
    onToggleDarkMode,
    onToggleNotifications,
    onChangeLanguage,
    onNavigateToAccount,
    onNavigateToPrivacy,
    onNavigateToHelp,
    onNavigateToAbout
  } = props;
  
  const { signOut } = useAuth();

  const renderSettingItem = (
    icon: string, 
    title: string, 
    rightElement?: JSX.Element,
    onPress?: () => void
  ) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <HStack 
        alignItems="center" 
        justifyContent="space-between" 
        py={3}
      >
        <HStack space={3} alignItems="center">
          <Icon as={Ionicons} name={icon} size={5} color="gray.600" />
          <Text>{title}</Text>
        </HStack>
        {rightElement || (
          <Icon as={Ionicons} name="chevron-forward" size={5} color="gray.400" />
        )}
      </HStack>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <Box p={4}>
          <Heading size="md" mb={4}>Settings</Heading>
          
          <VStack space={0} divider={<Divider />} mb={6}>
            <Box py={2}>
              <Heading size="sm" mb={2}>Preferences</Heading>
              {renderSettingItem(
                'moon-outline', 
                'Dark Mode', 
                <Switch 
                  isChecked={darkMode} 
                  onToggle={onToggleDarkMode} 
                  colorScheme="primary" 
                />
              )}
              {renderSettingItem(
                'notifications-outline', 
                'Notifications', 
                <Switch 
                  isChecked={notifications} 
                  onToggle={onToggleNotifications} 
                  colorScheme="primary" 
                />
              )}
              {renderSettingItem(
                'language-outline', 
                'Language', 
                <Text color="gray.500">{language}</Text>,
                onChangeLanguage
              )}
            </Box>
          </VStack>
          
          <VStack space={0} divider={<Divider />} mb={6}>
            <Box py={2}>
              <Heading size="sm" mb={2}>Account</Heading>
              {renderSettingItem('person-outline', 'Account Information', undefined, onNavigateToAccount)}
              {renderSettingItem('lock-closed-outline', 'Privacy & Security', undefined, onNavigateToPrivacy)}
            </Box>
          </VStack>
          
          <VStack space={0} divider={<Divider />} mb={6}>
            <Box py={2}>
              <Heading size="sm" mb={2}>Support</Heading>
              {renderSettingItem('help-circle-outline', 'Help & Support', undefined, onNavigateToHelp)}
              {renderSettingItem('information-circle-outline', 'About', undefined, onNavigateToAbout)}
            </Box>
          </VStack>
          
          <TouchableOpacity onPress={signOut}>
            <HStack 
              space={3} 
              alignItems="center" 
              py={3} 
              px={4} 
              bg="red.50" 
              borderRadius="md"
            >
              <Icon as={Ionicons} name="log-out-outline" size={5} color="red.500" />
              <Text color="red.500" fontWeight="medium">Sign Out</Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
