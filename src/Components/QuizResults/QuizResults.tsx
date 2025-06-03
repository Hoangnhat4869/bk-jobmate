import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Icon,
  Progress,
  Circle,
  Divider,
  ScrollView as NBScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Question } from "@/Services/types";

export interface QuizResult {
  questionId: string;
  question: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface IQuizResultsProps {
  results: QuizResult[];
  questions: Question[];
  totalScore: number;
  totalQuestions: number;
  totalTime?: number;
  passingScore?: number;
  onRetakeQuiz: () => void;
  onReviewAnswers: () => void;
  onBackToLesson: () => void;
  onNextLesson?: () => void;
  canProceedToNext?: boolean;
}

export const QuizResults = (props: IQuizResultsProps) => {
  const {
    results,
    questions,
    totalScore,
    totalQuestions,
    totalTime,
    passingScore = 70,
    onRetakeQuiz,
    onReviewAnswers,
    onBackToLesson,
    onNextLesson,
    canProceedToNext = false,
  } = props;

  const scorePercentage = (totalScore / totalQuestions) * 100;
  const isPassed = scorePercentage >= passingScore;
  const correctAnswers = results.filter((r) => r.isCorrect).length;

  const getScoreColor = () => {
    if (scorePercentage >= 90) return "success.500";
    if (scorePercentage >= passingScore) return "warning.500";
    return "error.500";
  };

  const getScoreIcon = () => {
    if (scorePercentage >= 90) return "trophy";
    if (scorePercentage >= passingScore) return "checkmark-circle";
    return "close-circle";
  };

  const getGradeText = () => {
    if (scorePercentage >= 90) return "Excellent!";
    if (scorePercentage >= 80) return "Great Job!";
    if (scorePercentage >= passingScore) return "Good Work!";
    return "Keep Trying!";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getQuestionById = (questionId: string): Question | undefined => {
    return questions.find((q) => q.QuestionID === questionId);
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box
        bg={getScoreColor()}
        pt={12}
        pb={8}
        px={4}
        borderBottomLeftRadius={25}
        borderBottomRightRadius={25}
      >
        <VStack alignItems="center" space={4}>
          <Icon as={Ionicons} name={getScoreIcon()} size="16" color="white" />
          <VStack alignItems="center" space={2}>
            <Heading color="white" size="xl">
              {getGradeText()}
            </Heading>
            <Text color="white" fontSize="lg" opacity={0.9}>
              Quiz Complete
            </Text>
          </VStack>
          {/* Score Circle */}
          <Box position="relative" alignItems="center" justifyContent="center">
            <Circle size="24" bg="white" opacity={0.2} />
            <Circle size="20" bg="white" opacity={0.3} position="absolute" />
            <VStack alignItems="center" position="absolute">
              <Text color="white" fontSize="3xl" fontWeight="bold">
                {Math.round(scorePercentage)}%
              </Text>
              <Text color="white" fontSize="sm" opacity={0.9}>
                {correctAnswers}/{totalQuestions}
              </Text>
            </VStack>
          </Box>{" "}
        </VStack>
      </Box>

      <NBScrollView flex={1} px={4} py={6}>
        {/* Statistics */}
        <Box mb={6}>
          <Heading size="md" color="gray.800" mb={4}>
            Quiz Statistics
          </Heading>

          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="gray.600">Correct Answers</Text>
              <Text fontWeight="600" color="gray.800">
                {correctAnswers} / {totalQuestions}
              </Text>
            </HStack>

            <HStack justifyContent="space-between" alignItems="center">
              <Text color="gray.600">Score</Text>
              <Text fontWeight="600" color={getScoreColor()}>
                {Math.round(scorePercentage)}%
              </Text>
            </HStack>

            {totalTime && (
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="gray.600">Time Taken</Text>
                <Text fontWeight="600" color="gray.800">
                  {formatTime(totalTime)}
                </Text>
              </HStack>
            )}

            <HStack justifyContent="space-between" alignItems="center">
              <Text color="gray.600">Status</Text>
              <HStack alignItems="center" space={1}>
                <Icon
                  as={Ionicons}
                  name={isPassed ? "checkmark-circle" : "close-circle"}
                  size="4"
                  color={isPassed ? "success.500" : "error.500"}
                />
                <Text
                  fontWeight="600"
                  color={isPassed ? "success.500" : "error.500"}
                >
                  {isPassed ? "Passed" : "Failed"}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        <Divider mb={6} />

        {/* Question Breakdown */}
        <Box mb={6}>
          <Heading size="md" color="gray.800" mb={4}>
            Question Breakdown
          </Heading>

          <VStack space={3}>
            {results.map((result, index) => {
              const question = getQuestionById(result.questionId);
              return (
                <Box
                  key={result.questionId}
                  bg="gray.50"
                  borderRadius="lg"
                  p={4}
                  borderLeftWidth={4}
                  borderLeftColor={
                    result.isCorrect ? "success.500" : "error.500"
                  }
                >
                  <HStack alignItems="center" space={3}>
                    <Icon
                      as={Ionicons}
                      name={
                        result.isCorrect ? "checkmark-circle" : "close-circle"
                      }
                      size="6"
                      color={result.isCorrect ? "success.500" : "error.500"}
                    />

                    <VStack flex={1} space={1}>
                      <Text fontWeight="600" color="gray.800">
                        Question {index + 1}
                      </Text>
                      <Text color="gray.600" fontSize="sm" numberOfLines={2}>
                        {result.question}
                      </Text>
                      {!result.isCorrect && question && (
                        <Text color="error.600" fontSize="xs">
                          Correct: {question.Option[result.correctAnswer]}
                        </Text>
                      )}
                    </VStack>

                    {result.timeSpent && (
                      <Text color="gray.500" fontSize="xs">
                        {formatTime(result.timeSpent)}
                      </Text>
                    )}
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </Box>

        {/* Action Buttons */}
        <VStack space={3} mb={6}>
          {/* Review Answers */}
          <Button
            variant="outline"
            borderColor={COLORS.primary}
            borderRadius="lg"
            py={4}
            onPress={onReviewAnswers}
            _pressed={{ bg: COLORS.primary + "10" }}
          >
            <HStack alignItems="center" space={2}>
              <Icon
                as={Ionicons}
                name="eye-outline"
                size="5"
                color={COLORS.primary}
              />
              <Text color={COLORS.primary} fontWeight="600" fontSize="md">
                Review Answers
              </Text>
            </HStack>
          </Button>
          {/* Retake Quiz */}
          <Button
            variant="outline"
            borderColor="orange.500"
            borderRadius="lg"
            py={4}
            onPress={onRetakeQuiz}
            _pressed={{ bg: "orange.50" }}
          >
            <HStack alignItems="center" space={2}>
              <Icon
                as={Ionicons}
                name="refresh-outline"
                size="5"
                color="orange.500"
              />
              <Text color="orange.500" fontWeight="600" fontSize="md">
                Retake Quiz
              </Text>
            </HStack>
          </Button>
          {/* Next Lesson or Back to Lesson */}
          {canProceedToNext && onNextLesson ? (
            <Button
              bg={COLORS.primary}
              borderRadius="lg"
              py={4}
              onPress={onNextLesson}
              _pressed={{ bg: COLORS.primary + "80" }}
            >
              <HStack alignItems="center" space={2}>
                <Text color="white" fontWeight="600" fontSize="md">
                  Next Lesson
                </Text>
                <Icon
                  as={Ionicons}
                  name="chevron-forward"
                  size="5"
                  color="white"
                />
              </HStack>
            </Button>
          ) : (
            <Button
              bg={COLORS.primary}
              borderRadius="lg"
              py={4}
              onPress={onBackToLesson}
              _pressed={{ bg: COLORS.primary + "80" }}
            >
              <HStack alignItems="center" space={2}>
                <Icon as={Ionicons} name="arrow-back" size="5" color="white" />
                <Text color="white" fontWeight="600" fontSize="md">
                  Back to Lesson
                </Text>
              </HStack>
            </Button>
          )}{" "}
        </VStack>
      </NBScrollView>
    </Box>
  );
};
