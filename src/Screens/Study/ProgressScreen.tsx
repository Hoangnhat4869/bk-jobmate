import React from "react";
import { View, StyleSheet } from "react-native";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgressTracker } from "@/Components";
import { useGetCoursesQuery, useGetUserProgressQuery } from "@/Services";
import { CourseProgress } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type ProgressNavigationProp = NativeStackNavigationProp<StudyStackParamList>;

export const ProgressScreen = () => {
  const navigation = useNavigation<ProgressNavigationProp>();

  // API queries
  const {
    data: coursesResponse,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useGetCoursesQuery({});

  const {
    data: progressResponse,
    isLoading: isLoadingProgress,
    error: progressError,
  } = useGetUserProgressQuery();

  const courses = coursesResponse?.data?.courses || [];
  const progressData = progressResponse?.data || [];

  // Handle course selection
  const handleCourseSelect = (courseId: string) => {
    navigation.navigate("CourseDetail", {
      courseId,
    });
  };
  // Handle lesson press
  const handleLessonPress = (lessonId: string, courseId: string) => {
    navigation.navigate("LessonDetail", {
      lessonId,
      courseId,
    });
  };

  return (
    <Box flex={1} bg="white">
      <ProgressTracker
        courseProgress={progressData}
        courses={courses}
        onCourseSelect={handleCourseSelect}
        onLessonPress={handleLessonPress}
      />
    </Box>
  );
};
