import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "@/constants/theme";

export const OnboardingPage5 = () => {
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
        <Text style={styles.title}>Đề xuất lộ trình</Text>
        <Text style={styles.description}>
          Đề xuất lộ trình cá nhân hóa thông qua mục tiêu
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
    backgroundColor: "#F5F5F5",
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
    color: COLORS.text,
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
