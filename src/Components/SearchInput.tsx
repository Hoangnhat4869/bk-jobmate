import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { SearchInputProps } from './Input.props';

export const SearchInput = ({
  value = '',
  onChangeText,
  placeholder = 'Search...',
  onSearch,
  onClear,
  showClearButton = true,
  iconSize = 20,
  iconColor = COLORS.gray,
  style = {},
  inputStyle,
  disabled = false,
  ...props
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (onSearch && value) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputFocused : null,
        ]}
      >
        <Ionicons
          name="search-outline"
          size={iconSize}
          color={iconColor}
          style={styles.searchIcon}
        />

        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          editable={!disabled}
          {...props}
        />

        {showClearButton && value !== '' && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            disabled={disabled}
          >
            <Ionicons
              name="close-circle"
              size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  searchIcon: {
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: COLORS.text,
    fontSize: 16,
  },
  clearButton: {
    paddingRight: 12,
  },
});
