import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Card, ProgressBar } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/Services";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = () => {
  // Mock data for CS courses
  const courses = [
    {
      id: "1",
      title: "Introduction to Chrome Enterprise",
      progress: 0.8,
      lessons: 20,
      completedLessons: 16,
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      title: "Derive Insights from BigQuery Data",
      progress: 0.43,
      lessons: 15,
      completedLessons: 6,
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      title: "Implementing Canary Releases of TensorFlow",
      progress: 0.58,
      lessons: 12,
      completedLessons: 7,
      image: "https://via.placeholder.com/100",
    },
  ];

  // Overall progress calculation
  const totalCourses = 7;
  const completedCourses = 2;
  const overallProgress = (completedCourses / totalCourses) * 100;

  // Loading state removed for simplicity

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>BKJobmate</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      {/* Main Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationPlaceholder}>
          <Ionicons name="school-outline" size={80} color={COLORS.primary} />
          <Text style={styles.illustrationText}>Học tập thông minh</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>TỔNG HOÀN THÀNH KHÓA HỌC</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedCourses} trên {totalCourses}
          </Text>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercentage}>
              {Math.round(overallProgress)}%
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Các lộ trình của tôi</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {courses.map((course) => (
        <Card key={course.id} style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseProgress}>
                Đã hoàn thành {Math.round(course.progress * 100)}%
              </Text>
              <ProgressBar
                progress={course.progress}
                height={8}
                style={styles.courseProgressBar}
              />
            </View>
            <TouchableOpacity style={styles.courseArrow}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: SPACING.xs,
  },
  appName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  illustration: {
    width: 300,
    height: 200,
  },
  illustrationPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary + "10",
    borderRadius: 20,
    padding: SPACING.xl,
    width: 300,
    height: 200,
  },
  illustrationText: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  progressSection: {
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  progressTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  progressText: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: SPACING.md,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  progressPercentage: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  detailButton: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  detailButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: "500",
  },
  statsCard: {
    marginHorizontal: SPACING.md,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.sm,
  },
  statValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },
  courseCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  courseProgress: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  courseProgressBar: {
    marginTop: SPACING.xs,
  },
  courseArrow: {
    padding: SPACING.xs,
  },
});
