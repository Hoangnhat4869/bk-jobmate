import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, SPACING } from "@/constants/theme";

export const OnboardingPage1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Chào mừng đến với BKJobmate</Text>
        <Text style={styles.description}>
          Nơi giúp bạn chuẩn bị tốt nhất cho hành trình phỏng vấn xin việc
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
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl * 2,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
  contentContainer: {
    alignItems: "center",
    maxWidth: "90%",
  },
  title: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: "700" as const,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.md,
    lineHeight: 32,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
});
