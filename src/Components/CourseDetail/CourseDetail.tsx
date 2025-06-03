import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Badge,
  Progress,
  Button,
  Icon,
  Divider,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import {
  Course,
  Lesson,
  CourseProgress,
  LessonProgress,
} from "@/Services/types";

export interface ICourseDetailProps {
  course: Course;
  lessons: Lesson[];
  progress?: CourseProgress;
  isLoading?: boolean;
  onLessonPress: (lesson: Lesson) => void;
  onStartCourse?: () => void;
  onContinueCourse?: () => void;
  onBackPress: () => void;
}

export const CourseDetail = (props: ICourseDetailProps) => {
  const {
    course,
    lessons,
    progress,
    isLoading = false,
    onLessonPress,
    onStartCourse,
    onContinueCourse,
    onBackPress,
  } = props;

  const toast = useToast();

  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Beginner":
        return "green";
      case "Intermediate":
        return "orange";
      case "Advanced":
        return "red";
      default:
        return "blue";
    }
  };

  const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
    return progress?.lessonProgress.find((lp) => lp.lessonId === lessonId);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    const lessonProgress = getLessonProgress(lessonId);
    return lessonProgress
      ? lessonProgress.questionsCompleted === lessonProgress.totalQuestions
      : false;
  };

  const handleStartCourse = () => {
    if (lessons.length > 0) {
      onLessonPress(lessons[0]);
    } else {
      Alert.alert("No Lessons", "This course has no lessons available yet.");
    }
  };

  const handleContinueCourse = () => {
    if (!progress) {
      handleStartCourse();
      return;
    }

    // Find the first incomplete lesson
    const incompleteLesson = lessons.find(
      (lesson) => !isLessonCompleted(lesson.LessonID)
    );

    if (incompleteLesson) {
      onLessonPress(incompleteLesson);
    } else {
      // All lessons completed, go to first lesson for review
      if (lessons.length > 0) {
        onLessonPress(lessons[0]);
      }
    }
  };

  const renderLessonItem = (lesson: Lesson, index: number) => {
    const lessonProgress = getLessonProgress(lesson.LessonID);
    const isCompleted = isLessonCompleted(lesson.LessonID);
    const isAccessible =
      index === 0 || isLessonCompleted(lessons[index - 1]?.LessonID);

    return (
      <TouchableOpacity
        key={lesson.LessonID}
        onPress={() => (isAccessible ? onLessonPress(lesson) : null)}
        disabled={!isAccessible}
      >
        <Box
          bg={isAccessible ? "white" : "gray.50"}
          p={4}
          mb={3}
          borderRadius="md"
          shadow={isAccessible ? 1 : 0}
          opacity={isAccessible ? 1 : 0.6}
        >
          <HStack space={3} alignItems="center">
            {/* Lesson Icon */}
            <Box
              w={10}
              h={10}
              borderRadius="full"
              bg={
                isCompleted
                  ? "green.500"
                  : isAccessible
                  ? "primary.500"
                  : "gray.300"
              }
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={Ionicons}
                name={isCompleted ? "checkmark" : "play"}
                size="sm"
                color="white"
              />
            </Box>

            {/* Lesson Content */}
            <VStack flex={1} space={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <Heading size="sm" flex={1} numberOfLines={1}>
                  Lesson {index + 1}: {lesson.Name}
                </Heading>
                {!isAccessible && (
                  <Icon
                    as={Ionicons}
                    name="lock-closed"
                    size="sm"
                    color="gray.400"
                  />
                )}
              </HStack>

              <Text fontSize="xs" color="gray.500">
                {lesson.Questions.length} questions
              </Text>

              {lesson.Keyword.length > 0 && (
                <HStack space={1} flexWrap="wrap" mt={1}>
                  {lesson.Keyword.slice(0, 3).map((keyword, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {keyword}
                    </Badge>
                  ))}
                  {lesson.Keyword.length > 3 && (
                    <Text fontSize="xs" color="gray.400">
                      +{lesson.Keyword.length - 3} more
                    </Text>
                  )}
                </HStack>
              )}

              {/* Progress Bar for this lesson */}
              {lessonProgress && (
                <VStack space={1} mt={2}>
                  <HStack justifyContent="space-between">
                    <Text fontSize="xs" color="gray.500">
                      Progress: {lessonProgress.questionsCompleted}/
                      {lessonProgress.totalQuestions}
                    </Text>
                    <Text fontSize="xs" color="primary.500">
                      {lessonProgress.score > 0
                        ? `${lessonProgress.score}%`
                        : ""}
                    </Text>
                  </HStack>
                  <Progress
                    value={
                      (lessonProgress.questionsCompleted /
                        lessonProgress.totalQuestions) *
                      100
                    }
                    colorScheme="primary"
                    size="xs"
                  />
                </VStack>
              )}
            </VStack>

            {/* Arrow */}
            {isAccessible && (
              <Icon
                as={Ionicons}
                name="chevron-forward"
                size="sm"
                color="gray.400"
              />
            )}
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <Box
        bg="white"
        pt={12}
        pb={4}
        px={4}
        borderBottomWidth={1}
        borderBottomColor="gray.100"
      >
        <HStack alignItems="center" space={3} mb={4}>
          <TouchableOpacity onPress={onBackPress}>
            <Icon as={Ionicons} name="arrow-back" size="lg" color="gray.700" />
          </TouchableOpacity>
          <Text flex={1} fontSize="lg" fontWeight="500">
            Course Details
          </Text>
        </HStack>
      </Box>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Course Header */}
        <Box bg="white" p={4} mb={4}>
          <VStack space={4}>
            {/* Course Image */}
            {course.ImageUrl ? (
              <Image
                source={{ uri: course.ImageUrl }}
                style={styles.courseImage}
              />
            ) : (
              <Box
                style={styles.courseImage}
                bg="gray.100"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={Ionicons}
                  name="book-outline"
                  size="4xl"
                  color="gray.400"
                />
              </Box>
            )}

            {/* Course Info */}
            <VStack space={3}>
              <HStack justifyContent="space-between" alignItems="flex-start">
                <Heading size="lg" flex={1} numberOfLines={2}>
                  {course.Name}
                </Heading>
                {course.Level && (
                  <Badge
                    colorScheme={getLevelColor(course.Level)}
                    variant="subtle"
                    ml={2}
                  >
                    {course.Level}
                  </Badge>
                )}
              </HStack>

              {course.Description && (
                <Text color="gray.600" lineHeight="lg">
                  {course.Description}
                </Text>
              )}

              {/* Course Stats */}
              <HStack space={6} alignItems="center">
                <HStack space={1} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="book-outline"
                    size="sm"
                    color="gray.500"
                  />
                  <Text fontSize="sm" color="gray.500">
                    {lessons.length} lessons
                  </Text>
                </HStack>

                {course.Duration && (
                  <HStack space={1} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="time-outline"
                      size="sm"
                      color="gray.500"
                    />
                    <Text fontSize="sm" color="gray.500">
                      {course.Duration} mins
                    </Text>
                  </HStack>
                )}

                {course.Category && (
                  <HStack space={1} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="folder-outline"
                      size="sm"
                      color="gray.500"
                    />
                    <Text fontSize="sm" color="gray.500">
                      {course.Category}
                    </Text>
                  </HStack>
                )}
              </HStack>

              {/* Overall Progress */}
              {progress && (
                <VStack space={2}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="sm" color="gray.600">
                      Course Progress: {progress.lessonsCompleted}/
                      {progress.totalLessons} lessons
                    </Text>
                    <Text fontSize="sm" color="primary.500" fontWeight="500">
                      {Math.round(progress.overallProgress)}%
                    </Text>
                  </HStack>
                  <Progress
                    value={progress.overallProgress}
                    colorScheme="primary"
                    size="sm"
                  />
                </VStack>
              )}

              {/* Action Button */}
              <Button
                size="lg"
                colorScheme="primary"
                onPress={progress ? handleContinueCourse : handleStartCourse}
                isLoading={isLoading}
                leftIcon={
                  <Icon
                    as={Ionicons}
                    name={progress ? "play" : "play-circle"}
                    size="sm"
                    color="white"
                  />
                }
              >
                {progress
                  ? progress.overallProgress === 100
                    ? "Review Course"
                    : "Continue Learning"
                  : "Start Course"}
              </Button>
            </VStack>
          </VStack>
        </Box>

        <Divider />

        {/* Lessons List */}
        <Box bg="white" p={4} mt={4}>
          <Heading size="md" mb={4}>
            Course Lessons
          </Heading>

          {lessons.length > 0 ? (
            <VStack space={0}>
              {lessons.map((lesson, index) => renderLessonItem(lesson, index))}
            </VStack>
          ) : (
            <Box py={8} alignItems="center">
              <Icon
                as={Ionicons}
                name="book-outline"
                size="3xl"
                color="gray.300"
                mb={4}
              />
              <Text color="gray.400" textAlign="center">
                No lessons available yet
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  courseImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
});
