import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { useAuth } from "@/Context/AuthContext";
import { Typography, Input, Button } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RootScreens.LOGIN
>;

export const SimpleLoginNoGoogle = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn, signUp, error, isLoading, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (e) {
      console.error("Auth error:", e);
    }
  };

  // Mock login for testing APK
  const handleMockLogin = async () => {
    try {
      const mockUser = {
        id: "mock-user-123",
        email: "test@bkjobmate.com",
        displayName: "Test User",
        photoURL: "",
        authMethod: "email" as const,
      };

      // Store mock user data
      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      
      // Navigate to main app
      navigation.replace(RootScreens.MAIN);
      
      Alert.alert("Thành công", "Đăng nhập thành công với tài khoản test!");
    } catch (error) {
      console.error("Mock login error:", error);
      Alert.alert("Lỗi", "Không thể đăng nhập với tài khoản test");
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    clearError();
    setName("");
  };

  const handleForgotPassword = () => {
    navigation.navigate(RootScreens.FORGOT_PASSWORD);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </Typography>
          <Typography variant="body" style={styles.subtitle}>
            {isSignUp 
              ? "Tạo tài khoản mới để bắt đầu" 
              : "Chào mừng bạn trở lại!"}
          </Typography>
        </View>

        <View style={styles.form}>
          {isSignUp && (
            <Input
              placeholder="Họ và tên"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          )}
          
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          
          <Input
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Button
            title={isSignUp ? "Đăng ký" : "Đăng nhập"}
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.submitButton}
          />

          {!isSignUp && (
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>HOẶC</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Mock Login Button for Testing */}
        <TouchableOpacity
          style={styles.mockButton}
          onPress={handleMockLogin}
        >
          <Text style={styles.mockButtonText}>
            🧪 Đăng nhập Test (Không cần Google)
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isSignUp ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.footerLink}>
              {isSignUp ? "Đăng nhập" : "Đăng ký ngay"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  submitButton: {
    marginBottom: SPACING.md,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginHorizontal: SPACING.md,
  },
  mockButton: {
    backgroundColor: COLORS.warning,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  mockButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
  },
});
