import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/theme';
import { SVGIcon, IconName } from '../SVGIcon';

interface IconButtonProps {
  name: IconName;
  size?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color = COLORS.primary,
  backgroundColor = 'transparent',
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <SVGIcon name={name} size={size} color={disabled ? COLORS.textSecondary : color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
