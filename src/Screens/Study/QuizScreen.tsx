import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, BackHandler } from "react-native";
import { Box, useToast } from "native-base";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QuestionCard } from "@/Components";
import { useSubmitQuizMutation, useUpdateProgressMutation } from "@/Services";
import { useAuth } from "@/Context/AuthContext";
import { Question } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type QuizNavigationProp = NativeStackNavigationProp<
  StudyStackParamList,
  "Quiz"
>;
type QuizRouteProp = RouteProp<StudyStackParamList, "Quiz">;

interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  timeSpent: number;
  isCorrect: boolean;
}

export const QuizScreen = () => {
  const navigation = useNavigation<QuizNavigationProp>();
  const route = useRoute<QuizRouteProp>();
  const toast = useToast();
  const { user } = useAuth();
  const {
    courseId,
    lessonId,
    questions = [],
    startQuestionIndex = 0,
    timeLimit = 60, // Default 60 seconds per question
  } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(startQuestionIndex);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
    undefined
  );
  const [showResult, setShowResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeUp, setTimeUp] = useState(false);

  // Mutations
  const [submitQuiz] = useSubmitQuizMutation();
  const [updateProgress] = useUpdateProgressMutation();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canNavigatePrevious = currentQuestionIndex > 0;
  const canNavigateNext = currentQuestionIndex < questions.length - 1;

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
  };

  // Handle next question
  const handleNextQuestion = async () => {
    if (selectedAnswer === undefined) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedAnswer === currentQuestion.Answer;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.QuestionID,
      selectedAnswer,
      timeSpent,
      isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (showResult) {
      // Move to next question after showing result
      if (isLastQuestion) {
        // Quiz completed, navigate to results
        await handleQuizComplete(updatedAnswers);
      } else {
        // Go to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(undefined);
        setShowResult(false);
        setQuestionStartTime(Date.now());
        setTimeUp(false);
      }
    } else {
      // Show result for current question
      setShowResult(true);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (canNavigatePrevious) {
      // Find previous answer
      const previousAnswer = answers[currentQuestionIndex - 1];

      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(previousAnswer?.selectedAnswer);
      setShowResult(!!previousAnswer);
      setQuestionStartTime(Date.now());
      setTimeUp(false);
    }
  };

  // Handle time up
  const handleTimeUp = () => {
    setTimeUp(true);
    if (selectedAnswer === undefined) {
      // Auto-select first option if no answer selected
      setSelectedAnswer(0);
    }
    // Auto-proceed after a short delay
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  // Handle quiz completion
  const handleQuizComplete = async (finalAnswers: QuizAnswer[]) => {
    try {
      const totalScore = finalAnswers.filter((a) => a.isCorrect).length;
      const totalTime = finalAnswers.reduce((sum, a) => sum + a.timeSpent, 0);

      // Submit quiz results
      await submitQuiz({
        courseId,
        lessonId,
        answers: finalAnswers.map((a) => ({
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer,
          timeSpent: a.timeSpent,
        })),
        score: totalScore,
        totalTime,
      }).unwrap(); // Update progress
      if (user?.id) {
        await updateProgress({
          userId: user.id,
          courseId,
          lessonId,
          progress: Math.round((totalScore / finalAnswers.length) * 100),
          score: Math.round((totalScore / finalAnswers.length) * 100),
        }).unwrap();
      }

      // Navigate to results
      navigation.replace("QuizResults", {
        courseId,
        lessonId,
        questions,
        answers: finalAnswers,
        totalScore,
        totalTime,
      });
    } catch (error) {
      toast.show({
        title: "Error",
        description: "Failed to submit quiz results",
      });
    }
  };

  // Handle back button press
  const handleBackPress = () => {
    Alert.alert(
      "Exit Quiz",
      "Are you sure you want to exit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
    return true; // Prevent default back action
  };

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBackPress();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription?.remove();
    }, [])
  );

  // Reset question timer when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  if (!currentQuestion) {
    return <Box flex={1} bg="white" />;
  }

  return (
    <Box flex={1} bg="white">
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        isCorrect={selectedAnswer === currentQuestion.Answer}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        canNavigateNext={selectedAnswer !== undefined}
        canNavigatePrevious={canNavigatePrevious}
        timeLimit={timeLimit}
        onTimeUp={handleTimeUp}
      />
    </Box>
  );
};
