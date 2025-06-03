import React from "react";
import { View, StyleSheet } from "react-native";
import { Box } from "native-base";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QuizResults, QuizResult } from "@/Components";
import { Question } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type QuizResultsNavigationProp = NativeStackNavigationProp<
  StudyStackParamList,
  "QuizResults"
>;
type QuizResultsRouteProp = RouteProp<StudyStackParamList, "QuizResults">;

export const QuizResultsScreen = () => {
  const navigation = useNavigation<QuizResultsNavigationProp>();
  const route = useRoute<QuizResultsRouteProp>();
  const { courseId, lessonId, questions, answers, totalScore, totalTime } =
    route.params;

  // Transform answers to QuizResult format
  const results: QuizResult[] = answers.map((answer) => {
    const question = questions.find((q) => q.QuestionID === answer.questionId);
    return {
      questionId: answer.questionId,
      question: question?.Question || "",
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question?.Answer || 0,
      isCorrect: answer.isCorrect,
      timeSpent: answer.timeSpent,
    };
  });

  const scorePercentage = (totalScore / questions.length) * 100;
  const passingScore = 70; // 70% passing score
  const canProceedToNext = scorePercentage >= passingScore;

  // Handle retake quiz
  const handleRetakeQuiz = () => {
    navigation.replace("Quiz", {
      courseId,
      lessonId,
      questions,
      startQuestionIndex: 0,
    });
  };
  // Handle review answers - go back to course detail
  const handleReviewAnswers = () => {
    navigation.navigate("CourseDetail", {
      courseId,
    });
  };

  // Handle back to lesson
  const handleBackToLesson = () => {
    navigation.navigate("LessonDetail", {
      courseId,
      lessonId,
    });
  };

  // Handle next lesson
  const handleNextLesson = () => {
    // Navigate to course detail and let it handle next lesson logic
    navigation.navigate("CourseDetail", {
      courseId,
    });
  };

  return (
    <Box flex={1} bg="white">
      <QuizResults
        results={results}
        questions={questions}
        totalScore={totalScore}
        totalQuestions={questions.length}
        totalTime={totalTime}
        passingScore={passingScore}
        onRetakeQuiz={handleRetakeQuiz}
        onReviewAnswers={handleReviewAnswers}
        onBackToLesson={handleBackToLesson}
        onNextLesson={handleNextLesson}
        canProceedToNext={canProceedToNext}
      />
    </Box>
  );
};
