import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Box, useToast } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LessonDetail } from "@/Components";
import {
  useGetLessonQuery,
  useGetQuestionsQuery,
  useGetUserProgressQuery,
} from "@/Services";
import { Lesson, Question, LessonProgress } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type LessonDetailNavigationProp = NativeStackNavigationProp<
  StudyStackParamList,
  "LessonDetail"
>;
type LessonDetailRouteProp = RouteProp<StudyStackParamList, "LessonDetail">;

export const LessonDetailScreen = () => {
  const navigation = useNavigation<LessonDetailNavigationProp>();
  const route = useRoute<LessonDetailRouteProp>();
  const toast = useToast();
  const {
    courseId,
    lessonId,
    lessonIndex = 0,
    lessons: allLessons,
  } = route.params;

  // API queries
  const {
    data: lessonResponse,
    isLoading: isLoadingLesson,
    error: lessonError,
  } = useGetLessonQuery(lessonId);

  const {
    data: questionsResponse,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useGetQuestionsQuery({ lessonId });

  const {
    data: progressResponse,
    isLoading: isLoadingProgress,
    error: progressError,
  } = useGetUserProgressQuery();

  const lesson = lessonResponse?.data;
  const questions = questionsResponse?.data?.questions || [];
  const progressData = progressResponse?.data || [];

  // Get lesson progress
  const courseProgress = progressData.find(
    (progress: any) => progress.courseId === courseId
  );

  const lessonProgress = courseProgress?.lessonProgress?.find(
    (lp: LessonProgress) => lp.lessonId === lessonId
  );

  // Navigation helpers
  const canNavigatePrevious = lessonIndex > 0;
  const canNavigateNext = allLessons && lessonIndex < allLessons.length - 1;

  // Handle question selection
  const handleQuestionPress = (question: Question, index: number) => {
    navigation.navigate("Quiz", {
      courseId,
      lessonId,
      questions,
      startQuestionIndex: index,
    });
  };

  // Handle start quiz
  const handleStartQuiz = () => {
    if (questions.length > 0) {
      navigation.navigate("Quiz", {
        courseId,
        lessonId,
        questions,
        startQuestionIndex: 0,
      });
    } else {
      Alert.alert(
        "No Questions",
        "This lesson has no questions available yet."
      );
    }
  };

  // Handle navigation
  const handleNextLesson = () => {
    if (allLessons && canNavigateNext) {
      const nextLesson = allLessons[lessonIndex + 1];
      navigation.replace("LessonDetail", {
        courseId,
        lessonId: nextLesson.LessonID,
        lessonIndex: lessonIndex + 1,
        lessons: allLessons,
      });
    }
  };

  const handlePreviousLesson = () => {
    if (allLessons && canNavigatePrevious) {
      const previousLesson = allLessons[lessonIndex - 1];
      navigation.replace("LessonDetail", {
        courseId,
        lessonId: previousLesson.LessonID,
        lessonIndex: lessonIndex - 1,
        lessons: allLessons,
      });
    }
  };

  // Handle back press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Handle errors
  useEffect(() => {
    if (lessonError) {
      toast.show({
        title: "Error",
        description: "Failed to load lesson details",
      });
      navigation.goBack();
    }
  }, [lessonError, toast, navigation]);

  useEffect(() => {
    if (questionsError) {
      toast.show({
        title: "Error",
        description: "Failed to load questions",
      });
    }
  }, [questionsError, toast]);

  if (!lesson) {
    return <Box flex={1} bg="white" />; // Loading state handled by LessonDetail component
  }

  return (
    <Box flex={1} bg="white">
      <LessonDetail
        lesson={lesson}
        questions={questions}
        progress={lessonProgress}
        isLoading={isLoadingLesson || isLoadingQuestions}
        onQuestionPress={handleQuestionPress}
        onStartQuiz={handleStartQuiz}
        onBackPress={handleBackPress}
        onNextLesson={handleNextLesson}
        onPreviousLesson={handlePreviousLesson}
        canNavigateNext={canNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
      />
    </Box>
  );
};
