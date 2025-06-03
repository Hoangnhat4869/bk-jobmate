import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Typography, Button } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useAuth } from "@/Context/AuthContext";

type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon as any} size={24} color={COLORS.text} />
      <View style={styles.settingText}>
        <Typography variant="subtitle1" style={styles.settingTitle}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color={COLORS.textSecondary}>
            {subtitle}
          </Typography>
        )}
      </View>
    </View>
    <View style={styles.settingRight}>
      {rightComponent}
      {showArrow && !rightComponent && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      )}
    </View>
  </TouchableOpacity>
);

export const Settings = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { signOut } = useAuth();

  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");

  const handleLanguagePress = () => {
    Alert.alert(
      "Ngôn ngữ",
      "Chọn ngôn ngữ hiển thị",
      [
        { text: "Tiếng Việt", onPress: () => setLanguage("Tiếng Việt") },
        { text: "English", onPress: () => setLanguage("English") },
        { text: "Hủy", style: "cancel" },
      ]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert("Quyền riêng tư & Bảo mật", "Tính năng đang được phát triển");
  };

  const handleSupportPress = () => {
    Alert.alert("Trung tâm hỗ trợ", "Tính năng đang được phát triển");
  };

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error("Logout failed:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>
          Cài đặt
        </Typography>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account & App Section */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Tài khoản & Ứng dụng
          </Typography>
          
          <SettingItem
            icon="notifications-outline"
            title="Thông báo"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.inputBackground, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
            showArrow={false}
          />
          
          <SettingItem
            icon="moon-outline"
            title="Chế độ tối"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.inputBackground, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
            showArrow={false}
          />
          
          <SettingItem
            icon="globe-outline"
            title="Ngôn ngữ"
            subtitle={language}
            onPress={handleLanguagePress}
          />
        </View>

        {/* Support & Security Section */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Hỗ trợ & Bảo mật
          </Typography>
          
          <SettingItem
            icon="shield-checkmark-outline"
            title="Quyền riêng tư & Bảo mật"
            onPress={handlePrivacyPress}
          />
          
          <SettingItem
            icon="help-circle-outline"
            title="Trung tâm hỗ trợ"
            onPress={handleSupportPress}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.version}>
            Phiên bản 1.0.0
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.copyright}>
            © 2025 BK Jobmate. All rights reserved.
          </Typography>
        </View>

        {/* Logout Button */}
        <Button
          title="Đăng xuất"
          variant="ghost"
          onPress={handleLogout}
          style={styles.logoutButton}
          icon={<Ionicons name="log-out-outline" size={20} color={COLORS.error} />}
          iconPosition="left"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBackground,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  appInfo: {
    alignItems: "center",
    marginVertical: SPACING.xl,
  },
  version: {
    marginBottom: SPACING.xs,
  },
  copyright: {
    textAlign: "center",
  },
  logoutButton: {
    marginBottom: SPACING.xl,
  },
});
