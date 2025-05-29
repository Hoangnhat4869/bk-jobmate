import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/Context/AuthContext";
import { useAuthNavigation } from "@/Hooks";
import { COLORS } from "@/constants/theme";
import { RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Input, Button, Typography, ErrorMessage } from "@/Components";
import { Logo } from "@/assets/svgs";

export const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signUp, isLoading, error, isAuthenticated } = useAuth();
  const { navigateToLogin, navigateToMain, handleClearError } =
    useAuthNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Navigate to main when authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigateToMain();
    }
  }, [isAuthenticated, navigateToMain]);

  // Clear errors when user starts typing
  useEffect(() => {
    if (name || email || password || confirmPassword) {
      setValidationError("");
      handleClearError();
    }
  }, [name, email, password, confirmPassword, handleClearError]);

  const validateForm = () => {
    if (!name) {
      setValidationError("Vui lòng nhập họ tên");
      return false;
    }
    if (!email || !email.includes("@")) {
      setValidationError("Vui lòng nhập email hợp lệ");
      return false;
    }
    if (!password || password.length < 6) {
      setValidationError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setValidationError("");
    await signUp(email, password, name);
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
          </View>

          {/* Logo và tiêu đề */}
          <View style={styles.logoContainer}>
            <Logo width={80} height={80} />
          </View>

          <View style={styles.headerContainer}>
            <Typography variant="h1" style={styles.headerTitle}>
              Đăng ký tài khoản
            </Typography>
            <Typography variant="subtitle1" color={COLORS.textSecondary}>
              Tạo tài khoản BKJobmate mới
            </Typography>
          </View>

          {/* Form đăng ký */}
          <View style={styles.formContainer}>
            <Input
              placeholder="Họ tên"
              value={name}
              onChangeText={setName}
              leftIcon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                />
              }
              style={styles.input}
              inputStyle={styles.inputText}
            />

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
              secureTextEntry={!showPassword}
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

            <Input
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
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
              title="Đăng ký"
              onPress={handleRegister}
              isLoading={isLoading}
              style={styles.registerButton}
              size="large"
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.loginLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#F5F7FA",
  },
  inputText: {
    fontSize: 16,
    color: "#333333",
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#EF4444",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
