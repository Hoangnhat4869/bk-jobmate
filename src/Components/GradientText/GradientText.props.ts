import { TextProps, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export interface GradientTextProps extends TextProps {
  children: ReactNode;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: TextStyle;
}
