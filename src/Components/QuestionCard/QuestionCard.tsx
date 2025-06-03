import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Icon,
  Radio,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Question } from "@/Services/types";

export interface IQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  showResult?: boolean;
  isCorrect?: boolean;
  onAnswerSelect: (answer: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onShowSolution?: () => void;
  canNavigateNext?: boolean;
  canNavigatePrevious?: boolean;
  timeLimit?: number;
  onTimeUp?: () => void;
}

export const QuestionCard = (props: IQuestionCardProps) => {
  const {
    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    showResult = false,
    isCorrect,
    onAnswerSelect,
    onNextQuestion,
    onPreviousQuestion,
    onShowSolution,
    canNavigateNext = true,
    canNavigatePrevious = true,
    timeLimit,
    onTimeUp,
  } = props;

  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [showSolution, setShowSolution] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const toast = useToast();

  useEffect(() => {
    if (timeLimit && timeRemaining !== undefined) {
      if (timeRemaining > 0) {
        const timer = setTimeout(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (timeRemaining === 0 && onTimeUp) {
        onTimeUp();
      }
    }
  }, [timeRemaining, timeLimit, onTimeUp]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [question.QuestionID]);

  const handleAnswerSelect = (answer: number) => {
    if (!showResult) {
      onAnswerSelect(answer);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    if (onShowSolution) {
      onShowSolution();
    }
  };

  const getOptionBackgroundColor = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex ? COLORS.primary + "20" : "gray.50";
    }

    if (optionIndex === question.Answer) {
      return "success.100";
    }

    if (selectedAnswer === optionIndex && optionIndex !== question.Answer) {
      return "error.100";
    }

    return "gray.50";
  };

  const getOptionBorderColor = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex ? COLORS.primary : "gray.200";
    }

    if (optionIndex === question.Answer) {
      return "success.500";
    }

    if (selectedAnswer === optionIndex && optionIndex !== question.Answer) {
      return "error.500";
    }

    return "gray.200";
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? "radio-button-on"
        : "radio-button-off";
    }

    if (optionIndex === question.Answer) {
      return "checkmark-circle";
    }

    if (selectedAnswer === optionIndex && optionIndex !== question.Answer) {
      return "close-circle";
    }

    return "radio-button-off";
  };

  const getOptionIconColor = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex ? COLORS.primary : "gray.400";
    }

    if (optionIndex === question.Answer) {
      return "success.500";
    }

    if (selectedAnswer === optionIndex && optionIndex !== question.Answer) {
      return "error.500";
    }

    return "gray.400";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Box flex={1} bg="white">
        {/* Header */}
        <Box
          bg={COLORS.primary}
          pt={12}
          pb={6}
          px={4}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
        >
          <HStack alignItems="center" justifyContent="space-between" mb={4}>
            <Text color="white" fontSize="lg" fontWeight="600">
              Question {questionNumber} of {totalQuestions}
            </Text>

            {timeLimit && timeRemaining !== undefined && (
              <HStack alignItems="center" space={1}>
                <Icon
                  as={Ionicons}
                  name="time-outline"
                  size="4"
                  color="white"
                />
                <Text color="white" fontSize="md" fontWeight="600">
                  {formatTime(timeRemaining)}
                </Text>
              </HStack>
            )}
          </HStack>

          {/* Progress Bar */}
          <Box bg="white" opacity={0.3} borderRadius="full" height={2} mb={4}>
            <Box
              bg="white"
              borderRadius="full"
              height={2}
              width={`${(questionNumber / totalQuestions) * 100}%`}
            />
          </Box>
        </Box>

        {/* Question Content */}
        <Box flex={1} px={4} py={6}>
          <VStack space={6} flex={1}>
            {/* Question Text */}
            <Box>
              <Heading size="md" color="gray.800" lineHeight="lg">
                {question.Question}
              </Heading>
            </Box>

            {/* Answer Options */}
            <VStack space={3} flex={1}>
              {question.Option.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <Box
                    bg={getOptionBackgroundColor(index)}
                    borderWidth={2}
                    borderColor={getOptionBorderColor(index)}
                    borderRadius="lg"
                    p={4}
                  >
                    <HStack alignItems="center" space={3}>
                      <Icon
                        as={Ionicons}
                        name={getOptionIcon(index)}
                        size="6"
                        color={getOptionIconColor(index)}
                      />
                      <Text
                        flex={1}
                        fontSize="md"
                        color="gray.800"
                        fontWeight={selectedAnswer === index ? "600" : "400"}
                      >
                        {option}
                      </Text>
                    </HStack>
                  </Box>
                </TouchableOpacity>
              ))}
            </VStack>

            {/* Result Section */}
            {showResult && (
              <Box
                bg={isCorrect ? "success.50" : "error.50"}
                borderRadius="lg"
                p={4}
                borderWidth={1}
                borderColor={isCorrect ? "success.200" : "error.200"}
              >
                <HStack alignItems="center" space={3} mb={2}>
                  <Icon
                    as={Ionicons}
                    name={isCorrect ? "checkmark-circle" : "close-circle"}
                    size="6"
                    color={isCorrect ? "success.500" : "error.500"}
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    color={isCorrect ? "success.700" : "error.700"}
                  >
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </Text>
                </HStack>

                {!isCorrect && (
                  <Text color="gray.700" mb={3}>
                    The correct answer is: {question.Option[question.Answer]}
                  </Text>
                )}

                {question.Solution && !showSolution && (
                  <Button
                    variant="outline"
                    size="sm"
                    colorScheme={isCorrect ? "success" : "error"}
                    onPress={handleShowSolution}
                  >
                    Show Solution
                  </Button>
                )}

                {showSolution && question.Solution && (
                  <Box mt={3} p={3} bg="white" borderRadius="md">
                    <Text fontWeight="600" color="gray.800" mb={2}>
                      Solution:
                    </Text>
                    <Text color="gray.700">{question.Solution}</Text>
                  </Box>
                )}
              </Box>
            )}
          </VStack>

          {/* Navigation Buttons */}
          <HStack space={3} justifyContent="space-between" mt={4}>
            <Button
              variant="outline"
              borderColor={COLORS.primary}
              borderRadius="lg"
              flex={1}
              py={3}
              isDisabled={!canNavigatePrevious}
              onPress={onPreviousQuestion}
              _pressed={{ bg: COLORS.primary + "10" }}
            >
              <HStack alignItems="center" space={2}>
                <Icon
                  as={Ionicons}
                  name="chevron-back"
                  size="4"
                  color={canNavigatePrevious ? COLORS.primary : "gray.400"}
                />
                <Text
                  color={canNavigatePrevious ? COLORS.primary : "gray.400"}
                  fontWeight="600"
                >
                  Previous
                </Text>
              </HStack>
            </Button>

            <Button
              bg={COLORS.primary}
              borderRadius="lg"
              flex={1}
              py={3}
              isDisabled={!canNavigateNext || selectedAnswer === undefined}
              onPress={onNextQuestion}
              _pressed={{ bg: COLORS.primary + "80" }}
            >
              <HStack alignItems="center" space={2}>
                <Text color="white" fontWeight="600">
                  {questionNumber === totalQuestions ? "Finish" : "Next"}
                </Text>
                <Icon
                  as={Ionicons}
                  name={
                    questionNumber === totalQuestions
                      ? "checkmark"
                      : "chevron-forward"
                  }
                  size="4"
                  color="white"
                />
              </HStack>
            </Button>
          </HStack>
        </Box>
      </Box>
    </Animated.View>
  );
};
