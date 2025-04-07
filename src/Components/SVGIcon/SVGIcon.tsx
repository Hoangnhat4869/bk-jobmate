import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

// Import all SVG icons
import * as SVGIcons from '@/assets/svgs';

export type IconName = keyof typeof SVGIcons;

interface SVGIconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

export const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  size = 24,
  color = COLORS.primary,
  style,
}) => {
  // Get the SVG component based on the name
  const IconComponent = SVGIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <IconComponent width={size} height={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
