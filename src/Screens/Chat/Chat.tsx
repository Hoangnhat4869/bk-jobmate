import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Card, Avatar } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

// Types for messages
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  timestamp: number;
}

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Xin chào! Tôi là trợ lý AI phỏng vấn. Tôi có thể giúp bạn luyện tập phỏng vấn bằng tiếng Anh hoặc tiếng Việt. Bạn muốn bắt đầu không?",
      time: "10:00",
      timestamp: Date.now() - 300000,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Simulate bot responses
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("xin chào")
    ) {
      return "Hello! I'm your interview assistant. What position are you preparing for?";
    }

    if (
      lowerMessage.includes("software") ||
      lowerMessage.includes("developer") ||
      lowerMessage.includes("engineer")
    ) {
      return "Great! Let's start with a common question: Can you tell me about yourself and your experience in software development?";
    }

    if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("background")
    ) {
      return "That's a good start! Now, can you describe a challenging project you've worked on and how you overcame the difficulties?";
    }

    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("challenge")
    ) {
      return "Excellent! Here's another question: What programming languages and technologies are you most comfortable with, and why?";
    }

    if (
      lowerMessage.includes("language") ||
      lowerMessage.includes("technology") ||
      lowerMessage.includes("skill")
    ) {
      return "Good answer! Let me ask you this: Where do you see yourself in 5 years, and how does this position align with your career goals?";
    }

    if (
      lowerMessage.includes("goal") ||
      lowerMessage.includes("future") ||
      lowerMessage.includes("career")
    ) {
      return "That's a thoughtful response! Do you have any questions about our company or the role you're applying for?";
    }

    if (
      lowerMessage.includes("question") ||
      lowerMessage.includes("company") ||
      lowerMessage.includes("role")
    ) {
      return "Great questions! You're doing well in this practice interview. Would you like to continue with more technical questions or wrap up here?";
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Can you elaborate on that?",
      "Good point! What would you say is your biggest strength in this area?",
      "I see. How do you think this experience has prepared you for this role?",
      "That's a valuable skill. Can you give me a specific example?",
      "Excellent! What challenges did you face and how did you overcome them?",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    const timestamp = Date.now();

    // Add user message
    const newUserMessage: Message = {
      id: `user_${timestamp}`,
      sender: "user",
      text: userMessage,
      time: formatTime(timestamp),
      timestamp,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time (1-3 seconds)
    const thinkingTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const botTimestamp = Date.now();

      const newBotMessage: Message = {
        id: `bot_${botTimestamp}`,
        sender: "bot",
        text: botResponse,
        time: formatTime(botTimestamp),
        timestamp: botTimestamp,
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleSuggestionPress = (suggestionText: string) => {
    setMessage(suggestionText);
  };

  const handleClearChat = () => {
    Alert.alert(
      "Xóa cuộc trò chuyện",
      "Bạn có chắc chắn muốn xóa toàn bộ cuộc trò chuyện?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setMessages([
              {
                id: "1",
                sender: "bot",
                text: "Xin chào! Tôi là trợ lý AI phỏng vấn. Tôi có thể giúp bạn luyện tập phỏng vấn bằng tiếng Anh hoặc tiếng Việt. Bạn muốn bắt đầu không?",
                time: formatTime(Date.now()),
                timestamp: Date.now(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Phòng vấn</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleClearChat}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.sender === "user"
                  ? styles.userMessageWrapper
                  : styles.botMessageWrapper,
              ]}
            >
              {msg.sender === "bot" && (
                <Avatar
                  size={32}
                  name="AI"
                  placeholderColor={COLORS.primary}
                  style={styles.botAvatar}
                />
              )}
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === "user"
                      ? styles.userMessageText
                      : styles.botMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    msg.sender === "user"
                      ? styles.userMessageTime
                      : styles.botMessageTime,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
              <Avatar
                size={32}
                name="AI"
                placeholderColor={COLORS.primary}
                style={styles.botAvatar}
              />
              <View
                style={[
                  styles.messageBubble,
                  styles.botMessage,
                  styles.typingBubble,
                ]}
              >
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={COLORS.placeholder}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() ? styles.sendButtonDisabled : {},
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={!message.trim() ? COLORS.gray : COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Card style={styles.suggestionsCard}>
        <Text style={styles.suggestionsTitle}>Gợi ý câu trả lời</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.suggestionChip}
            onPress={() =>
              handleSuggestionPress(
                "I have 5 years of experience in software development..."
              )
            }
          >
            <Text style={styles.suggestionText}>
              I have 5 years of experience...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionChip}
            onPress={() =>
              handleSuggestionPress(
                "My background is in computer science and web development..."
              )
            }
          >
            <Text style={styles.suggestionText}>My background is in...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionChip}
            onPress={() =>
              handleSuggestionPress(
                "I graduated from Bach Khoa University with a degree in Computer Science..."
              )
            }
          >
            <Text style={styles.suggestionText}>I graduated from...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionChip}
            onPress={() =>
              handleSuggestionPress(
                "Hello! I'm ready to start the interview practice."
              )
            }
          >
            <Text style={styles.suggestionText}>Ready to start!</Text>
          </TouchableOpacity>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: FONTS.sizes["2xl"],
    fontWeight: FONTS.weights.bold as "700",
    color: COLORS.text,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  messagesContainer: {
    flex: 1,
  },
  messageWrapper: {
    marginBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  botMessageWrapper: {
    justifyContent: "flex-start",
  },
  botAvatar: {
    marginRight: SPACING.xs,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: SPACING.md,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: COLORS.inputBackground,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  userMessageText: {
    color: COLORS.white,
  },
  botMessageText: {
    color: COLORS.text,
  },
  messageTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    alignSelf: "flex-end",
    marginTop: SPACING.xs,
  },
  userMessageTime: {
    color: COLORS.white,
    opacity: 0.8,
  },
  botMessageTime: {
    color: COLORS.textSecondary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    maxHeight: 100,
    fontSize: FONTS.sizes.md,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SPACING.sm,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.inputBackground,
  },
  suggestionsCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  suggestionsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium as "500",
    marginBottom: SPACING.sm,
  },
  suggestionChip: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    marginRight: SPACING.sm,
  },
  suggestionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  // Typing indicator styles
  typingBubble: {
    minHeight: 40,
    justifyContent: "center",
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textSecondary,
    marginHorizontal: 2,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 1,
  },
});
