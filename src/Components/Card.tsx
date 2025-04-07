// src/components/Card.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { CardProps } from "./Card.props";

export const Card = ({
  children,
  style = {},
  elevation,
  bordered = false,
  borderRadius = 12,
  backgroundColor = COLORS.cardBackground,
  padding = 16,
  marginBottom = 16,
  ...props
}: CardProps) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderRadius,
          backgroundColor,
          padding,
          marginBottom,
          ...(elevation !== undefined && { elevation }),
          ...(bordered && { borderWidth: 1, borderColor: COLORS.border }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
});
