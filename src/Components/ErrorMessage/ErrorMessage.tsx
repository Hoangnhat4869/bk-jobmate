import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (message) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [message, fadeAnim, slideAnim]);

  if (!message) return null;

  const containerStyle = [styles.container, styles[variant], style];

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        {showIcon && (
          <Ionicons
            name="alert-circle"
            size={18}
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inline: {
    marginVertical: 8,
  },
  banner: {
    borderRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
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
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: "#FEF2F2",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 20,
    fontWeight: "500",
  },
  dismissButton: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 4,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
});
