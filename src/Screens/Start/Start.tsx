import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "@/Screens";
import { Button, Typography, GradientText, AnimatedText } from "@/Components";
import { COLORS } from "@/constants/theme";
import { IMAGES } from "@/assets/images";

export const Start = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.headerContainer}>
        <GradientText
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.headerTitle}
        >
          BK Jobmate
        </GradientText>
        <Typography variant="h4" style={styles.headerSubtitle}>
          Cổng thông tin việc làm
        </Typography>
        <AnimatedText
          text="Khám phá cơ hội nghề nghiệp và phát triển kỹ năng cùng BK Jobmate"
          style={styles.headerDescription}
          delay={500}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image source={IMAGES.LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.onNavigate(RootScreens.LOGIN)}
          style={styles.button}
          title="Đăng nhập"
        />
        <Button
          onPress={() => props.onNavigate(RootScreens.REGISTER)}
          style={[styles.button, styles.secondaryButton]}
          title="Đăng ký"
          variant="outline"
        />
        <Button
          onPress={() => props.onNavigate(RootScreens.MAIN)}
          style={[styles.button, styles.guestButton]}
          title="Khám phá với tư cách khách"
          variant="text"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    marginBottom: 15,
    textAlign: "center",
  },
  headerDescription: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    marginTop: 15,
    width: "100%",
  },
  secondaryButton: {
    borderColor: COLORS.primary,
  },
  guestButton: {
    marginTop: 10,
  },
});
