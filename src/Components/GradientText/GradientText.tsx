import React from "react";
import { Text, StyleSheet } from "react-native";
import { GradientTextProps } from "./GradientText.props";
import { COLORS } from "@/constants/theme";

export const GradientText = ({
  children,
  colors = [COLORS.primary, COLORS.secondary],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  ...props
}: GradientTextProps) => {
  // Since we can't use LinearGradient, we'll use a solid color instead
  // We'll use the first color in the colors array
  const textColor = colors[0];

  return (
    <Text style={[{ color: textColor }, style, styles.shadowText]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
