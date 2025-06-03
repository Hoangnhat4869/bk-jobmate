import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button, Card, Avatar, Typography } from "@/Components";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "..";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/Context/UserContext";
import { useAuth } from "@/Context/AuthContext";

export const Profile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [refreshKey, setRefreshKey] = useState(0);
  const { userProfile, isLoading, error, fetchUserProfile } = useUser();
  const { signOut, user } = useAuth(); // Get user from AuthContext for Google info

  // Sử dụng useEffect để hỗ trợ Fast Refresh và fetch dữ liệu
  useEffect(() => {
    // Fetch dữ liệu người dùng khi component mount hoặc refreshKey thay đổi
    fetchUserProfile();
    console.log("Profile component rendered");

    return () => {
      // Cleanup khi component unmount
      console.log("Profile component will unmount");
    };
  }, [refreshKey]); // Removed fetchUserProfile from dependencies

  const onLogout = async () => {
    try {
      await signOut();
      navigation.navigate(RootScreens.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Typography variant="body1" style={{ marginTop: 16 }}>
          Đang tải thông tin...
        </Typography>
      </SafeAreaView>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h3" color={COLORS.error}>
          Đã xảy ra lỗi
        </Typography>
        <Typography variant="body1" style={{ marginTop: 8 }}>
          {error}
        </Typography>
        <Button
          title="Thử lại"
          onPress={() => fetchUserProfile()}
          style={{ marginTop: 16 }}
        />
      </SafeAreaView>
    );
  }

  // Hiển thị thông báo nếu không có dữ liệu
  if (!userProfile) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h3">
          Không tìm thấy thông tin người dùng
        </Typography>
        <Button
          title="Thử lại"
          onPress={() => fetchUserProfile()}
          style={{ marginTop: 16 }}
        />
      </SafeAreaView>
    );
  }

  console.log("Profile userProfile:", userProfile);
  console.log("Auth user:", user);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container}>
        {/* Header với avatar và thông tin cơ bản */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              size={80}
              source={
                userProfile.avatar ? { uri: userProfile.avatar } : undefined
              }
              placeholderColor="#F97316"
              name={userProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              showStatus
              isOnline={userProfile.isOnline}
            />
            <View style={styles.profileInfo}>
              <Typography variant="h2" style={styles.profileName}>
                {userProfile.name}
              </Typography>
              <Typography variant="body2" color={COLORS.textSecondary}>
                {userProfile.title}
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                {userProfile.email}
              </Typography>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Chỉnh sửa"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate(RootScreens.EDIT_PROFILE)}
              style={styles.editButton}
              icon={
                <Ionicons
                  name="pencil-outline"
                  size={16}
                  color={COLORS.primary}
                />
              }
              iconPosition="left"
            />
            <Button
              title="Cài đặt"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate(RootScreens.SETTINGS)}
              style={styles.settingsButton}
              icon={
                <Ionicons
                  name="settings-outline"
                  size={16}
                  color={COLORS.primary}
                />
              }
              iconPosition="left"
            />
          </View>
        </Card>

        {/* Giới thiệu bản thân */}
        <Card style={styles.sectionCard}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Giới thiệu bản thân
          </Typography>
          <Typography variant="body1" style={styles.sectionContent}>
            {userProfile.bio}
          </Typography>
        </Card>

        {/* Kinh nghiệm */}
        {userProfile.experiences.length > 0 && (
          <Card style={styles.sectionCard}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Kinh nghiệm
            </Typography>
            {userProfile.experiences.map((experience) => (
              <View key={experience.id} style={styles.experienceItem}>
                <Typography variant="subtitle1" style={styles.experienceTitle}>
                  {experience.title} - {experience.company}
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  {experience.startDate} - {experience.endDate || "Hiện tại"}
                </Typography>
                <Typography variant="body2" style={styles.sectionContent}>
                  {experience.description}
                </Typography>
              </View>
            ))}
          </Card>
        )}

        {/* Kỹ năng */}
        {userProfile.skills.length > 0 && (
          <Card style={styles.sectionCard}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Kỹ năng
            </Typography>
            <View style={styles.skillsContainer}>
              {userProfile.skills.map((skill) => (
                <View key={skill.id} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Nút đăng xuất */}
        <Button
          title="Đăng xuất"
          variant="ghost"
          size="medium"
          onPress={onLogout}
          style={styles.logoutButton}
          icon={
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          }
          iconPosition="left"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
    padding: 16,
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  profileInfo: {
    marginTop: 12,
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
  },
  settingsButton: {
    flex: 1,
    marginLeft: 8,
  },
  sectionCard: {
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionContent: {
    marginBottom: 8,
    lineHeight: 20,
  },
  experienceItem: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: "#F5F7FA",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  skillText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});
