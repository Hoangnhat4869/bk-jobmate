import React, { useState } from 'react';
import { Settings } from './Settings';
import { useNavigation } from '@react-navigation/native';
import { SettingsScreenNavigationProp } from '@/Types/navigation';

export const SettingsContainer = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleToggleDarkMode = (value: boolean) => {
    setDarkMode(value);
    // Implement theme change logic here
  };

  const handleToggleNotifications = (value: boolean) => {
    setNotifications(value);
    // Implement notifications toggle logic here
  };

  const handleChangeLanguage = () => {
    // Open language selection modal or navigate to language screen
    console.log('Open language selection');
  };

  const handleNavigateToAccount = () => {
    // Navigate to account screen
    console.log('Navigate to account screen');
  };

  const handleNavigateToPrivacy = () => {
    // Navigate to privacy screen
    console.log('Navigate to privacy screen');
  };

  const handleNavigateToHelp = () => {
    // Navigate to help screen
    console.log('Navigate to help screen');
  };

  const handleNavigateToAbout = () => {
    // Navigate to about screen
    console.log('Navigate to about screen');
  };

  return (
    <Settings 
      darkMode={darkMode}
      notifications={notifications}
      language={language}
      onToggleDarkMode={handleToggleDarkMode}
      onToggleNotifications={handleToggleNotifications}
      onChangeLanguage={handleChangeLanguage}
      onNavigateToAccount={handleNavigateToAccount}
      onNavigateToPrivacy={handleNavigateToPrivacy}
      onNavigateToHelp={handleNavigateToHelp}
      onNavigateToAbout={handleNavigateToAbout}
    />
  );
};
