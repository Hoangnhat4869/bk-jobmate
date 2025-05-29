import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface ErrorMessageProps {
  message?: string | null;
  onDismiss?: () => void;
  style?: any;
  variant?: "inline" | "banner" | "toast";
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  style,
  variant = "inline",
  showIcon = true,
}) => {
  if (!message) return null;

  const containerStyle = [styles.container, styles[variant], style];

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {showIcon && (
          <Ionicons
            name="alert-circle"
            size={16}
            color={COLORS.error || "#EF4444"}
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Ionicons name="close" size={16} color={COLORS.error || "#EF4444"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  inline: {
    marginVertical: 8,
  },
  banner: {
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toast: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 20,
  },
  dismissButton: {
    marginLeft: 8,
    padding: 4,
  },
});
