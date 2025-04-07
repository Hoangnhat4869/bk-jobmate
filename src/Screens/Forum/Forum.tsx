import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Avatar } from '@/Components';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const Forum = () => {
  // Mock data for forum posts
  const posts = [
    {
      id: '1',
      author: 'Nguyễn Văn A',
      title: 'Cách học tiếng Anh hiệu quả',
      content: 'Xin chào mọi người, tôi muốn chia sẻ một số phương pháp học tiếng Anh hiệu quả mà tôi đã áp dụng...',
      likes: 24,
      comments: 8,
      time: '2 giờ trước',
    },
    {
      id: '2',
      author: 'Trần Thị B',
      title: 'Tài liệu luyện thi TOEIC',
      content: 'Mình đang tìm tài liệu luyện thi TOEIC, bạn nào có thể chia sẻ không?',
      likes: 15,
      comments: 12,
      time: '5 giờ trước',
    },
    {
      id: '3',
      author: 'Lê Văn C',
      title: 'Kinh nghiệm phỏng vấn bằng tiếng Anh',
      content: 'Mình vừa trải qua buổi phỏng vấn bằng tiếng Anh và muốn chia sẻ một số kinh nghiệm...',
      likes: 32,
      comments: 15,
      time: '1 ngày trước',
    },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diễn đàn</Text>
        <TouchableOpacity style={styles.newPostButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={styles.newPostText}>Bài viết mới</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Phổ biến</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Mới nhất</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Đã theo dõi</Text>
        </TouchableOpacity>
      </View>
      
      {posts.map(post => (
        <Card key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Avatar size={40} name={post.author} />
            <View style={styles.postAuthorInfo}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>
          
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent} numberOfLines={3}>{post.content}</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </ScrollView>
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
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPostText: {
    marginLeft: SPACING.xs,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.xs,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
  },
  activeFilterText: {
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
  },
  postCard: {
    marginHorizontal: SPACING.md,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  postAuthorInfo: {
    marginLeft: SPACING.sm,
    justifyContent: 'center',
  },
  authorName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text,
  },
  postTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  postTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  postContent: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  actionText: {
    marginLeft: SPACING.xs,
    color: COLORS.textSecondary,
  },
});

