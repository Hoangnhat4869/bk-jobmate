import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StudyContainer,
  CoursesScreen,
  CourseDetailScreen,
  LessonDetailScreen,
  QuizScreen,
  QuizResultsScreen,
  ProgressScreen,
} from "@/Screens/Study";
import { Course } from "@/Services/types";

// Define the param list for the Study stack navigator
export type StudyStackParamList = {
  StudyMain: undefined;
  Courses: undefined;
  CourseDetail: {
    courseId: string;
    course?: Course;
  };
  LessonDetail: {
    lessonId: string;
    courseId: string;
    lessonIndex?: number;
    lessons?: any[]; // Lesson array for navigation
  };
  Quiz: {
    lessonId: string;
    courseId: string;
    questions?: any[]; // Question array
    startQuestionIndex?: number;
    timeLimit?: number;
  };
  QuizResults: {
    lessonId: string;
    courseId: string;
    questions: any[]; // Question array
    answers: Array<{
      questionId: string;
      selectedAnswer: number;
      timeSpent: number;
      isCorrect: boolean;
    }>;
    totalScore: number;
    totalTime: number;
  };
  Progress: undefined;
};

const StudyStack = createNativeStackNavigator<StudyStackParamList>();

export const StudyStackNavigator = () => {
  return (
    <StudyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="StudyMain"
    >
      <StudyStack.Screen
        name="StudyMain"
        component={StudyContainer}
        options={{
          title: "Study",
        }}
      />
      <StudyStack.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          title: "All Courses",
        }}
      />
      <StudyStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          title: "Course Details",
        }}
      />
      <StudyStack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{
          title: "Lesson",
        }}
      />
      <StudyStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: "Quiz",
        }}
      />
      <StudyStack.Screen
        name="QuizResults"
        component={QuizResultsScreen}
        options={{
          title: "Quiz Results",
        }}
      />
      <StudyStack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          title: "Progress",
        }}
      />
    </StudyStack.Navigator>
  );
};
