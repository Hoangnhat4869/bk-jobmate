import React from "react";
import { Text, StyleSheet } from "react-native";
import { TypographyProps } from "./Typography.props";
import { COLORS, FONTS } from "@/constants/theme";

export const Typography = ({
  children,
  variant = "body1",
  color,
  align,
  weight,
  italic,
  underline,
  lineHeight,
  letterSpacing,
  uppercase,
  lowercase,
  capitalize,
  style,
  animated = false,
  gradient = false,
  gradientColors = [COLORS.primary, COLORS.secondary],
  ...props
}: TypographyProps) => {
  const textStyles = [
    styles.base,
    styles[variant],
    color && { color },
    align && { textAlign: align },
    weight && { fontWeight: weight },
    italic && { fontStyle: "italic" },
    underline && { textDecorationLine: "underline" },
    lineHeight && { lineHeight },
    letterSpacing && { letterSpacing },
    uppercase && { textTransform: "uppercase" as const },
    lowercase && { textTransform: "lowercase" as const },
    capitalize && { textTransform: "capitalize" as const },
    style,
  ].filter(Boolean) as any;

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
  },
  h1: {
    fontSize: FONTS.sizes["3xl"],
    fontWeight: "bold",
    marginBottom: 16,
  },
  h2: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: "bold",
    marginBottom: 14,
  },
  h3: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    marginBottom: 12,
  },
  h4: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h5: {
    fontSize: FONTS.sizes.md,
    fontWeight: "bold",
    marginBottom: 8,
  },
  h6: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle1: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "500",
    marginBottom: 8,
  },
  subtitle2: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    marginBottom: 6,
  },
  body1: {
    fontSize: FONTS.sizes.md,
    marginBottom: 8,
  },
  body2: {
    fontSize: FONTS.sizes.sm,
    marginBottom: 6,
  },
  caption: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  button: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  overline: {
    fontSize: FONTS.sizes.xs,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
