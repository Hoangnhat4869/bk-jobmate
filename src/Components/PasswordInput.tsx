import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { PasswordInputProps } from './Input.props';

export const PasswordInput = ({
  label,
  value = '',
  onChangeText,
  placeholder = 'Enter password',
  leftIcon,
  error,
  style = {},
  inputStyle,
  labelStyle,
  errorStyle,
  disabled = false,
  showStrengthIndicator = false,
  minStrength = 60,
  onStrengthChange,
  ...props
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (value && showStrengthIndicator) {
      const calculatedStrength = calculatePasswordStrength(value);
      setStrength(calculatedStrength);
      
      if (onStrengthChange) {
        onStrengthChange(calculatedStrength);
      }
    } else {
      setStrength(0);
      
      if (onStrengthChange) {
        onStrengthChange(0);
      }
    }
  }, [value, showStrengthIndicator, onStrengthChange]);

  const calculatePasswordStrength = (password: string): number => {
    // Basic password strength calculation
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 20;
    else if (password.length >= 6) score += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 20; // Has lowercase
    if (/[0-9]/.test(password)) score += 20; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    return Math.min(score, 100);
  };

  const getStrengthColor = () => {
    if (strength < 40) return COLORS.error;
    if (strength < 70) return COLORS.warning;
    return COLORS.success;
  };

  const getStrengthLabel = () => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
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
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          {...props}
        />

        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          disabled={disabled}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      {showStrengthIndicator && value && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBarContainer}>
            <View 
              style={[
                styles.strengthBar, 
                { width: `${strength}%`, backgroundColor: getStrengthColor() }
              ]} 
            />
          </View>
          <Text style={styles.strengthText}>
            {getStrengthLabel()} {strength < minStrength && '(Needs improvement)'}
          </Text>
        </View>
      )}

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
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    color: COLORS.text,
    fontSize: 16,
  },
  leftIcon: {
    paddingLeft: 12,
  },
  rightIcon: {
    paddingRight: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: COLORS.progressBackground,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
  },
  strengthText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
