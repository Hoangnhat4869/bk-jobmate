// src/components/Avatar.tsx
import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/theme";
import { AvatarProps } from "./Avatar.props";

export const Avatar = ({
  source,
  size = 40,
  name,
  showStatus = false,
  isOnline = false,
  style = {},
  placeholderColor = COLORS.primary,
  initialsColor = COLORS.white,
  borderWidth,
  borderColor,
  onlineColor = COLORS.success,
  offlineColor = COLORS.gray,
  onPress,
}: AvatarProps) => {
  // Generate initials from name
  const getInitials = () => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return onPress ? (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: placeholderColor,
              ...(borderWidth && {
                borderWidth,
                borderColor: borderColor || COLORS.white,
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              { fontSize: size * 0.4, color: initialsColor },
            ]}
          >
            {getInitials()}
          </Text>
        </View>
      )}

      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: isOnline ? onlineColor : offlineColor,
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
              borderWidth: size * 0.05,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, style]}>
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: placeholderColor,
              ...(borderWidth && {
                borderWidth,
                borderColor: borderColor || COLORS.white,
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              { fontSize: size * 0.4, color: initialsColor },
            ]}
          >
            {getInitials()}
          </Text>
        </View>
      )}

      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: isOnline ? onlineColor : offlineColor,
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
              borderWidth: size * 0.05,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    backgroundColor: COLORS.gray,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontWeight: "bold",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderColor: COLORS.white,
  },
});
