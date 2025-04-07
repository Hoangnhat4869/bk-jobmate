import { ImageSourcePropType } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType;
  
  /**
   * Size of the avatar (width and height)
   */
  size?: number;
  
  /**
   * Name to generate initials from when no image is provided
   */
  name?: string;
  
  /**
   * Whether to show online/offline status indicator
   */
  showStatus?: boolean;
  
  /**
   * Whether the user is online
   */
  isOnline?: boolean;
  
  /**
   * Additional styles for the avatar container
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Background color for the placeholder (when no image is provided)
   */
  placeholderColor?: string;
  
  /**
   * Text color for the initials
   */
  initialsColor?: string;
  
  /**
   * Border width for the avatar
   */
  borderWidth?: number;
  
  /**
   * Border color for the avatar
   */
  borderColor?: string;
  
  /**
   * Color for the online status indicator
   */
  onlineColor?: string;
  
  /**
   * Color for the offline status indicator
   */
  offlineColor?: string;
  
  /**
   * Function to call when the avatar is pressed
   */
  onPress?: () => void;
}
