// src/components/ProgressBar.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../constants/theme";
import { ProgressBarProps } from "./ProgressBar.props";

export const ProgressBar = ({
  progress = 0,
  height = 8,
  backgroundColor = COLORS.progressBackground,
  progressColor = COLORS.primary,
  showPercentage = true,
  style = {},
  textStyle,
  percentageFormat,
  borderRadius = 4,
  animated = false,
  animationDuration = 300,
  indeterminate = false,
}: ProgressBarProps) => {
  // Animation value for progress width
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animation value for indeterminate animation
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(progress);
    }
  }, [progress, animated, animationDuration, progressAnim]);

  useEffect(() => {
    if (indeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      indeterminateAnim.setValue(0);
    }
  }, [indeterminate, indeterminateAnim]);

  // Format the percentage text
  const formatPercentage = () => {
    if (percentageFormat) {
      return percentageFormat(progress);
    }
    return `${Math.round(progress)}%`;
  };

  // Calculate the width of the progress bar
  const progressWidth = indeterminate
    ? indeterminateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["0%", "50%", "100%"],
      })
    : animated
    ? progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
      })
    : `${progress}%`;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.progressBackground,
          {
            height,
            backgroundColor,
            borderRadius,
          },
        ]}
      >
        {" "}
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressWidth as any,
              height,
              backgroundColor: progressColor,
              borderRadius,
            },
          ]}
        />
      </View>

      {showPercentage && (
        <Text style={[styles.percentage, textStyle]}>{formatPercentage()}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBackground: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 4,
  },
  percentage: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
});
