import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import { Card, Avatar, Button, Typography } from "@/Components";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

// Types
interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  timestamp: number;
}

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  time: string;
  timestamp: number;
  isLiked: boolean;
}

export const Forum = () => {
  // State management
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Nguyễn Văn A",
      title: "Thuật toán Dijkstra trong lập trình",
      content:
        "Xin chào mọi người, tôi muốn chia sẻ về thuật toán Dijkstra để tìm đường đi ngắn nhất trong đồ thị có trọng số. Đây là một thuật toán rất quan trọng trong khoa học máy tính và có nhiều ứng dụng thực tế.",
      likes: 24,
      comments: [
        {
          id: "c1",
          author: "Trần Văn B",
          content: "Cảm ơn bạn đã chia sẻ! Thuật toán này rất hữu ích.",
          time: "1 giờ trước",
          timestamp: Date.now() - 3600000,
        },
        {
          id: "c2",
          author: "Lê Thị C",
          content: "Bạn có thể chia sẻ code implementation không?",
          time: "30 phút trước",
          timestamp: Date.now() - 1800000,
        },
      ],
      time: "2 giờ trước",
      timestamp: Date.now() - 7200000,
      isLiked: false,
    },
    {
      id: "2",
      author: "Trần Thị B",
      title: "Tài liệu học Machine Learning",
      content:
        "Mình đang tìm tài liệu học Machine Learning cho người mới bắt đầu, bạn nào có thể chia sẻ không? Mình muốn học từ cơ bản đến nâng cao.",
      likes: 15,
      comments: [
        {
          id: "c3",
          author: "Nguyễn Văn D",
          content: "Mình recommend khóa học của Andrew Ng trên Coursera.",
          time: "2 giờ trước",
          timestamp: Date.now() - 7200000,
        },
      ],
      time: "5 giờ trước",
      timestamp: Date.now() - 18000000,
      isLiked: true,
    },
    {
      id: "3",
      author: "Lê Văn C",
      title: "Kinh nghiệm phỏng vấn Software Engineer",
      content:
        "Mình vừa trải qua buổi phỏng vấn Software Engineer và muốn chia sẻ một số kinh nghiệm về các câu hỏi kỹ thuật. Hy vọng sẽ giúp ích cho các bạn đang chuẩn bị phỏng vấn.",
      likes: 32,
      comments: [],
      time: "1 ngày trước",
      timestamp: Date.now() - 86400000,
      isLiked: false,
    },
  ]);

  // Modal states
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Form states
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");

  // Helper functions
  const formatTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return "Vừa xong";
  };

  // Action handlers
  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleShowComments = (post: Post) => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: Comment = {
      id: `c_${Date.now()}`,
      author: "Bạn", // In real app, get from user context
      content: newComment.trim(),
      time: formatTime(Date.now()),
      timestamp: Date.now(),
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setNewComment("");
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ tiêu đề và nội dung");
      return;
    }

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: "Bạn", // In real app, get from user context
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      likes: 0,
      comments: [],
      time: formatTime(Date.now()),
      timestamp: Date.now(),
      isLiked: false,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostModal(false);
    Alert.alert("Thành công", "Bài viết đã được đăng!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diễn đàn</Text>
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => setShowNewPostModal(true)}
        >
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

      {posts.map((post) => (
        <Card key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Avatar size={40} name={post.author} />
            <View style={styles.postAuthorInfo}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>

          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent} numberOfLines={3}>
            {post.content}
          </Text>

          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(post.id)}
            >
              <Ionicons
                name={post.isLiked ? "heart" : "heart-outline"}
                size={20}
                color={post.isLiked ? COLORS.error : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.actionText,
                  post.isLiked && { color: COLORS.error },
                ]}
              >
                {post.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShowComments(post)}
            >
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <Text style={styles.actionText}>{post.comments.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="share-outline"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      {/* New Post Modal */}
      <Modal
        visible={showNewPostModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowNewPostModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Typography variant="h3" style={styles.modalTitle}>
              Bài viết mới
            </Typography>
            <TouchableOpacity onPress={handleCreatePost}>
              <Text style={styles.postButton}>Đăng</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Typography variant="subtitle1" style={styles.inputLabel}>
                Tiêu đề
              </Typography>
              <TextInput
                style={styles.titleInput}
                placeholder="Nhập tiêu đề bài viết..."
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                multiline={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Typography variant="subtitle1" style={styles.inputLabel}>
                Nội dung
              </Typography>
              <TextInput
                style={styles.contentInput}
                placeholder="Chia sẻ suy nghĩ của bạn..."
                value={newPostContent}
                onChangeText={setNewPostContent}
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={showCommentsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCommentsModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Typography variant="h3" style={styles.modalTitle}>
              Bình luận
            </Typography>
            <View style={{ width: 24 }} />
          </View>

          {selectedPost && (
            <ScrollView style={styles.modalContent}>
              {/* Original Post */}
              <Card style={styles.originalPost}>
                <View style={styles.postHeader}>
                  <Avatar size={40} name={selectedPost.author} />
                  <View style={styles.postAuthorInfo}>
                    <Text style={styles.authorName}>{selectedPost.author}</Text>
                    <Text style={styles.postTime}>{selectedPost.time}</Text>
                  </View>
                </View>
                <Text style={styles.postTitle}>{selectedPost.title}</Text>
                <Text style={styles.postContent}>{selectedPost.content}</Text>
              </Card>

              {/* Comments List */}
              <View style={styles.commentsSection}>
                <Typography variant="h4" style={styles.commentsTitle}>
                  Bình luận ({selectedPost.comments.length})
                </Typography>

                {selectedPost.comments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <Avatar size={32} name={comment.author} />
                    <View style={styles.commentContent}>
                      <View style={styles.commentBubble}>
                        <Text style={styles.commentAuthor}>
                          {comment.author}
                        </Text>
                        <Text style={styles.commentText}>
                          {comment.content}
                        </Text>
                      </View>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Add Comment */}
              <View style={styles.addCommentSection}>
                <View style={styles.commentInputContainer}>
                  <Avatar size={32} name="Bạn" />
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline={true}
                  />
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Ionicons
                      name="send"
                      size={20}
                      color={
                        newComment.trim()
                          ? COLORS.primary
                          : COLORS.textSecondary
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </ScrollView>
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
  newPostButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  newPostText: {
    marginLeft: SPACING.xs,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium as "500",
  },
  filterContainer: {
    flexDirection: "row",
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
    fontWeight: FONTS.weights.medium as "500",
  },
  postCard: {
    marginHorizontal: SPACING.md,
  },
  postHeader: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
  },
  postAuthorInfo: {
    marginLeft: SPACING.sm,
    justifyContent: "center",
  },
  authorName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium as "500",
    color: COLORS.text,
  },
  postTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  postTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold as "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  postContent: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.lg,
  },
  actionText: {
    marginLeft: SPACING.xs,
    color: COLORS.textSecondary,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  modalTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  postButton: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.primary,
  },
  modalContent: {
    flex: 1,
    padding: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    minHeight: 120,
  },
  // Comments styles
  originalPost: {
    marginBottom: SPACING.lg,
  },
  commentsSection: {
    marginBottom: SPACING.lg,
  },
  commentsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: SPACING.md,
    alignItems: "flex-start",
  },
  commentContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  commentBubble: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  commentAuthor: {
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  commentText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  commentTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  addCommentSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
    marginTop: SPACING.md,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    marginHorizontal: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    maxHeight: 100,
  },
  sendButton: {
    padding: SPACING.xs,
  },
});
