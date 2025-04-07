// src/components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";
import { ButtonProps } from "./Button.props";

export const Button = ({
  title,
  icon,
  iconPosition = "left",
  onPress,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style = {},
  textStyle = {},
  loadingColor,
  loadingSize = "small",
  loadingComponent,
  borderRadius = 8,
  ...props
}: ButtonProps) => {
  // Get button background color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case "secondary":
        return COLORS.secondary;
      case "outline":
      case "ghost":
        return "transparent";
      default:
        return COLORS.primary;
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    return variant === "outline" || variant === "ghost"
      ? COLORS.primary
      : COLORS.white;
  };

  // Get font size based on button size
  const getFontSize = () => {
    switch (size) {
      case "small":
        return 14;
      case "large":
        return 18;
      default:
        return 16;
    }
  };

  // Get padding based on button size
  const getPadding = () => {
    switch (size) {
      case "small":
        return 8;
      case "large":
        return 16;
      default:
        return 12;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius,
          padding: getPadding(),
          width: fullWidth ? "100%" : "auto",
          ...(variant === "outline" && {
            borderWidth: 1,
            borderColor: COLORS.primary,
          }),
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        loadingComponent || (
          <ActivityIndicator
            color={loadingColor || getTextColor()}
            size={loadingSize}
          />
        )
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{icon}</View>
          )}

          {title && (
            <Text
              style={[
                styles.text,
                {
                  color: getTextColor(),
                  fontSize: getFontSize(),
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
