import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Input, Button, Typography, Avatar } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { useUser } from "@/Context/UserContext";

type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EditProfile = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { userProfile, updateUserProfile } = useUser();

  // Form states
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with current user data
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setTitle(userProfile.title || "");
      setBio(userProfile.bio || "");
      setExperience(
        userProfile.experiences
          ?.map((exp) => `${exp.title} - ${exp.company}`)
          .join(", ") || ""
      );
      setSkills(
        userProfile.skills?.map((skill) => skill.name).join(", ") || ""
      );
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập họ và tên");
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically call an API to update the profile
      // For now, we'll just show a success message
      Alert.alert("Thành công", "Hồ sơ đã được cập nhật", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật hồ sơ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
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
          Chỉnh sửa hồ sơ
        </Typography>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Avatar
            size={100}
            source={
              userProfile?.avatar ? { uri: userProfile.avatar } : undefined
            }
            placeholderColor="#F97316"
            name={name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="pencil" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Typography variant="subtitle1" style={styles.fieldLabel}>
            Họ và tên
          </Typography>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ và tên"
            style={styles.input}
          />

          <Typography variant="subtitle1" style={styles.fieldLabel}>
            Vai trò / Chức danh
          </Typography>
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="Ví dụ: Fresher Software Engineer"
            style={styles.input}
          />

          <Typography variant="subtitle1" style={styles.fieldLabel}>
            Giới thiệu bản thân
          </Typography>
          <Input
            value={bio}
            onChangeText={setBio}
            placeholder="Viết giới thiệu về bản thân..."
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />

          <Typography variant="subtitle1" style={styles.fieldLabel}>
            Kinh nghiệm
          </Typography>
          <Input
            value={experience}
            onChangeText={setExperience}
            placeholder="Mô tả kinh nghiệm làm việc..."
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />

          <Typography variant="subtitle1" style={styles.fieldLabel}>
            Kỹ năng (phân cách bằng dấu phẩy)
          </Typography>
          <Input
            value={skills}
            onChangeText={setSkills}
            placeholder="C++, Python, Github, Machine Learning..."
            style={styles.input}
          />
        </View>

        {/* Save Button */}
        <Button
          title="Lưu thay đổi"
          onPress={handleSave}
          isLoading={isLoading}
          style={styles.saveButton}
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
  avatarSection: {
    alignItems: "center",
    marginVertical: SPACING.xl,
    position: "relative",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  formSection: {
    marginBottom: SPACING.xl,
  },
  fieldLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  input: {
    marginBottom: SPACING.sm,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    marginBottom: SPACING.xl,
  },
});
