import { TextProps, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export interface TypographyProps extends TextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  italic?: boolean;
  underline?: boolean;
  lineHeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  style?: TextStyle;
  animated?: boolean;
  gradient?: boolean;
  gradientColors?: string[];
}
