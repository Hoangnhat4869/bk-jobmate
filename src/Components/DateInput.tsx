import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { DateInputProps } from './Input.props';

export const DateInput = ({
  label,
  date,
  onDateChange,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  minDate,
  maxDate,
  error,
  style = {},
  inputStyle,
  labelStyle,
  errorStyle,
  disabled = false,
  showPicker: showPickerProp = false,
  onPickerOpen,
  onPickerClose,
  ...props
}: DateInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(showPickerProp);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    if (format === 'MM/DD/YYYY') {
      return `${month}/${day}/${year}`;
    } else if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    } else if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`;
    }
    
    return `${month}/${day}/${year}`;
  };

  const handlePress = () => {
    if (disabled) return;
    
    setShowPicker(true);
    if (onPickerOpen) {
      onPickerOpen();
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (onPickerClose) {
        onPickerClose();
      }
    }
    
    if (selectedDate) {
      if (onDateChange) {
        onDateChange(selectedDate);
      }
    }
  };

  const handleCloseIOS = () => {
    setShowPicker(false);
    if (onPickerClose) {
      onPickerClose();
    }
  };

  // Note: This is a placeholder for the DateTimePicker component
  // In a real implementation, you would import DateTimePicker from '@react-native-community/datetimepicker'
  const DateTimePicker = ({ visible, value, onChange, minimumDate, maximumDate }: any) => {
    // This is just a placeholder component
    // In a real implementation, you would return the actual DateTimePicker component
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={handleCloseIOS}>
              <Text style={styles.pickerDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContent}>
            <Text>Date Picker Placeholder</Text>
            <Text>You need to install @react-native-community/datetimepicker</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        disabled={disabled}
      >
        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : null,
            error ? styles.inputError : null,
          ]}
        >
          <TextInput
            style={[styles.input, inputStyle]}
            value={formatDate(date)}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholder}
            onFocus={() => {
              setIsFocused(true);
              handlePress();
            }}
            onBlur={() => setIsFocused(false)}
            editable={false}
            pointerEvents="none"
            {...props}
          />

          <View style={styles.rightIcon}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.text}
            />
          </View>
        </View>
      </TouchableOpacity>

      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}

      {showPicker && (
        <DateTimePicker
          visible={showPicker}
          value={date || new Date()}
          onChange={handleDateChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}
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
  rightIcon: {
    paddingRight: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerHeader: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    alignItems: 'flex-end',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pickerDoneText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    height: 250,
  },
});
