import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "@/constants/theme";

export const OnboardingPage4 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("src/assets/images/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Kết nối với nhà tuyển dụng</Text>
        <Text style={styles.description}>
          Trải nghiệm môi trường phỏng vấn thực tế và nhận được phản hồi trực
          tiếp
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#E6F2F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  image: {
    width: "80%",
    height: "80%",
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
