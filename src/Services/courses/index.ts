import { API } from "../base";
import {
  Course,
  CreateCourseDto,
  UpdateCourseDto,
  Lesson,
  CreateLessonDto,
  UpdateLessonDto,
  Question,
  CreateQuestionDto,
  UpdateQuestionDto,
  CourseResponse,
  LessonResponse,
  QuestionResponse,
  CourseQueryParams,
  LessonQueryParams,
  QuestionQueryParams,
  ApiResponse,
  CourseProgress,
  UserProgress,
} from "../types";

const coursesApi = API.injectEndpoints({
  endpoints: (build) => ({
    // Course endpoints
    getCourses: build.query<ApiResponse<CourseResponse>, CourseQueryParams>({
      query: (params) => ({
        url: "courses",
        params,
      }),
      providesTags: ["Course"],
    }),

    getCourse: build.query<ApiResponse<Course>, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    createCourse: build.mutation<ApiResponse<Course>, CreateCourseDto>({
      query: (courseData) => ({
        url: "courses",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: build.mutation<
      ApiResponse<Course>,
      { id: string; data: UpdateCourseDto }
    >({
      query: ({ id, data }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),

    deleteCourse: build.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Lesson endpoints
    getLessons: build.query<ApiResponse<LessonResponse>, LessonQueryParams>({
      query: (params) => ({
        url: "courses/lessons",
        params,
      }),
      providesTags: ["Lesson"],
    }),

    getLesson: build.query<ApiResponse<Lesson>, string>({
      query: (id) => `courses/lessons/${id}`,
      providesTags: (result, error, id) => [{ type: "Lesson", id }],
    }),

    createLesson: build.mutation<ApiResponse<Lesson>, CreateLessonDto>({
      query: (lessonData) => ({
        url: "courses/lessons",
        method: "POST",
        body: lessonData,
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),

    updateLesson: build.mutation<
      ApiResponse<Lesson>,
      { id: string; data: UpdateLessonDto }
    >({
      query: ({ id, data }) => ({
        url: `courses/lessons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Lesson", id }],
    }),

    deleteLesson: build.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `courses/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),

    // Question endpoints
    getQuestions: build.query<
      ApiResponse<QuestionResponse>,
      QuestionQueryParams
    >({
      query: (params) => ({
        url: "courses/questions",
        params,
      }),
      providesTags: ["Question"],
    }),

    getQuestion: build.query<ApiResponse<Question>, string>({
      query: (id) => `courses/questions/${id}`,
      providesTags: (result, error, id) => [{ type: "Question", id }],
    }),

    createQuestion: build.mutation<ApiResponse<Question>, CreateQuestionDto>({
      query: (questionData) => ({
        url: "courses/questions",
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: ["Question", "Lesson"],
    }),

    updateQuestion: build.mutation<
      ApiResponse<Question>,
      { id: string; data: UpdateQuestionDto }
    >({
      query: ({ id, data }) => ({
        url: `courses/questions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Question", id }],
    }),

    deleteQuestion: build.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `courses/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question", "Lesson"],
    }),

    // User progress endpoints
    getUserProgress: build.query<ApiResponse<CourseProgress[]>, void>({
      query: () => "courses/progress",
      providesTags: ["Progress"],
    }),

    getCourseProgress: build.query<ApiResponse<CourseProgress>, string>({
      query: (courseId) => `courses/${courseId}/progress`,
      providesTags: (result, error, courseId) => [
        { type: "Progress", id: courseId },
      ],
    }),

    updateProgress: build.mutation<ApiResponse<UserProgress>, UserProgress>({
      query: (progressData) => ({
        url: "courses/progress",
        method: "POST",
        body: progressData,
      }),
      invalidatesTags: ["Progress"],
    }),

    // Quiz/Assessment endpoints
    submitAnswer: build.mutation<
      ApiResponse<{ correct: boolean; explanation?: string; score?: number }>,
      { questionId: string; answer: number; lessonId?: string }
    >({
      query: (answerData) => ({
        url: "courses/questions/submit",
        method: "POST",
        body: answerData,
      }),
      invalidatesTags: ["Progress"],
    }),

    submitQuiz: build.mutation<
      ApiResponse<{
        score: number;
        passed: boolean;
        totalQuestions: number;
        correctAnswers: number;
      }>,
      {
        courseId: string;
        lessonId: string;
        answers: Array<{
          questionId: string;
          selectedAnswer: number;
          timeSpent: number;
        }>;
        score: number;
        totalTime: number;
      }
    >({
      query: (quizData) => ({
        url: "courses/lessons/quiz/submit",
        method: "POST",
        body: quizData,
      }),
      invalidatesTags: ["Progress", "Lesson"],
    }),
  }),
  overrideExisting: false,
});

export const {
  // Course hooks
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,

  // Lesson hooks
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,

  // Question hooks
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  // Progress hooks
  useGetUserProgressQuery,
  useGetCourseProgressQuery,
  useUpdateProgressMutation,
  // Quiz hooks
  useSubmitAnswerMutation,
  useSubmitQuizMutation,
} = coursesApi;
