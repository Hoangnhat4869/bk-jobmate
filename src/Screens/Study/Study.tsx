import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar, Card, Typography } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";

// Types
interface QuizSet {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  category: string;
  completed: boolean;
  progress: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizData {
  id: string;
  title: string;
  questions: Question[];
}

export const Study = () => {
  // State management
  const [currentView, setCurrentView] = useState<"list" | "quiz">("list");
  const [selectedQuizSet, setSelectedQuizSet] = useState<QuizSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizResults, setQuizResults] = useState<{
    [key: string]: { score: number; completed: boolean; completedAt: Date };
  }>({});

  // Load saved results from localStorage on component mount
  useEffect(() => {
    try {
      const savedResults = localStorage.getItem("quizResults");
      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);
        // Convert date strings back to Date objects
        Object.keys(parsedResults).forEach((key) => {
          if (parsedResults[key].completedAt) {
            parsedResults[key].completedAt = new Date(
              parsedResults[key].completedAt
            );
          }
        });
        setQuizResults(parsedResults);
      }
    } catch (error) {
      console.log("Could not load from localStorage:", error);
    }
  }, []);

  // Base quiz sets data
  const baseQuizSets: QuizSet[] = [
    {
      id: "1",
      title: "Cấu trúc dữ liệu cơ bản",
      description: "Array, Linked List, Stack, Queue",
      questionCount: 5,
      difficulty: "Dễ",
      category: "Computer Science",
      completed: false,
      progress: 0,
    },
    {
      id: "2",
      title: "Thuật toán sắp xếp",
      description: "Bubble Sort, Quick Sort, Merge Sort",
      questionCount: 5,
      difficulty: "Trung bình",
      category: "Algorithms",
      completed: false,
      progress: 0,
    },
    {
      id: "3",
      title: "Đồ thị và cây",
      description: "BFS, DFS, Dijkstra, MST",
      questionCount: 5,
      difficulty: "Khó",
      category: "Graph Theory",
      completed: false,
      progress: 0,
    },
    {
      id: "4",
      title: "Lập trình hướng đối tượng",
      description: "Class, Object, Inheritance, Polymorphism",
      questionCount: 5,
      difficulty: "Trung bình",
      category: "OOP",
      completed: false,
      progress: 0,
    },
    {
      id: "5",
      title: "Cơ sở dữ liệu",
      description: "SQL, NoSQL, Indexing, Normalization",
      questionCount: 5,
      difficulty: "Khó",
      category: "Database",
      completed: false,
      progress: 0,
    },
  ];

  // Merge base data with saved results
  const quizSets: QuizSet[] = baseQuizSets.map((baseSet) => {
    const result = quizResults[baseSet.id];
    if (result) {
      return {
        ...baseSet,
        progress: result.score,
        completed: result.completed,
      };
    }
    return baseSet;
  });

  // Mock quiz data for different topics
  const quizDataMap: { [key: string]: QuizData } = {
    "1": {
      id: "1",
      title: "Cấu trúc dữ liệu cơ bản",
      questions: [
        {
          id: "q1",
          question:
            "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO (Last In First Out)?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          explanation:
            "Stack hoạt động theo nguyên tắc Last In First Out (LIFO).",
        },
        {
          id: "q2",
          question:
            "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (First In First Out)?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          correctAnswer: 1,
          explanation:
            "Queue hoạt động theo nguyên tắc First In First Out (FIFO).",
        },
        {
          id: "q3",
          question:
            "Độ phức tạp thời gian để truy cập một phần tử trong Array là?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correctAnswer: 0,
          explanation:
            "Truy cập phần tử trong Array có độ phức tạp O(1) vì có thể truy cập trực tiếp qua index.",
        },
        {
          id: "q4",
          question:
            "Trong Linked List, để thêm một node vào đầu danh sách có độ phức tạp là?",
          options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
          correctAnswer: 1,
          explanation:
            "Thêm node vào đầu Linked List chỉ cần thay đổi con trỏ head, có độ phức tạp O(1).",
        },
        {
          id: "q5",
          question:
            "Cấu trúc dữ liệu nào phù hợp nhất để kiểm tra dấu ngoặc đóng mở trong biểu thức?",
          options: ["Array", "Queue", "Stack", "Tree"],
          correctAnswer: 2,
          explanation:
            "Stack phù hợp để kiểm tra dấu ngoặc vì có thể push khi gặp ngoặc mở và pop khi gặp ngoặc đóng.",
        },
      ],
    },
    "2": {
      id: "2",
      title: "Thuật toán sắp xếp",
      questions: [
        {
          id: "q1",
          question:
            "Thuật toán nào có độ phức tạp thời gian O(n log n) trong trường hợp trung bình?",
          options: [
            "Bubble Sort",
            "Quick Sort",
            "Selection Sort",
            "Insertion Sort",
          ],
          correctAnswer: 1,
          explanation:
            "Quick Sort có độ phức tạp O(n log n) trong trường hợp trung bình.",
        },
        {
          id: "q2",
          question:
            "Thuật toán sắp xếp nào có độ phức tạp thời gian tốt nhất là O(n)?",
          options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
          correctAnswer: 2,
          explanation:
            "Bubble Sort có thể đạt O(n) trong trường hợp mảng đã được sắp xếp.",
        },
        {
          id: "q3",
          question: "Merge Sort có độ phức tạp không gian là?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correctAnswer: 2,
          explanation:
            "Merge Sort cần thêm O(n) không gian để lưu trữ mảng tạm trong quá trình merge.",
        },
        {
          id: "q4",
          question: "Thuật toán sắp xếp nào là stable sort?",
          options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
          correctAnswer: 2,
          explanation:
            "Merge Sort là stable sort vì không thay đổi thứ tự tương đối của các phần tử bằng nhau.",
        },
        {
          id: "q5",
          question:
            "Trong trường hợp xấu nhất, Quick Sort có độ phức tạp thời gian là?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correctAnswer: 2,
          explanation:
            "Trong trường hợp xấu nhất (pivot luôn là phần tử nhỏ nhất hoặc lớn nhất), Quick Sort có độ phức tạp O(n²).",
        },
      ],
    },
    "3": {
      id: "3",
      title: "Đồ thị và cây",
      questions: [
        {
          id: "q1",
          question:
            "Thuật toán nào được sử dụng để tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh khác?",
          options: ["BFS", "DFS", "Dijkstra", "Kruskal"],
          correctAnswer: 2,
          explanation:
            "Thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác.",
        },
        {
          id: "q2",
          question: "BFS (Breadth-First Search) sử dụng cấu trúc dữ liệu nào?",
          options: ["Stack", "Queue", "Priority Queue", "Array"],
          correctAnswer: 1,
          explanation: "BFS sử dụng Queue để duyệt các đỉnh theo chiều rộng.",
        },
        {
          id: "q3",
          question: "DFS (Depth-First Search) sử dụng cấu trúc dữ liệu nào?",
          options: ["Queue", "Stack", "Heap", "Hash Table"],
          correctAnswer: 1,
          explanation:
            "DFS sử dụng Stack (hoặc đệ quy) để duyệt các đỉnh theo chiều sâu.",
        },
        {
          id: "q4",
          question:
            "Thuật toán nào được sử dụng để tìm cây khung nhỏ nhất (MST)?",
          options: ["Dijkstra", "BFS", "Kruskal", "DFS"],
          correctAnswer: 2,
          explanation:
            "Thuật toán Kruskal (và Prim) được sử dụng để tìm cây khung nhỏ nhất.",
        },
        {
          id: "q5",
          question:
            "Trong cây nhị phân tìm kiếm (BST), độ phức tạp trung bình để tìm kiếm một phần tử là?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: 1,
          explanation:
            "Trong BST cân bằng, độ phức tạp tìm kiếm trung bình là O(log n).",
        },
      ],
    },
    "4": {
      id: "4",
      title: "Lập trình hướng đối tượng",
      questions: [
        {
          id: "q1",
          question:
            "Tính chất nào của OOP cho phép một lớp con kế thừa các thuộc tính và phương thức từ lớp cha?",
          options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction",
          ],
          correctAnswer: 1,
          explanation:
            "Inheritance (Kế thừa) cho phép lớp con kế thừa các thuộc tính và phương thức từ lớp cha.",
        },
        {
          id: "q2",
          question:
            "Tính chất nào của OOP cho phép ẩn giấu thông tin và chỉ cung cấp interface cần thiết?",
          options: [
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Abstraction",
          ],
          correctAnswer: 2,
          explanation:
            "Encapsulation (Đóng gói) cho phép ẩn giấu dữ liệu và chỉ cung cấp interface cần thiết.",
        },
        {
          id: "q3",
          question: "Polymorphism trong OOP có nghĩa là gì?",
          options: [
            "Một lớp chỉ có một hình thái",
            "Nhiều lớp có thể có cùng tên phương thức nhưng hành vi khác nhau",
            "Lớp con không thể ghi đè phương thức của lớp cha",
            "Tất cả các phương thức phải là public",
          ],
          correctAnswer: 1,
          explanation:
            "Polymorphism cho phép các đối tượng khác nhau có thể phản hồi khác nhau cho cùng một thông điệp.",
        },
        {
          id: "q4",
          question: "Abstract class trong OOP là gì?",
          options: [
            "Lớp không thể có phương thức",
            "Lớp không thể được khởi tạo trực tiếp",
            "Lớp chỉ có thuộc tính private",
            "Lớp không thể kế thừa",
          ],
          correctAnswer: 1,
          explanation:
            "Abstract class là lớp không thể được khởi tạo trực tiếp và thường chứa các phương thức abstract.",
        },
        {
          id: "q5",
          question: "Interface trong OOP khác với class như thế nào?",
          options: [
            "Interface có thể có constructor",
            "Interface chỉ định nghĩa signature của phương thức, không có implementation",
            "Interface có thể có thuộc tính private",
            "Interface không thể được implement",
          ],
          correctAnswer: 1,
          explanation:
            "Interface chỉ định nghĩa signature của các phương thức mà không có implementation cụ thể.",
        },
      ],
    },
    "5": {
      id: "5",
      title: "Cơ sở dữ liệu",
      questions: [
        {
          id: "q1",
          question:
            "ACID trong cơ sở dữ liệu đại diện cho những tính chất nào?",
          options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Access, Control, Integration, Data",
            "Authentication, Compression, Indexing, Distribution",
            "Analysis, Computation, Information, Design",
          ],
          correctAnswer: 0,
          explanation:
            "ACID là viết tắt của Atomicity, Consistency, Isolation, Durability - 4 tính chất quan trọng của transaction.",
        },
        {
          id: "q2",
          question: "Primary Key trong cơ sở dữ liệu có đặc điểm gì?",
          options: [
            "Có thể có giá trị NULL",
            "Có thể trùng lặp",
            "Duy nhất và không thể NULL",
            "Chỉ có thể là số",
          ],
          correctAnswer: 2,
          explanation:
            "Primary Key phải có giá trị duy nhất và không thể NULL để đảm bảo tính toàn vẹn dữ liệu.",
        },
        {
          id: "q3",
          question: "Normalization trong cơ sở dữ liệu có mục đích gì?",
          options: [
            "Tăng tốc độ truy vấn",
            "Giảm thiểu redundancy và dependency",
            "Tăng kích thước database",
            "Giảm số lượng bảng",
          ],
          correctAnswer: 1,
          explanation:
            "Normalization giúp giảm thiểu sự trùng lặp dữ liệu và các dependency không mong muốn.",
        },
        {
          id: "q4",
          question: "Index trong cơ sở dữ liệu có tác dụng gì?",
          options: [
            "Tăng kích thước bảng",
            "Tăng tốc độ truy vấn SELECT",
            "Giảm tính toàn vẹn dữ liệu",
            "Xóa dữ liệu tự động",
          ],
          correctAnswer: 1,
          explanation:
            "Index giúp tăng tốc độ truy vấn SELECT bằng cách tạo ra cấu trúc dữ liệu phụ trợ.",
        },
        {
          id: "q5",
          question: "NoSQL database khác với SQL database như thế nào?",
          options: [
            "NoSQL luôn nhanh hơn SQL",
            "NoSQL không hỗ trợ ACID",
            "NoSQL có schema linh hoạt hơn",
            "NoSQL chỉ lưu trữ được text",
          ],
          correctAnswer: 2,
          explanation:
            "NoSQL database có schema linh hoạt, không yêu cầu cấu trúc bảng cố định như SQL database.",
        },
      ],
    },
  };

  // Helper functions
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return COLORS.success;
      case "Trung bình":
        return COLORS.warning;
      case "Khó":
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const handleStartQuiz = (quizSet: QuizSet) => {
    setSelectedQuizSet(quizSet);
    setCurrentView("quiz");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    const currentQuizData = quizDataMap[quizSet.id];
    setUserAnswers(new Array(currentQuizData.questions.length).fill(null));
    setShowResult(false);
    setAnsweredQuestions(new Set());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    // Nếu câu hỏi đã được trả lời, không cho phép thay đổi
    if (answeredQuestions.has(currentQuestionIndex)) {
      return;
    }

    if (!currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    // Đánh dấu câu hỏi đã được trả lời
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestionIndex);
    setAnsweredQuestions(newAnsweredQuestions);

    // Kiểm tra đáp án đúng/sai và hiển thị feedback
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrectAnswer(correct);
    setShowFeedback(true);

    // Ẩn feedback sau 2 giây
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  // Get current quiz data
  const getCurrentQuizData = () => {
    if (!selectedQuizSet) return null;
    return quizDataMap[selectedQuizSet.id];
  };

  const handleNext = () => {
    const currentQuizData = getCurrentQuizData();
    if (!currentQuizData) return;

    if (currentQuestionIndex < currentQuizData.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(userAnswers[nextIndex]);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(userAnswers[prevIndex]);
      setShowFeedback(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (!currentQuizData || !selectedQuizSet) return;

    // Tính điểm
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === currentQuizData.questions[index].correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round(
      (correctCount / currentQuizData.questions.length) * 100
    );
    setFinalScore(score);
    setQuizCompleted(true);

    // Lưu kết quả vào state
    const newResults = {
      ...quizResults,
      [selectedQuizSet.id]: {
        score: score,
        completed: score >= 70,
        completedAt: new Date(),
      },
    };
    setQuizResults(newResults);

    // Lưu vào localStorage để persist data
    try {
      localStorage.setItem("quizResults", JSON.stringify(newResults));
    } catch (error) {
      console.log("Could not save to localStorage:", error);
    }
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedQuizSet(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setAnsweredQuestions(new Set());
    setShowFeedback(false);
    setQuizCompleted(false);
    setFinalScore(0);
  };

  // Get current question and progress
  const currentQuizData = getCurrentQuizData();
  const currentQuestion = currentQuizData?.questions[currentQuestionIndex];
  const progress = currentQuizData
    ? (currentQuestionIndex + 1) / currentQuizData.questions.length
    : 0;

  // Render quiz sets list
  const renderQuizSetsList = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Typography variant="h2" style={styles.pageTitle}>
        Bài học
      </Typography>

      {quizSets.map((quizSet) => (
        <Card key={quizSet.id} style={styles.quizSetCard}>
          <View style={styles.quizSetHeader}>
            <View style={styles.quizSetInfo}>
              <Typography variant="h4" style={styles.quizSetTitle}>
                {quizSet.title}
              </Typography>
              <Typography variant="body2" style={styles.quizSetDescription}>
                {quizSet.description}
              </Typography>
              <View style={styles.quizSetMeta}>
                <View style={styles.metaItem}>
                  <Ionicons
                    name="help-circle-outline"
                    size={16}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.metaText}>
                    {quizSet.questionCount} câu hỏi
                  </Text>
                </View>
                <View
                  style={[
                    styles.difficultyBadge,
                    {
                      backgroundColor:
                        getDifficultyColor(quizSet.difficulty) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(quizSet.difficulty) },
                    ]}
                  >
                    {quizSet.difficulty}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.statusContainer}>
              {quizSet.completed && (
                <View style={styles.completedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.success}
                  />
                  <Text style={styles.completedText}>Hoàn thành</Text>
                </View>
              )}
              {quizSet.progress > 0 && !quizSet.completed && (
                <View style={styles.inProgressBadge}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={COLORS.warning}
                  />
                  <Text style={styles.inProgressText}>Đang làm</Text>
                </View>
              )}
              {quizSet.progress > 0 && (
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreBadgeText}>{quizSet.progress}%</Text>
                </View>
              )}
            </View>
          </View>

          {quizSet.progress > 0 && (
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={quizSet.progress / 100}
                height={6}
                showPercentage={false}
                style={styles.quizProgressBar}
              />
              <Text style={styles.progressText}>
                {quizSet.completed ? "Hoàn thành" : "Đang thực hiện"}:{" "}
                {quizSet.progress}%
              </Text>
              {quizResults[quizSet.id]?.completedAt && (
                <Text style={styles.completedAtText}>
                  Làm lần cuối:{" "}
                  {quizResults[quizSet.id].completedAt.toLocaleDateString(
                    "vi-VN"
                  )}
                </Text>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.practiceButton}
            onPress={() => handleStartQuiz(quizSet)}
          >
            <Text style={styles.practiceButtonText}>Ôn tập</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );

  // Render quiz interface
  const renderQuiz = () => (
    <SafeAreaView style={styles.quizContainer}>
      {/* Header */}
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={handleBackToList}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.quizTitle}>
          Bài học
        </Typography>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.quizProgressContainer}>
        <ProgressBar
          progress={progress}
          height={8}
          showPercentage={false}
          style={styles.topProgressBar}
        />
      </View>

      {/* Quiz Content */}
      <ScrollView
        style={styles.quizContent}
        showsVerticalScrollIndicator={false}
      >
        {quizCompleted ? (
          // Quiz Results
          <View style={styles.resultsContainer}>
            <View style={styles.scoreContainer}>
              <Ionicons
                name={finalScore >= 70 ? "checkmark-circle" : "close-circle"}
                size={80}
                color={finalScore >= 70 ? COLORS.success : COLORS.error}
              />
              <Text style={styles.scoreText}>{finalScore}%</Text>
              <Text style={styles.scoreLabel}>
                {finalScore >= 70
                  ? "Chúc mừng! Bạn đã hoàn thành bài tập"
                  : "Cần cố gắng thêm"}
              </Text>
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Tóm tắt kết quả:</Text>
              <Text style={styles.summaryText}>
                Đúng:{" "}
                {Math.round(
                  (finalScore / 100) * (currentQuizData?.questions.length || 0)
                )}{" "}
                / {currentQuizData?.questions.length || 0} câu
              </Text>
              <Text style={styles.summaryText}>Điểm: {finalScore}%</Text>
            </View>

            <TouchableOpacity
              style={styles.backToListButton}
              onPress={handleBackToList}
            >
              <Text style={styles.backToListButtonText}>
                Quay lại danh sách
              </Text>
            </TouchableOpacity>
          </View>
        ) : currentQuestion ? (
          // Quiz Questions
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>
            </View>

            <View style={styles.answersContainer}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isAnswered = answeredQuestions.has(currentQuestionIndex);
                const userAnswer = userAnswers[currentQuestionIndex];

                let buttonStyle: any = styles.answerButton;
                let textStyle: any = styles.answerText;

                // Nếu câu hỏi chưa được trả lời, chỉ hiển thị trạng thái selected
                if (!isAnswered) {
                  if (isSelected) {
                    buttonStyle = [styles.answerButton, styles.selectedAnswer];
                    textStyle = [styles.answerText, styles.selectedAnswerText];
                  }
                } else {
                  // Nếu câu hỏi đã được trả lời, hiển thị kết quả đúng/sai
                  if (isCorrect) {
                    // Luôn hiển thị đáp án đúng bằng màu xanh
                    buttonStyle = [styles.answerButton, styles.correctAnswer];
                    textStyle = [styles.answerText, styles.correctAnswerText];
                  } else if (index === userAnswer && !isCorrect) {
                    // Hiển thị đáp án sai mà user đã chọn bằng màu đỏ
                    buttonStyle = [styles.answerButton, styles.wrongAnswer];
                    textStyle = [styles.answerText, styles.wrongAnswerText];
                  }
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={buttonStyle}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                  >
                    <Text style={textStyle}>{option}</Text>
                    {isAnswered && isCorrect && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={COLORS.success}
                        style={styles.answerIcon}
                      />
                    )}
                    {isAnswered && index === userAnswer && !isCorrect && (
                      <Ionicons
                        name="close-circle"
                        size={20}
                        color={COLORS.error}
                        style={styles.answerIcon}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Feedback Message */}
            {showFeedback && (
              <View
                style={[
                  styles.feedbackContainer,
                  isCorrectAnswer
                    ? styles.correctFeedback
                    : styles.wrongFeedback,
                ]}
              >
                <Ionicons
                  name={isCorrectAnswer ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={COLORS.white}
                />
                <Text style={styles.feedbackText}>
                  {isCorrectAnswer ? "Chính xác!" : "Sai rồi!"}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={
              currentQuestionIndex === 0 ? COLORS.textSecondary : COLORS.text
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            (!currentQuizData ||
              currentQuestionIndex === currentQuizData.questions.length - 1) &&
              styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={
            !currentQuizData ||
            currentQuestionIndex === currentQuizData.questions.length - 1
          }
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={
              !currentQuizData ||
              currentQuestionIndex === currentQuizData.questions.length - 1
                ? COLORS.textSecondary
                : COLORS.text
            }
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      {!quizCompleted &&
        answeredQuestions.size === currentQuizData?.questions.length && (
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitQuiz}
            >
              <Text style={styles.submitButtonText}>Nộp bài</Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {currentView === "list" ? renderQuizSetsList() : renderQuiz()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  appName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  calendarContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.sm,
  },
  weekDay: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: "500",
    textAlign: "center",
    width: 30,
  },
  calendarDates: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: COLORS.primary,
  },
  dateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    fontWeight: "500",
  },
  selectedDateText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  illustrationPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    padding: SPACING.lg,
    width: "100%",
    height: 120,
    gap: SPACING.md,
  },
  progressSection: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  mainProgress: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderWidth: 8,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  progressPercentage: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  subProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  subProgress: {
    alignItems: "center",
  },
  smallProgressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  smallProgressText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
  },
  progressLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  actionButton: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  actionButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    marginTop: SPACING.xs,
  },
  practiceContainer: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  topProgressBar: {
    backgroundColor: COLORS.inputBackground,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  questionContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  questionText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 28,
  },
  answersContainer: {
    gap: SPACING.md,
  },
  answerButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  selectedAnswer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "10",
  },
  answerText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "500",
  },
  selectedAnswerText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  // New styles for quiz sets list
  pageTitle: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  quizSetCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  quizSetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  quizSetInfo: {
    flex: 1,
  },
  quizSetTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  quizSetDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  quizSetMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: "600",
  },
  completedBadge: {
    marginLeft: SPACING.sm,
  },
  quizProgressBar: {
    backgroundColor: COLORS.inputBackground,
  },
  progressText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  practiceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  practiceButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
  },
  // Quiz interface styles
  quizContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  quizTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  quizProgressContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  quizContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  correctAnswer: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + "10",
  },
  correctAnswerText: {
    color: COLORS.success,
    fontWeight: "600",
  },
  wrongAnswer: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + "10",
  },
  wrongAnswerText: {
    color: COLORS.error,
    fontWeight: "600",
  },
  answerIcon: {
    marginLeft: SPACING.sm,
  },
  // Feedback styles
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  correctFeedback: {
    backgroundColor: COLORS.success,
  },
  wrongFeedback: {
    backgroundColor: COLORS.error,
  },
  feedbackText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  // Submit button styles
  submitContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.success,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  // Results styles
  resultsContainer: {
    alignItems: "center",
    padding: SPACING.lg,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  scoreText: {
    fontSize: FONTS.sizes["3xl"],
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: SPACING.sm,
  },
  scoreLabel: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    width: "100%",
    marginBottom: SPACING.lg,
  },
  summaryTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  summaryText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  backToListButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backToListButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  loadingText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  // Status container styles
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  completedText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.success,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  inProgressBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warning + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  inProgressText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.warning,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  scoreBadge: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  scoreBadgeText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: "700",
  },
  completedAtText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontStyle: "italic",
  },
});
