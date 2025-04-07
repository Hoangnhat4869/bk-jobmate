import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { AnimatedTextProps } from "./AnimatedText.props";
import { COLORS, FONTS } from "@/constants/theme";

export const AnimatedText = ({
  text,
  duration = 1000,
  delay = 0,
  style,
  animationType = "fadeIn",
  color = COLORS.text,
  highlightColor = COLORS.primary,
  highlightWords = [],
  ...props
}: AnimatedTextProps) => {
  // Highlight specific words
  const renderHighlightedText = () => {
    if (highlightWords.length === 0) return text;

    const parts = text.split(" ");
    return parts.map((part, index) => {
      const isHighlighted = highlightWords.includes(part);
      return (
        <Text
          key={index}
          style={{
            color: isHighlighted ? highlightColor : color,
            fontWeight: isHighlighted ? "bold" : "normal",
          }}
        >
          {part}
          {index < parts.length - 1 ? " " : ""}
        </Text>
      );
    });
  };

  return (
    <Text style={[styles.text, { color }, style]} {...props}>
      {highlightWords.length > 0 ? renderHighlightedText() : text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONTS.sizes.md,
  },
});
