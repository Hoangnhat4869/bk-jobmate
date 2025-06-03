import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Box, useToast } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CourseDetail } from "@/Components/CourseDetail";
import {
  useGetCourseQuery,
  useGetLessonsQuery,
  useGetUserProgressQuery,
} from "@/Services";
import { Course, Lesson, CourseProgress } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type CourseDetailNavigationProp = NativeStackNavigationProp<
  StudyStackParamList,
  "CourseDetail"
>;
type CourseDetailRouteProp = RouteProp<StudyStackParamList, "CourseDetail">;

export const CourseDetailScreen = () => {
  const navigation = useNavigation<CourseDetailNavigationProp>();
  const route = useRoute<CourseDetailRouteProp>();
  const toast = useToast();

  const { courseId, course: initialCourse } = route.params;

  // API queries
  const {
    data: courseResponse,
    isLoading: isLoadingCourse,
    error: courseError,
  } = useGetCourseQuery(courseId, {
    skip: !!initialCourse,
  });

  const {
    data: lessonsResponse,
    isLoading: isLoadingLessons,
    error: lessonsError,
  } = useGetLessonsQuery({ courseId });

  const {
    data: progressResponse,
    isLoading: isLoadingProgress,
    error: progressError,
  } = useGetUserProgressQuery();

  const course = initialCourse || courseResponse?.data;
  const lessons = lessonsResponse?.data?.lessons || [];
  const progressData = progressResponse?.data || [];

  // Get course progress
  const courseProgress = progressData.find(
    (progress: CourseProgress) => progress.courseId === courseId
  );

  // Handle lesson selection
  const handleLessonPress = (lesson: Lesson) => {
    const lessonIndex = lessons.findIndex(
      (l) => l.LessonID === lesson.LessonID
    );
    navigation.navigate("LessonDetail", {
      courseId,
      lessonId: lesson.LessonID,
      lessonIndex,
      lessons,
    });
  };

  // Handle start course
  const handleStartCourse = () => {
    if (lessons.length > 0) {
      handleLessonPress(lessons[0]);
    } else {
      Alert.alert("No Lessons", "This course has no lessons available yet.");
    }
  };

  // Handle continue course
  const handleContinueCourse = () => {
    if (!courseProgress) {
      handleStartCourse();
      return;
    }

    // Find the first incomplete lesson
    const incompleteLesson = lessons.find((lesson) => {
      const lessonProgress = courseProgress.lessonProgress.find(
        (lp) => lp.lessonId === lesson.LessonID
      );
      return (
        !lessonProgress ||
        lessonProgress.questionsCompleted < lessonProgress.totalQuestions
      );
    });

    if (incompleteLesson) {
      handleLessonPress(incompleteLesson);
    } else {
      // All lessons completed, go to first lesson for review
      if (lessons.length > 0) {
        handleLessonPress(lessons[0]);
      }
    }
  };

  // Handle back press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Handle errors
  useEffect(() => {
    if (courseError) {
      toast.show({
        title: "Error",
        description: "Failed to load course details",
      });
      navigation.goBack();
    }
  }, [courseError, toast, navigation]);
  useEffect(() => {
    if (lessonsError) {
      toast.show({
        title: "Error",
        description: "Failed to load lessons",
      });
    }
  }, [lessonsError, toast]);

  if (!course) {
    return <Box flex={1} bg="white" />; // Loading state handled by CourseDetail component
  }

  return (
    <Box flex={1} bg="white">
      <CourseDetail
        course={course}
        lessons={lessons}
        progress={courseProgress}
        isLoading={isLoadingCourse || isLoadingLessons}
        onLessonPress={handleLessonPress}
        onStartCourse={handleStartCourse}
        onContinueCourse={handleContinueCourse}
        onBackPress={handleBackPress}
      />
    </Box>
  );
};
