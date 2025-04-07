import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, ProgressBar } from '@/Components';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const Study = () => {
  // Mock data for study progress
  const studyProgress = 0.65; // 65% progress
  const dailyGoal = 3; // 3 lessons per day
  const completedToday = 2; // 2 lessons completed today
  
  // Mock data for calendar
  const today = new Date();
  const currentMonth = today.toLocaleString('vi-VN', { month: 'long' });
  const currentYear = today.getFullYear();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Luyện tập</Text>
      </View>
      
      <Card style={styles.progressCard}>
        <Text style={styles.cardTitle}>Tiến độ học tập</Text>
        <ProgressBar 
          progress={studyProgress} 
          height={12}
          showPercentage={true}
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>
          Bạn đã hoàn thành {Math.round(studyProgress * 100)}% khóa học
        </Text>
      </Card>
      
      <Card style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <Text style={styles.cardTitle}>Lịch học tập</Text>
          <Text style={styles.monthYear}>{currentMonth} {currentYear}</Text>
        </View>
        
        {/* Calendar grid would go here */}
        <View style={styles.calendarPlaceholder}>
          <Text style={styles.placeholderText}>Lịch học tập</Text>
        </View>
      </Card>
      
      <Card style={styles.dailyGoalCard}>
        <View style={styles.goalHeader}>
          <Ionicons name="trophy-outline" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Mục tiêu hôm nay</Text>
        </View>
        <View style={styles.goalProgress}>
          <Text style={styles.goalText}>
            {completedToday}/{dailyGoal} bài học
          </Text>
          <ProgressBar 
            progress={completedToday / dailyGoal} 
            height={8}
            style={styles.goalProgressBar}
          />
        </View>
      </Card>
      
      <Card style={styles.suggestedCard}>
        <Text style={styles.cardTitle}>Bài học đề xuất</Text>
        <View style={styles.lessonItem}>
          <View style={styles.lessonIcon}>
            <Ionicons name="book-outline" size={24} color={COLORS.white} />
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Ngữ pháp cơ bản</Text>
            <Text style={styles.lessonDescription}>Tiếp tục từ bài học trước</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
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
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: FONTS.weights.bold,
    color: COLORS.text,
  },
  progressCard: {
    marginHorizontal: SPACING.md,
  },
  calendarCard: {
    marginHorizontal: SPACING.md,
  },
  dailyGoalCard: {
    marginHorizontal: SPACING.md,
  },
  suggestedCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  cardTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    marginVertical: SPACING.sm,
  },
  progressText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  monthYear: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  calendarPlaceholder: {
    height: 200,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  goalProgress: {
    marginTop: SPACING.xs,
  },
  goalText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.xs,
  },
  goalProgressBar: {
    marginTop: SPACING.xs,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text,
  },
  lessonDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
});
