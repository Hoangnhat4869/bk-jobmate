import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { TextAreaProps } from './Input.props';

export const TextArea = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  style = {},
  inputStyle,
  labelStyle,
  errorStyle,
  disabled = false,
  numberOfLines = 4,
  minHeight = 100,
  maxHeight,
  autoGrow = false,
  ...props
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [height, setHeight] = useState<number | undefined>(
    typeof minHeight === 'number' ? minHeight : undefined
  );

  const handleContentSizeChange = (event: any) => {
    if (autoGrow) {
      const contentHeight = event.nativeEvent.contentSize.height;
      const newHeight = Math.max(
        typeof minHeight === 'number' ? minHeight : 0,
        contentHeight
      );
      
      if (typeof maxHeight === 'number' && newHeight > maxHeight) {
        setHeight(maxHeight);
      } else {
        setHeight(newHeight);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { height: height },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          editable={!disabled}
          onContentSizeChange={autoGrow ? handleContentSizeChange : undefined}
          {...props}
        />
      </View>

      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.text,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    padding: 12,
    color: COLORS.text,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});
