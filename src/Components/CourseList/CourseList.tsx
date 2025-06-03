import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  Heading,
  Badge,
  Progress,
  Button,
  Spinner,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Course, CourseProgress } from "@/Services/types";

export interface ICourseListProps {
  courses: Course[];
  progress?: CourseProgress[];
  isLoading?: boolean;
  onCoursePress: (course: Course) => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onRefresh?: () => void;
}

export const CourseList = (props: ICourseListProps) => {
  const {
    courses,
    progress = [],
    isLoading = false,
    onCoursePress,
    onSearch,
    onFilter,
    onRefresh,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh?.();
    } catch (error) {
      toast.show({
        title: "Error",
        description: "Failed to refresh courses",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    return progress.find((p) => p.courseId === courseId);
  };

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

  const renderCourseItem = ({ item }: { item: Course }) => {
    const courseProgress = getCourseProgress(item.CourseID);

    return (
      <TouchableOpacity onPress={() => onCoursePress(item)}>
        <Box bg="white" p={4} mb={3} borderRadius="md" shadow={1}>
          <VStack space={3}>
            {/* Course Header */}
            <HStack space={3} alignItems="flex-start">
              {item.ImageUrl ? (
                <Image
                  source={{ uri: item.ImageUrl }}
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
                    size="lg"
                    color="gray.400"
                  />
                </Box>
              )}

              <VStack flex={1} space={2}>
                <HStack justifyContent="space-between" alignItems="flex-start">
                  <Heading size="sm" flex={1} numberOfLines={2}>
                    {item.Name}
                  </Heading>
                  {item.Level && (
                    <Badge
                      colorScheme={getLevelColor(item.Level)}
                      variant="subtle"
                      ml={2}
                    >
                      {item.Level}
                    </Badge>
                  )}
                </HStack>

                {item.Description && (
                  <Text color="gray.600" fontSize="sm" numberOfLines={2}>
                    {item.Description}
                  </Text>
                )}

                <HStack space={4} alignItems="center">
                  <HStack space={1} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="book-outline"
                      size="xs"
                      color="gray.500"
                    />
                    <Text fontSize="xs" color="gray.500">
                      {item.Lessons.length} lessons
                    </Text>
                  </HStack>

                  {item.Duration && (
                    <HStack space={1} alignItems="center">
                      <Icon
                        as={Ionicons}
                        name="time-outline"
                        size="xs"
                        color="gray.500"
                      />
                      <Text fontSize="xs" color="gray.500">
                        {item.Duration} mins
                      </Text>
                    </HStack>
                  )}

                  {item.Category && (
                    <HStack space={1} alignItems="center">
                      <Icon
                        as={Ionicons}
                        name="folder-outline"
                        size="xs"
                        color="gray.500"
                      />
                      <Text fontSize="xs" color="gray.500">
                        {item.Category}
                      </Text>
                    </HStack>
                  )}
                </HStack>
              </VStack>
            </HStack>

            {/* Progress Section */}
            {courseProgress && (
              <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" color="gray.600">
                    Progress: {courseProgress.lessonsCompleted}/
                    {courseProgress.totalLessons} lessons
                  </Text>
                  <Text fontSize="sm" color="primary.500" fontWeight="500">
                    {Math.round(courseProgress.overallProgress)}%
                  </Text>
                </HStack>
                <Progress
                  value={courseProgress.overallProgress}
                  colorScheme="primary"
                  size="sm"
                />
              </VStack>
            )}

            {/* Action Button */}
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs" color="gray.500">
                {courseProgress ? "Continue Learning" : "Start Course"}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={
                  <Icon as={Ionicons} name="chevron-forward" size="xs" />
                }
                onPress={() => onCoursePress(item)}
              >
                {courseProgress?.overallProgress === 100 ? "Review" : "Open"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <Box flex={1} justifyContent="center" alignItems="center" py={10}>
      <Icon
        as={Ionicons}
        name="book-outline"
        size="3xl"
        color="gray.300"
        mb={4}
      />
      <Heading size="md" color="gray.400" mb={2}>
        No courses found
      </Heading>
      <Text color="gray.400" textAlign="center">
        {searchQuery
          ? "Try adjusting your search terms"
          : "Check back later for new courses"}
      </Text>
    </Box>
  );

  if (isLoading && courses.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size="lg" color="primary.500" />
        <Text mt={4} color="gray.500">
          Loading courses...
        </Text>
      </Box>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Search Header */}
      <Box p={4} bg="white" borderBottomWidth={1} borderBottomColor="gray.100">
        <HStack space={2} alignItems="center">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={handleSearch}
            flex={1}
            borderRadius="full"
            py={2}
            px={3}
            fontSize={14}
            InputLeftElement={
              <Icon
                as={Ionicons}
                name="search"
                size={5}
                ml={2}
                color="gray.400"
              />
            }
          />
          {onFilter && (
            <TouchableOpacity onPress={onFilter}>
              <Box p={2} borderRadius="full" bg="gray.100">
                <Icon
                  as={Ionicons}
                  name="options-outline"
                  size={5}
                  color="gray.600"
                />
              </Box>
            </TouchableOpacity>
          )}
        </HStack>
      </Box>

      {/* Course List */}
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.CourseID}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
            />
          ) : undefined
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});
