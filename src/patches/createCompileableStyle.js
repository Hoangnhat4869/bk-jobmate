// Polyfill for react-native-web/dist/exports/StyleSheet/createCompileableStyle
// This file is used to fix the error: Unable to resolve "react-native-web/dist/exports/StyleSheet/createCompileableStyle"

// Simple implementation that just returns the style unchanged
export default function createCompileableStyle(style) {
  return style;
}

// Export an empty compiler object to satisfy any imports
export const compiler = {
  compile: (style) => style,
};
