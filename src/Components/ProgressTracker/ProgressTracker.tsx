import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Progress,
  Circle,
  Badge,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { CourseProgress, LessonProgress, Course } from "@/Services/types";

export interface IProgressTrackerProps {
  courseProgress: CourseProgress[];
  courses: Course[];
  selectedCourseId?: string;
  onCourseSelect: (courseId: string) => void;
  onLessonPress?: (lessonId: string, courseId: string) => void;
}

export const ProgressTracker = (props: IProgressTrackerProps) => {
  const {
    courseProgress,
    courses,
    selectedCourseId,
    onCourseSelect,
    onLessonPress,
  } = props;

  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");

  const selectedCourse = selectedCourseId
    ? courseProgress.find((cp) => cp.courseId === selectedCourseId)
    : null;

  const selectedCourseInfo = selectedCourseId
    ? courses.find((c) => c.CourseID === selectedCourseId)
    : null;

  // Calculate overall statistics
  const totalCourses = courseProgress.length;
  const completedCourses = courseProgress.filter((cp) => cp.completedAt).length;
  const totalLessons = courseProgress.reduce(
    (sum, cp) => sum + cp.totalLessons,
    0
  );
  const completedLessons = courseProgress.reduce(
    (sum, cp) => sum + cp.lessonsCompleted,
    0
  );
  const overallProgress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "success.500";
    if (progress >= 75) return "warning.500";
    if (progress >= 25) return "info.500";
    return "gray.400";
  };

  const formatDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day";
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  };

  const renderOverview = () => (
    <VStack space={6}>
      {/* Overall Statistics */}
      <Box>
        <Heading size="md" color="gray.800" mb={4}>
          Overall Progress
        </Heading>

        <VStack space={4}>
          <Box bg="gray.50" borderRadius="lg" p={4}>
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <Text color="gray.600">Total Progress</Text>
              <Text fontWeight="600" color={getProgressColor(overallProgress)}>
                {Math.round(overallProgress)}%
              </Text>
            </HStack>
            <Progress value={overallProgress} colorScheme="blue" />
          </Box>

          <HStack space={3}>
            <Box bg="success.50" borderRadius="lg" p={4} flex={1}>
              <VStack alignItems="center" space={2}>
                <Icon
                  as={Ionicons}
                  name="checkmark-circle"
                  size="8"
                  color="success.500"
                />
                <Text fontSize="2xl" fontWeight="bold" color="success.700">
                  {completedCourses}
                </Text>
                <Text color="success.600" textAlign="center" fontSize="sm">
                  Courses Completed
                </Text>
              </VStack>
            </Box>

            <Box bg="info.50" borderRadius="lg" p={4} flex={1}>
              <VStack alignItems="center" space={2}>
                <Icon as={Ionicons} name="book" size="8" color="info.500" />
                <Text fontSize="2xl" fontWeight="bold" color="info.700">
                  {completedLessons}
                </Text>
                <Text color="info.600" textAlign="center" fontSize="sm">
                  Lessons Completed
                </Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Box>

      {/* Course Progress List */}
      <Box>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md" color="gray.800">
            Course Progress
          </Heading>
          <TouchableOpacity
            onPress={() =>
              setViewMode(viewMode === "overview" ? "detailed" : "overview")
            }
          >
            <Text color={COLORS.primary} fontWeight="600">
              {viewMode === "overview" ? "Detailed View" : "Overview"}
            </Text>
          </TouchableOpacity>
        </HStack>

        <VStack space={3}>
          {courseProgress.map((progress) => {
            const course = courses.find(
              (c) => c.CourseID === progress.courseId
            );
            if (!course) return null;

            return (
              <TouchableOpacity
                key={progress.courseId}
                onPress={() => onCourseSelect(progress.courseId)}
              >
                <Box
                  bg="white"
                  borderRadius="lg"
                  p={4}
                  borderWidth={1}
                  borderColor="gray.200"
                  shadow={1}
                >
                  <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <VStack flex={1}>
                        <Text
                          fontWeight="600"
                          color="gray.800"
                          numberOfLines={1}
                        >
                          {course.Name}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                          {progress.lessonsCompleted}/{progress.totalLessons}{" "}
                          lessons
                        </Text>
                      </VStack>

                      <VStack alignItems="center" space={1}>
                        <Text
                          fontWeight="600"
                          color={getProgressColor(progress.overallProgress)}
                        >
                          {Math.round(progress.overallProgress)}%
                        </Text>
                        {progress.completedAt && (
                          <Badge
                            colorScheme="success"
                            variant="subtle"
                            size="sm"
                          >
                            Completed
                          </Badge>
                        )}
                      </VStack>
                    </HStack>

                    <Progress
                      value={progress.overallProgress}
                      colorScheme="blue"
                      bg="gray.200"
                    />

                    <HStack justifyContent="space-between">
                      <Text color="gray.500" fontSize="xs">
                        Started: {formatDuration(progress.startedAt)}
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        Last accessed: {formatDuration(progress.lastAccessedAt)}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </TouchableOpacity>
            );
          })}
        </VStack>
      </Box>
    </VStack>
  );

  const renderDetailedView = () => {
    if (!selectedCourse || !selectedCourseInfo) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center" p={8}>
          <Icon
            as={Ionicons}
            name="analytics-outline"
            size="16"
            color="gray.400"
            mb={4}
          />
          <Text color="gray.600" textAlign="center">
            Select a course to view detailed progress
          </Text>
        </Box>
      );
    }

    return (
      <VStack space={6}>
        {/* Course Header */}
        <Box>
          <HStack alignItems="center" space={3} mb={4}>
            <TouchableOpacity onPress={() => setViewMode("overview")}>
              <Icon
                as={Ionicons}
                name="arrow-back"
                size="6"
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <VStack flex={1}>
              <Heading size="md" color="gray.800">
                {selectedCourseInfo.Name}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Detailed Progress Analysis
              </Text>
            </VStack>
          </HStack>

          <Box bg="gray.50" borderRadius="lg" p={4}>
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <Text color="gray.600">Overall Progress</Text>
              <Text
                fontWeight="600"
                color={getProgressColor(selectedCourse.overallProgress)}
              >
                {Math.round(selectedCourse.overallProgress)}%
              </Text>
            </HStack>
            <Progress
              value={selectedCourse.overallProgress}
              colorScheme="blue"
            />
          </Box>
        </Box>

        {/* Lesson Progress */}
        <Box>
          <Heading size="sm" color="gray.800" mb={4}>
            Lesson Progress
          </Heading>

          <VStack space={3}>
            {selectedCourse.lessonProgress.map((lessonProgress, index) => (
              <TouchableOpacity
                key={lessonProgress.lessonId}
                onPress={() =>
                  onLessonPress &&
                  onLessonPress(
                    lessonProgress.lessonId,
                    selectedCourse.courseId
                  )
                }
              >
                <Box
                  bg="white"
                  borderRadius="lg"
                  p={4}
                  borderWidth={1}
                  borderColor="gray.200"
                  borderLeftWidth={4}
                  borderLeftColor={
                    lessonProgress.questionsCompleted ===
                    lessonProgress.totalQuestions
                      ? "success.500"
                      : lessonProgress.questionsCompleted > 0
                      ? "warning.500"
                      : "gray.300"
                  }
                >
                  <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <VStack flex={1}>
                        <Text fontWeight="600" color="gray.800">
                          Lesson {index + 1}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                          {lessonProgress.questionsCompleted}/
                          {lessonProgress.totalQuestions} questions
                        </Text>
                      </VStack>

                      <VStack alignItems="center" space={1}>
                        <Text fontWeight="600" color="gray.800">
                          {lessonProgress.score}%
                        </Text>
                        {lessonProgress.completedAt && (
                          <Badge
                            colorScheme="success"
                            variant="subtle"
                            size="sm"
                          >
                            <Icon
                              as={Ionicons}
                              name="checkmark"
                              size="3"
                              color="success.500"
                            />
                          </Badge>
                        )}
                      </VStack>
                    </HStack>

                    <Progress
                      value={
                        (lessonProgress.questionsCompleted /
                          lessonProgress.totalQuestions) *
                        100
                      }
                      colorScheme="blue"
                      bg="gray.200"
                    />

                    {lessonProgress.completedAt && (
                      <Text color="gray.500" fontSize="xs">
                        Completed:{" "}
                        {new Date(
                          lessonProgress.completedAt
                        ).toLocaleDateString()}
                      </Text>
                    )}
                  </VStack>
                </Box>
              </TouchableOpacity>
            ))}
          </VStack>
        </Box>

        {/* Statistics */}
        <Box>
          <Heading size="sm" color="gray.800" mb={4}>
            Performance Statistics
          </Heading>

          <HStack space={3}>
            <Box bg="info.50" borderRadius="lg" p={4} flex={1}>
              <VStack alignItems="center" space={2}>
                <Icon as={Ionicons} name="time" size="6" color="info.500" />
                <Text fontSize="lg" fontWeight="bold" color="info.700">
                  {formatDuration(
                    selectedCourse.startedAt,
                    selectedCourse.completedAt
                  )}
                </Text>
                <Text color="info.600" textAlign="center" fontSize="xs">
                  Time Spent
                </Text>
              </VStack>
            </Box>

            <Box bg="warning.50" borderRadius="lg" p={4} flex={1}>
              <VStack alignItems="center" space={2}>
                <Icon
                  as={Ionicons}
                  name="trophy"
                  size="6"
                  color="warning.500"
                />
                <Text fontSize="lg" fontWeight="bold" color="warning.700">
                  {Math.round(
                    selectedCourse.lessonProgress.reduce(
                      (sum, lp) => sum + lp.score,
                      0
                    ) / selectedCourse.lessonProgress.length
                  )}
                  %
                </Text>
                <Text color="warning.600" textAlign="center" fontSize="xs">
                  Avg Score
                </Text>
              </VStack>
            </Box>
          </HStack>
        </Box>
      </VStack>
    );
  };
  return (
    <Box flex={1} bg="white">
      <Box flex={1} px={4} py={6}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {viewMode === "overview" ? renderOverview() : renderDetailedView()}
        </ScrollView>
      </Box>
    </Box>
  );
};
