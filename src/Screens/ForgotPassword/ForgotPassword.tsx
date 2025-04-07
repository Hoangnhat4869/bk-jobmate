import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Input, Button, Typography } from "@/Components";

export const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    // Validate email
    if (!email || !email.includes("@")) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Giả lập thành công
      setSuccess(true);
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Typography variant="h2" style={styles.headerTitle}>
              Quên mật khẩu
            </Typography>
          </View>

          {success ? (
            <View style={styles.successContainer}>
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={COLORS.success}
              />
              <Typography variant="h3" style={styles.successTitle}>
                Yêu cầu đã được gửi!
              </Typography>
              <Typography
                variant="body1"
                color={COLORS.textSecondary}
                style={styles.successText}
              >
                Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến{" "}
                <Text style={{ fontWeight: "bold" }}>{email}</Text>. Vui lòng
                kiểm tra hộp thư của bạn.
              </Typography>
              <Button
                title="Quay lại đăng nhập"
                onPress={() => navigation.navigate(RootScreens.LOGIN)}
                style={styles.button}
                size="large"
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Typography
                variant="body1"
                color={COLORS.textSecondary}
                style={styles.description}
              >
                Nhập email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt
                lại mật khẩu.
              </Typography>

              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                }
                style={styles.input}
                inputStyle={styles.inputText}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Gửi yêu cầu"
                onPress={handleResetPassword}
                isLoading={isLoading}
                style={styles.button}
                size="large"
              />

              <TouchableOpacity
                onPress={() => navigation.navigate(RootScreens.LOGIN)}
                style={styles.backToLoginButton}
              >
                <Typography
                  variant="body2"
                  color={COLORS.primary}
                  style={styles.backToLoginText}
                >
                  Quay lại đăng nhập
                </Typography>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
  },
  description: {
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    marginBottom: 24,
    backgroundColor: "#F5F7FA",
  },
  inputText: {
    fontSize: 16,
    color: "#333333",
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#EF4444",
    textAlign: "center",
  },
  backToLoginButton: {
    alignItems: "center",
    marginTop: 16,
  },
  backToLoginText: {
    fontSize: 14,
    fontWeight: "500",
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  successText: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
});
