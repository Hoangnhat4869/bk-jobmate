import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Icon,
  Progress,
  Badge,
  useToast,
  ScrollView as NBScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Lesson, Question, LessonProgress } from "@/Services/types";

export interface ILessonDetailProps {
  lesson: Lesson;
  questions: Question[];
  progress?: LessonProgress;
  isLoading?: boolean;
  onQuestionPress: (question: Question, index: number) => void;
  onStartQuiz: () => void;
  onBackPress: () => void;
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
  canNavigateNext?: boolean;
  canNavigatePrevious?: boolean;
}

export const LessonDetail = (props: ILessonDetailProps) => {
  const {
    lesson,
    questions,
    progress,
    isLoading = false,
    onQuestionPress,
    onStartQuiz,
    onBackPress,
    onNextLesson,
    onPreviousLesson,
    canNavigateNext = false,
    canNavigatePrevious = false,
  } = props;

  const toast = useToast();
  const [expandedKeywords, setExpandedKeywords] = useState(false);

  const progressPercentage = progress
    ? (progress.questionsCompleted / progress.totalQuestions) * 100
    : 0;

  const isLessonCompleted = progress
    ? progress.questionsCompleted === progress.totalQuestions
    : false;

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      Alert.alert(
        "No Questions",
        "This lesson has no questions available yet."
      );
      return;
    }
    onStartQuiz();
  };

  const getQuestionStatus = (index: number) => {
    if (!progress) return "not-started";
    return index < progress.questionsCompleted ? "completed" : "not-started";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success.500";
      case "in-progress":
        return "warning.500";
      default:
        return "gray.400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "checkmark-circle";
      case "in-progress":
        return "play-circle";
      default:
        return "ellipse-outline";
    }
  };

  return (
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
          <TouchableOpacity onPress={onBackPress}>
            <Icon as={Ionicons} name="arrow-back" size="6" color="white" />
          </TouchableOpacity>

          <Text color="white" fontSize="lg" fontWeight="600">
            Lesson Details
          </Text>

          <Box width="6" />
        </HStack>

        <VStack space={3}>
          <Heading color="white" size="lg" numberOfLines={2}>
            {lesson.Name}
          </Heading>
          {progress && (
            <VStack space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="white" opacity={0.9}>
                  Progress: {progress.questionsCompleted}/
                  {progress.totalQuestions}
                </Text>
                <Text color="white" opacity={0.9}>
                  {Math.round(progressPercentage)}%
                </Text>
              </HStack>
              <Progress value={progressPercentage} bg="white" opacity={0.3} />
            </VStack>
          )}{" "}
        </VStack>
      </Box>

      <NBScrollView flex={1} px={4} py={6}>
        {/* Keywords Section */}
        {lesson.Keyword && lesson.Keyword.length > 0 && (
          <Box mb={6}>
            <HStack alignItems="center" justifyContent="space-between" mb={3}>
              <Heading size="md" color="gray.800">
                Keywords
              </Heading>
              <TouchableOpacity
                onPress={() => setExpandedKeywords(!expandedKeywords)}
              >
                <Icon
                  as={Ionicons}
                  name={expandedKeywords ? "chevron-up" : "chevron-down"}
                  size="5"
                  color="gray.600"
                />
              </TouchableOpacity>
            </HStack>

            <Box>
              <HStack flexWrap="wrap" space={2}>
                {(expandedKeywords
                  ? lesson.Keyword
                  : lesson.Keyword.slice(0, 6)
                ).map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="subtle"
                    colorScheme="blue"
                    borderRadius="full"
                    px={3}
                    py={1}
                    mb={2}
                  >
                    {keyword}
                  </Badge>
                ))}
                {!expandedKeywords && lesson.Keyword.length > 6 && (
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    borderRadius="full"
                    px={3}
                    py={1}
                    mb={2}
                  >
                    +{lesson.Keyword.length - 6} more
                  </Badge>
                )}
              </HStack>
            </Box>
          </Box>
        )}

        {/* Quiz Section */}
        <Box mb={6}>
          <HStack alignItems="center" justifyContent="space-between" mb={4}>
            <Heading size="md" color="gray.800">
              Quiz Questions
            </Heading>
            <Text color="gray.600" fontSize="sm">
              {questions.length} questions
            </Text>
          </HStack>

          {questions.length > 0 ? (
            <VStack space={3}>
              {questions.map((question, index) => {
                const status = getQuestionStatus(index);
                return (
                  <TouchableOpacity
                    key={question.QuestionID}
                    onPress={() => onQuestionPress(question, index)}
                  >
                    <Box
                      bg="gray.50"
                      borderRadius="lg"
                      p={4}
                      borderWidth={1}
                      borderColor="gray.200"
                    >
                      <HStack alignItems="center" space={3}>
                        <Icon
                          as={Ionicons}
                          name={getStatusIcon(status)}
                          size="6"
                          color={getStatusColor(status)}
                        />

                        <VStack flex={1} space={1}>
                          <Text
                            fontWeight="600"
                            color="gray.800"
                            numberOfLines={2}
                          >
                            Question {index + 1}
                          </Text>
                          <Text
                            color="gray.600"
                            fontSize="sm"
                            numberOfLines={1}
                          >
                            {question.Question}
                          </Text>
                        </VStack>

                        <Icon
                          as={Ionicons}
                          name="chevron-forward"
                          size="5"
                          color="gray.400"
                        />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          ) : (
            <Box
              bg="gray.50"
              borderRadius="lg"
              p={6}
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={Ionicons}
                name="help-circle-outline"
                size="12"
                color="gray.400"
                mb={3}
              />
              <Text color="gray.600" textAlign="center">
                No questions available for this lesson yet.
              </Text>
            </Box>
          )}
        </Box>

        {/* Action Buttons */}
        <VStack space={3} mb={6}>
          {questions.length > 0 && (
            <Button
              bg={COLORS.primary}
              borderRadius="lg"
              py={4}
              onPress={handleStartQuiz}
              _pressed={{ bg: COLORS.primary + "80" }}
            >
              <Text color="white" fontWeight="600" fontSize="md">
                {isLessonCompleted ? "Retake Quiz" : "Start Quiz"}
              </Text>
            </Button>
          )}
        </VStack>

        {/* Navigation Buttons */}
        <HStack space={3} justifyContent="space-between">
          <Button
            variant="outline"
            borderColor={COLORS.primary}
            borderRadius="lg"
            flex={1}
            py={3}
            isDisabled={!canNavigatePrevious}
            onPress={onPreviousLesson}
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
            variant="outline"
            borderColor={COLORS.primary}
            borderRadius="lg"
            flex={1}
            py={3}
            isDisabled={!canNavigateNext}
            onPress={onNextLesson}
            _pressed={{ bg: COLORS.primary + "10" }}
          >
            <HStack alignItems="center" space={2}>
              <Text
                color={canNavigateNext ? COLORS.primary : "gray.400"}
                fontWeight="600"
              >
                Next
              </Text>
              <Icon
                as={Ionicons}
                name="chevron-forward"
                size="4"
                color={canNavigateNext ? COLORS.primary : "gray.400"}
              />
            </HStack>
          </Button>
        </HStack>
      </NBScrollView>
    </Box>
  );
};
