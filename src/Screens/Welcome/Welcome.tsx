import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { Button, Typography, GradientText, AnimatedText } from "@/Components";
import { COLORS } from "@/constants/theme";
import { IMAGES } from "@/assets/images";

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.headerContainer}>
        <GradientText
          style={styles.headerTitle}
          colors={[COLORS.primary, "#8A2BE2"]}
        >
          BKJobmate
        </GradientText>

        <Typography
          variant="h3"
          style={styles.headerSubtitle}
          color={COLORS.textSecondary}
        >
          Nền tảng hỗ trợ tìm việc
        </Typography>

        <AnimatedText
          text="Kết nối sinh viên với nhà tuyển dụng"
          style={styles.headerDescription}
          highlightWords={["sinh viên", "nhà tuyển dụng"]}
          highlightColor={COLORS.primary}
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
          onPress={() => props.onNavigate(RootScreens.ONBOARDING)}
          style={[styles.button, styles.secondaryButton]}
          title="Khám phá ngay"
          variant="outline"
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
    backgroundColor: "transparent",
  },
});
