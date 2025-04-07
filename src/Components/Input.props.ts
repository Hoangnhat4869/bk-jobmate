import { ReactNode } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the custom Input component
 */
export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Label text displayed above the input
   */
  label?: string;
  
  /**
   * Current value of the input
   */
  value?: string;
  
  /**
   * Callback function when text changes
   */
  onChangeText?: (text: string) => void;
  
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  
  /**
   * Whether the input should hide text (for passwords)
   */
  secureTextEntry?: boolean;
  
  /**
   * Icon component to display on the left side of the input
   */
  leftIcon?: ReactNode;
  
  /**
   * Error message to display below the input
   */
  error?: string;
  
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Additional styles for the input text
   */
  inputStyle?: StyleProp<TextStyle>;
  
  /**
   * Additional styles for the label text
   */
  labelStyle?: StyleProp<TextStyle>;
  
  /**
   * Additional styles for the error text
   */
  errorStyle?: StyleProp<TextStyle>;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Maximum length of input text
   */
  maxLength?: number;
  
  /**
   * Keyboard type (e.g., 'default', 'email-address', 'numeric')
   */
  keyboardType?: TextInputProps['keyboardType'];
  
  /**
   * Auto-capitalization behavior
   */
  autoCapitalize?: TextInputProps['autoCapitalize'];
  
  /**
   * Auto-correction behavior
   */
  autoCorrect?: boolean;
  
  /**
   * Whether to focus the input automatically
   */
  autoFocus?: boolean;
  
  /**
   * Return key type on the keyboard
   */
  returnKeyType?: TextInputProps['returnKeyType'];
  
  /**
   * Callback when the return key is pressed
   */
  onSubmitEditing?: () => void;
  
  /**
   * Reference to the TextInput component
   */
  ref?: any;
}

/**
 * Props for the NativeBase Input component
 */
export interface NativeBaseInputProps {
  /**
   * Current value of the input
   */
  value?: string;
  
  /**
   * Callback function when text changes
   */
  onChangeText?: (text: string) => void;
  
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  
  /**
   * Type of input ('text', 'password', etc.)
   */
  type?: string;
  
  /**
   * Whether the input is invalid
   */
  isInvalid?: boolean;
  
  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Whether the input is read-only
   */
  isReadOnly?: boolean;
  
  /**
   * Element to display on the left side of the input
   */
  leftElement?: ReactNode;
  
  /**
   * Element to display on the right side of the input
   */
  rightElement?: ReactNode;
  
  /**
   * Keyboard type (e.g., 'default', 'email-address', 'numeric')
   */
  keyboardType?: TextInputProps['keyboardType'];
  
  /**
   * Auto-capitalization behavior
   */
  autoCapitalize?: TextInputProps['autoCapitalize'];
  
  /**
   * Whether to focus the input automatically
   */
  autoFocus?: boolean;
  
  /**
   * Margin bottom (NativeBase specific)
   */
  mb?: number;
  
  /**
   * Flex value (NativeBase specific)
   */
  flex?: number;
  
  /**
   * Border radius (NativeBase specific)
   */
  borderRadius?: string | number;
  
  /**
   * Padding on Y axis (NativeBase specific)
   */
  py?: number;
  
  /**
   * Padding on X axis (NativeBase specific)
   */
  px?: number;
  
  /**
   * Font size (NativeBase specific)
   */
  fontSize?: number;
  
  /**
   * Element to display on the left side of the input (NativeBase specific)
   */
  InputLeftElement?: ReactNode;
  
  /**
   * Element to display on the right side of the input (NativeBase specific)
   */
  InputRightElement?: ReactNode;
}

/**
 * Props for a SearchInput component
 */
export interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  /**
   * Callback function when the search is submitted
   */
  onSearch?: (query: string) => void;
  
  /**
   * Callback function when the clear button is pressed
   */
  onClear?: () => void;
  
  /**
   * Whether to show a clear button
   */
  showClearButton?: boolean;
  
  /**
   * Size of the search icon
   */
  iconSize?: number;
  
  /**
   * Color of the search icon
   */
  iconColor?: string;
}

/**
 * Props for a TextArea component
 */
export interface TextAreaProps extends Omit<InputProps, 'secureTextEntry' | 'leftIcon'> {
  /**
   * Number of lines to display
   */
  numberOfLines?: number;
  
  /**
   * Minimum height of the text area
   */
  minHeight?: number | string;
  
  /**
   * Maximum height of the text area
   */
  maxHeight?: number | string;
  
  /**
   * Whether to auto-grow as content is added
   */
  autoGrow?: boolean;
}

/**
 * Props for a PhoneInput component
 */
export interface PhoneInputProps extends Omit<InputProps, 'keyboardType'> {
  /**
   * Country code (e.g., '+1', '+84')
   */
  countryCode?: string;
  
  /**
   * Callback when country code changes
   */
  onChangeCountryCode?: (code: string) => void;
  
  /**
   * List of available country codes
   */
  countryCodes?: string[];
  
  /**
   * Whether to show the country code selector
   */
  showCountryCodeSelector?: boolean;
}

/**
 * Props for a DateInput component
 */
export interface DateInputProps extends Omit<InputProps, 'keyboardType' | 'value' | 'onChangeText'> {
  /**
   * Selected date
   */
  date?: Date | null;
  
  /**
   * Callback when date changes
   */
  onDateChange?: (date: Date | null) => void;
  
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  
  /**
   * Date format to display (e.g., 'DD/MM/YYYY')
   */
  format?: string;
  
  /**
   * Whether to show the date picker
   */
  showPicker?: boolean;
  
  /**
   * Callback when the picker is opened
   */
  onPickerOpen?: () => void;
  
  /**
   * Callback when the picker is closed
   */
  onPickerClose?: () => void;
}

/**
 * Props for a PasswordInput component
 */
export interface PasswordInputProps extends Omit<InputProps, 'secureTextEntry'> {
  /**
   * Whether to show password strength indicator
   */
  showStrengthIndicator?: boolean;
  
  /**
   * Minimum required password strength (0-100)
   */
  minStrength?: number;
  
  /**
   * Callback when password strength changes
   */
  onStrengthChange?: (strength: number) => void;
}

/**
 * Props for an OTPInput component
 */
export interface OTPInputProps {
  /**
   * Number of digits in the OTP
   */
  length?: number;
  
  /**
   * Current OTP value
   */
  value?: string;
  
  /**
   * Callback when OTP changes
   */
  onChangeText?: (text: string) => void;
  
  /**
   * Callback when all digits are filled
   */
  onFilled?: (otp: string) => void;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Auto-focus the first input on mount
   */
  autoFocus?: boolean;
  
  /**
   * Whether to secure the input (show dots instead of numbers)
   */
  secure?: boolean;
  
  /**
   * Style for each digit cell
   */
  cellStyle?: StyleProp<ViewStyle>;
  
  /**
   * Style for the text in each cell
   */
  cellTextStyle?: StyleProp<TextStyle>;
  
  /**
   * Style for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Style for the error text
   */
  errorStyle?: StyleProp<TextStyle>;
}
