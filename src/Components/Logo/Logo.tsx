import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '@/constants/theme';

interface LogoProps {
  size?: number;
  color?: string;
}

export const Logo = ({ size = 100, color = COLORS.primary }: LogoProps) => {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    text: {
      color: '#FFFFFF',
      fontSize: size * 0.4,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BK</Text>
    </View>
  );
};
