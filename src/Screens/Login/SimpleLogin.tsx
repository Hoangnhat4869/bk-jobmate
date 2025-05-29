import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/Context/AuthContext";
import { useAuthNavigation } from "@/Hooks";
import { COLORS } from "@/constants/theme";
import { RootScreens } from "..";
import { Input, Button, Typography, ErrorMessage } from "@/Components";
import { Logo } from "@/assets/svgs";

export const SimpleLogin = () => {
  const { signIn, signInWithGoogle, isLoading, error, isAuthenticated } =
    useAuth();
  const { navigateToRegister, navigateToMain, handleClearError } =
    useAuthNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  // Navigate to main when authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigateToMain();
    }
  }, [isAuthenticated, navigateToMain]);

  // Clear errors when component unmounts or user starts typing
  useEffect(() => {
    if (email || password) {
      setValidationError("");
      handleClearError();
    }
  }, [email, password, handleClearError]);

  const handleLogin = async () => {
    if (!email || !password) {
      setValidationError("Email và mật khẩu không được để trống");
      return;
    }

    setValidationError("");
    await signIn(email, password);
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Logo và tiêu đề */}
          <View style={styles.logoContainer}>
            <Logo width={200} height={200} />
          </View>
          <View style={styles.headerContainer}>
            <Typography variant="h1" style={styles.headerTitle}>
              Chào mừng trở lại
            </Typography>
            <Typography variant="subtitle1" color={COLORS.textSecondary}>
              BKJobmate
            </Typography>
          </View>

          {/* Form đăng nhập */}
          <View style={styles.formContainer}>
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
            <Input
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                />
              }
              style={styles.input}
              inputStyle={styles.inputText}
            />

            {(validationError || error) && (
              <ErrorMessage
                message={validationError || error}
                onDismiss={handleClearError}
              />
            )}

            <Button
              title="Đăng nhập"
              onPress={handleLogin}
              isLoading={isLoading}
              style={styles.loginButton}
              size="large"
            />

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => {
                  /* TODO: Navigate to forgot password */
                }}
              >
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>hoặc</Text>
              <View style={styles.divider} />
            </View>

            <Button
              title="Đăng nhập với Google"
              onPress={handleGoogleLogin}
              variant="outline"
              style={styles.googleButton}
              size="large"
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.registerText}>Developed by: Nhat Truong</Text>
          </View>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    marginBottom: 24,
    backgroundColor: "#F5F7FA",
  },
  inputText: {
    fontSize: 16,
    color: "#333333",
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  registerText: {
    fontSize: 14,
    color: "#333",
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#6B7280",
  },
  googleButton: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#EF4444",
    textAlign: "center",
  },
});
