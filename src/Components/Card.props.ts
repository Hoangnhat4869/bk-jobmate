import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

/**
 * Props for the Card component
 */
export interface CardProps extends Omit<ViewProps, 'style'> {
  /**
   * Content to be rendered inside the card
   */
  children: ReactNode;
  
  /**
   * Additional styles for the card container
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Elevation/shadow intensity (Android)
   */
  elevation?: number;
  
  /**
   * Whether the card has a border
   */
  bordered?: boolean;
  
  /**
   * Border radius of the card
   */
  borderRadius?: number;
  
  /**
   * Background color of the card
   */
  backgroundColor?: string;
  
  /**
   * Padding inside the card
   */
  padding?: number;
  
  /**
   * Margin at the bottom of the card
   */
  marginBottom?: number;
}
