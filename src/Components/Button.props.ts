import { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Button size types
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props for the Button component
 */
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Text content of the button
   */
  title?: string;
  
  /**
   * Icon to display in the button (optional)
   */
  icon?: ReactNode;
  
  /**
   * Position of the icon relative to the title
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Function to call when the button is pressed
   */
  onPress?: () => void;
  
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;
  
  /**
   * Size of the button
   */
  size?: ButtonSize;
  
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean;
  
  /**
   * Additional styles for the button container
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Additional styles for the button text
   */
  textStyle?: StyleProp<TextStyle>;
  
  /**
   * Color of the loading indicator
   */
  loadingColor?: string;
  
  /**
   * Size of the loading indicator
   */
  loadingSize?: 'small' | 'large';
  
  /**
   * Custom component to show when loading
   */
  loadingComponent?: ReactNode;
  
  /**
   * Border radius of the button
   */
  borderRadius?: number;
}
