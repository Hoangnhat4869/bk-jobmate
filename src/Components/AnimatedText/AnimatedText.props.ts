import { TextProps, TextStyle } from 'react-native';

export interface AnimatedTextProps extends TextProps {
  text: string;
  duration?: number;
  delay?: number;
  style?: TextStyle;
  animationType?: 'typewriter' | 'fadeIn' | 'slideIn' | 'bounce' | 'wave';
  color?: string;
  highlightColor?: string;
  highlightWords?: string[];
}
