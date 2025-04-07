import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps {
  /**
   * Progress value (0-100)
   */
  progress?: number;
  
  /**
   * Height of the progress bar
   */
  height?: number;
  
  /**
   * Background color of the progress bar
   */
  backgroundColor?: string;
  
  /**
   * Color of the progress fill
   */
  progressColor?: string;
  
  /**
   * Whether to show the percentage text
   */
  showPercentage?: boolean;
  
  /**
   * Additional styles for the progress bar container
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Additional styles for the percentage text
   */
  textStyle?: StyleProp<TextStyle>;
  
  /**
   * Format for the percentage text
   */
  percentageFormat?: (value: number) => string;
  
  /**
   * Border radius of the progress bar
   */
  borderRadius?: number;
  
  /**
   * Whether to animate the progress change
   */
  animated?: boolean;
  
  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;
  
  /**
   * Whether the progress bar is indeterminate (shows a loading animation)
   */
  indeterminate?: boolean;
}
