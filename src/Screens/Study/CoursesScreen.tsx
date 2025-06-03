import React, { useState, useEffect } from "react";
import { Box, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CourseList } from "@/Components";
import { useGetCoursesQuery, useGetUserProgressQuery } from "@/Services";
import { Course, CourseQueryParams } from "@/Services/types";
import { StudyStackParamList } from "@/Navigation/Study";

type CoursesNavigationProp = NativeStackNavigationProp<StudyStackParamList>;

export const CoursesScreen = () => {
  const navigation = useNavigation<CoursesNavigationProp>();
  const toast = useToast();

  // Query parameters for courses
  const [queryParams, setQueryParams] = useState<CourseQueryParams>({
    page: 1,
    limit: 20,
    search: "",
    category: "",
    level: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  // API queries
  const {
    data: coursesResponse,
    isLoading: isLoadingCourses,
    error: coursesError,
    refetch: refetchCourses,
  } = useGetCoursesQuery(queryParams);

  const { data: progressResponse, refetch: refetchProgress } =
    useGetUserProgressQuery();

  const courses = coursesResponse?.data?.courses || [];
  const progressData = progressResponse?.data || [];
  // Handle search
  const handleSearch = (query: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: query,
      page: 1,
    }));
  };

  // Handle course selection
  const handleCoursePress = (course: Course) => {
    navigation.navigate("CourseDetail", {
      courseId: course.CourseID,
      course: course,
    });
  };

  // Handle refresh
  const handleRefresh = async () => {
    try {
      await Promise.all([refetchCourses(), refetchProgress()]);
    } catch (error) {
      toast.show({
        title: "Error",
        description: "Failed to refresh courses",
      });
    }
  };
  // Handle errors
  useEffect(() => {
    if (coursesError) {
      toast.show({
        title: "Error",
        description: "Failed to load courses",
      });
    }
  }, [coursesError, toast]);
  return (
    <Box flex={1} bg="white">
      <CourseList
        courses={courses}
        progress={progressData}
        isLoading={isLoadingCourses}
        onCoursePress={handleCoursePress}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
      />
    </Box>
  );
};
