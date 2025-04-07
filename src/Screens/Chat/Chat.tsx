import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Avatar } from '@/Components';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const Chat = () => {
  const [message, setMessage] = useState('');
  
  // Mock data for chat messages
  const messages = [
    {
      id: '1',
      sender: 'bot',
      text: 'Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?',
      time: '10:00',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Tôi muốn luyện tập phỏng vấn bằng tiếng Anh',
      time: '10:01',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Tuyệt vời! Chúng ta có thể bắt đầu với một số câu hỏi phỏng vấn cơ bản. Bạn đã sẵn sàng chưa?',
      time: '10:01',
    },
    {
      id: '4',
      sender: 'user',
      text: 'Vâng, tôi đã sẵn sàng',
      time: '10:02',
    },
    {
      id: '5',
      sender: 'bot',
      text: 'Câu hỏi đầu tiên: Can you tell me about yourself and your background?',
      time: '10:02',
    },
  ];
  
  const handleSend = () => {
    if (message.trim()) {
      // In a real app, we would add the message to the messages array
      // and send it to the server
      setMessage('');
    }
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Phòng vấn</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.chatContainer}>
        <ScrollView style={styles.messagesContainer}>
          {messages.map(msg => (
            <View 
              key={msg.id} 
              style={[
                styles.messageWrapper,
                msg.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper
              ]}
            >
              {msg.sender === 'bot' && (
                <Avatar 
                  size={32} 
                  name="AI Assistant" 
                  placeholderColor={COLORS.primary}
                  style={styles.botAvatar}
                />
              )}
              <View 
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userMessage : styles.botMessage
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            </View>
          ))}
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
              !message.trim() ? styles.sendButtonDisabled : {}
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
          <TouchableOpacity style={styles.suggestionChip}>
            <Text style={styles.suggestionText}>I have 5 years of experience...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionChip}>
            <Text style={styles.suggestionText}>My background is in...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionChip}>
            <Text style={styles.suggestionText}>I graduated from...</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: FONTS.weights.bold,
    color: COLORS.text,
  },
  infoButton: {
    padding: SPACING.xs,
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
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    marginRight: SPACING.xs,
  },
  messageBubble: {
    maxWidth: '80%',
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
  messageTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    alignSelf: 'flex-end',
    marginTop: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: FONTS.weights.medium,
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
});
