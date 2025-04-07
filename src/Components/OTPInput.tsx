import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { OTPInputProps } from './Input.props';

export const OTPInput = ({
  length = 6,
  value = '',
  onChangeText,
  onFilled,
  disabled = false,
  autoFocus = true,
  secure = false,
  cellStyle,
  cellTextStyle,
  containerStyle,
  error,
  errorStyle,
}: OTPInputProps) => {
  const [localValue, setLocalValue] = useState(value.split('').slice(0, length));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  useEffect(() => {
    // Update local value when prop value changes
    setLocalValue(value.split('').slice(0, length));
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    const newValue = [...localValue];
    
    // Only accept single digits
    if (text.length > 0) {
      const lastChar = text.charAt(text.length - 1);
      newValue[index] = lastChar;
      setLocalValue(newValue);
      
      // Move to next input if available
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else {
      // Handle backspace
      newValue[index] = '';
      setLocalValue(newValue);
    }
    
    // Call onChangeText with the new combined value
    const combinedValue = newValue.join('');
    if (onChangeText) {
      onChangeText(combinedValue);
    }
    
    // Call onFilled if all cells are filled
    if (combinedValue.length === length && onFilled) {
      onFilled(combinedValue);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !localValue[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // When focusing on an input, if there are empty inputs before it,
    // focus on the first empty input instead
    for (let i = 0; i < index; i++) {
      if (!localValue[i]) {
        inputRefs.current[i]?.focus();
        return;
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.cellsContainer}>
        {Array(length).fill(0).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.cellContainer,
              localValue[index] ? styles.cellFilled : null,
              cellStyle,
            ]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.cell, cellTextStyle]}
              value={localValue[index] || ''}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry={secure}
              editable={!disabled}
              autoFocus={autoFocus && index === 0}
              selectTextOnFocus
            />
          </View>
        ))}
      </View>
      
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  cellsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cellContainer: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
  },
  cellFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  cell: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 8,
  },
});
