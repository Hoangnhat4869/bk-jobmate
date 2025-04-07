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
import { Card, ProgressBar, Avatar } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/Context/AuthContext";
import { User } from "@/Services";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const { user } = useAuth();

  // Mock data for courses
  const courses = [
    {
      id: "1",
      title: "Tiếng Anh cơ bản",
      progress: 0.65,
      lessons: 20,
      completedLessons: 13,
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      title: "Tiếng Anh giao tiếp",
      progress: 0.3,
      lessons: 15,
      completedLessons: 5,
      image: "https://via.placeholder.com/100",
    },
  ];

  // Mock data for upcoming lessons
  const upcomingLessons = [
    {
      id: "1",
      title: "Ngữ pháp thì hiện tại",
      time: "10:00 - 11:30",
      date: "Hôm nay",
    },
    {
      id: "2",
      title: "Từ vựng chủ đề du lịch",
      time: "14:00 - 15:30",
      date: "Ngày mai",
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="auto" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.userName}>{user?.displayName || "Học viên"}</Text>
        </View>
        <Avatar
          size={50}
          name={user?.displayName || "User"}
          source={user?.photoURL ? { uri: user.photoURL } : undefined}
          borderWidth={2}
          borderColor={COLORS.white}
        />
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>65%</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Bài học</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Ngày học</Text>
          </View>
        </View>
      </Card>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Khóa học của tôi</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {courses.map((course) => (
        <Card key={course.id} style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseProgress}>
                {course.completedLessons}/{course.lessons} bài học
              </Text>
              <ProgressBar
                progress={course.progress}
                height={8}
                style={styles.courseProgressBar}
              />
            </View>
          </View>
          <View style={styles.courseActions}>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Tiếp tục học</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bài học sắp tới</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Lịch học</Text>
        </TouchableOpacity>
      </View>

      {upcomingLessons.map((lesson) => (
        <Card key={lesson.id} style={styles.lessonCard}>
          <View style={styles.lessonInfo}>
            <View style={styles.lessonTimeContainer}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.lessonTime}>{lesson.time}</Text>
            </View>
            <Text style={styles.lessonDate}>{lesson.date}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Tham gia</Text>
          </TouchableOpacity>
        </Card>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Thành tích</Text>
      </View>

      <Card style={[styles.achievementsCard, styles.lastCard]}>
        <View style={styles.achievementItem}>
          <View style={styles.achievementIconContainer}>
            <Ionicons name="trophy" size={24} color={COLORS.white} />
          </View>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Học 7 ngày liên tiếp</Text>
            <ProgressBar
              progress={0.7}
              height={6}
              style={styles.achievementProgress}
            />
            <Text style={styles.achievementSubtitle}>5/7 ngày</Text>
          </View>
        </View>

        <View style={styles.achievementItem}>
          <View
            style={[
              styles.achievementIconContainer,
              { backgroundColor: COLORS.success },
            ]}
          >
            <Ionicons name="checkmark-circle" size={24} color={COLORS.white} />
          </View>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Hoàn thành 10 bài học</Text>
            <Text style={styles.achievementSubtitle}>Đã hoàn thành!</Text>
          </View>
        </View>
      </Card>
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
  greeting: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: "bold",
    color: COLORS.text,
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
  },
  courseHeader: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  courseInfo: {
    flex: 1,
    justifyContent: "center",
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
  courseActions: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
  },
  lessonCard: {
    marginHorizontal: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  lessonTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: SPACING.xs,
  },
  lessonDate: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  lessonTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: "500",
  },
  achievementsCard: {
    marginHorizontal: SPACING.md,
  },
  lastCard: {
    marginBottom: SPACING.xl,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  achievementSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  achievementProgress: {
    marginBottom: SPACING.xs,
  },
});
