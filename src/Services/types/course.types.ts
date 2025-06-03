// Course, Question, and Lesson related types
export interface Question {
  QuestionID: string;
  Question: string;
  Option: string[];
  Answer: number;
  Solution?: string;
}

export interface CreateQuestionDto {
  QuestionID: string;
  Question: string;
  Option: string[];
  Answer: number;
  Solution?: string;
}

export interface UpdateQuestionDto extends Partial<CreateQuestionDto> {}

export interface Lesson {
  LessonID: string;
  Questions: string[]; // Array of question IDs
  Name: string;
  Keyword: string[];
}

export interface CreateLessonDto {
  LessonID: string;
  Questions: string[];
  Name: string;
  Keyword: string[];
}

export interface UpdateLessonDto extends Partial<CreateLessonDto> {}

export interface Course {
  CourseID: string;
  Lessons: string[]; // Array of lesson IDs
  Name: string;
  Description?: string;
  Duration?: number;
  Level?: "Beginner" | "Intermediate" | "Advanced";
  Category?: string;
  ImageUrl?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface CreateCourseDto {
  CourseID: string;
  Lessons: string[];
  Name: string;
  Description?: string;
  Duration?: number;
  Level?: "Beginner" | "Intermediate" | "Advanced";
  Category?: string;
  ImageUrl?: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

// Response types for API
export interface CourseResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}

export interface LessonResponse {
  lessons: Lesson[];
  total: number;
  page: number;
  limit: number;
}

export interface QuestionResponse {
  questions: Question[];
  total: number;
  page: number;
  limit: number;
}

// Query parameters for filtering
export interface CourseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  sortBy?: "name" | "createdAt" | "duration";
  sortOrder?: "asc" | "desc";
}

export interface LessonQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface QuestionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  lessonId?: string;
  sortBy?: "question" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// User progress tracking types
export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId?: string;
  questionId?: string;
  progress: number; // 0-100
  completedAt?: string;
  score?: number;
}

export interface LessonProgress {
  lessonId: string;
  questionsCompleted: number;
  totalQuestions: number;
  score: number;
  completedAt?: string;
}

export interface CourseProgress {
  courseId: string;
  lessonsCompleted: number;
  totalLessons: number;
  overallProgress: number;
  lessonProgress: LessonProgress[];
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}
