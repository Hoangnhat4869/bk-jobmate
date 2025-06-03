import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu dữ liệu cho thông tin người dùng
export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  title: string;
  bio: string;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  isOnline: boolean;
}

// Mock data cho thông tin người dùng
const mockUserProfile: UserProfile = {
  id: "1",
  name: "Nhat Truong",
  email: "nhat.truong@example.com",
  avatar: null,
  title: "Fresher Software Engineer",
  bio: "Là một sinh viên năm cuối đang học ngành Khoa học Máy tính tại trường Đại học Bách khoa TPHCM. Tôi có kinh nghiệm trong phát triển ứng dụng web và mobile. Ngoài ra, tôi cũng có kinh nghiệm trong nghiên cứu khoa học và phát triển trí tuệ nhân tạo. Tôi luôn tìm kiếm cơ hội để học hỏi và phát triển bản thân.",
  skills: [
    { id: "1", name: "C++" },
    { id: "2", name: "Python" },
    { id: "3", name: "Github" },
    { id: "4", name: "Machine Learning" },
    { id: "5", name: "JavaScript" },
    { id: "6", name: "Generative AI" },
    { id: "7", name: "Java" },
  ],
  experiences: [
    {
      id: "1",
      title: "Software Engineer Intern",
      company: "Bizzi Vietnam",
      description:
        "Tôi đã làm việc trong một công ty phát triển phần mềm trực tuyến và đã phát triển một sản phẩm mới cho công ty. Tôi đã tham gia vào việc phát triển một trang web để quản lý các dự án của công ty.",
      startDate: "2024-06",
      endDate: "2024-08",
    },
    {
      id: "2",
      title: "Fresher AI Product Engineer",
      company: "Bizzi Vietnam",
      description:
        "Tôi đang làm việc trong một công ty FinTech và tham gia vào việc phát triển các sản phẩm AI cho công ty.",
      startDate: "2024-09",
      endDate: "hiện tại",
    },
  ],
  education: [
    {
      id: "1",
      school: "Ho Chi Minh City University of Technology",
      degree: "Bachelor",
      field: "Computer Science",
      startDate: "2021",
      endDate: "hiện tại",
    },
  ],
  isOnline: true,
};

// Định nghĩa kiểu dữ liệu cho context
interface UserContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateUserSkills: (skills: Skill[]) => Promise<void>;
  syncGoogleUserData: (googleUser: {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
  }) => Promise<void>;
}

// Tạo context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook để sử dụng context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Giả lập API call để lấy thông tin người dùng
  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Giả lập API call với timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Trả về mock data
      setUserProfile(mockUserProfile);
    } catch (err) {
      setError("Failed to fetch user profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Giả lập API call để cập nhật thông tin người dùng
  const updateUserProfile = useCallback(async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Giả lập API call với timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Cập nhật thông tin người dùng
      setUserProfile((prev) => (prev ? { ...prev, ...data } : null));
    } catch (err) {
      setError("Failed to update user profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Giả lập API call để cập nhật kỹ năng
  const updateUserSkills = useCallback(async (skills: Skill[]) => {
    setIsLoading(true);
    setError(null);

    try {
      // Giả lập API call với timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Cập nhật kỹ năng
      setUserProfile((prev) => (prev ? { ...prev, skills } : null));
    } catch (err) {
      setError("Failed to update user skills");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync Google user data với mock data
  const syncGoogleUserData = useCallback(
    async (googleUser: {
      id: string;
      email: string;
      displayName: string;
      photoURL?: string;
    }) => {
      console.log("🔄 UserContext: Syncing Google user data");
      console.log("📋 Google user input:", googleUser);

      try {
        setIsLoading(true);
        setError(null);

        console.log("📝 Google user displayName:", googleUser.displayName);
        console.log("📧 Google user email:", googleUser.email);
        console.log("🖼️ Google user photoURL:", googleUser.photoURL);

        // Tạo user profile từ Google data + mock data
        const syncedProfile: UserProfile = {
          ...mockUserProfile, // Giữ mock data cho skills, experiences, etc.
          id: googleUser.id,
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL || null,
          title: `${googleUser.displayName} - Google User`,
          bio: `Xin chào! Tôi là ${googleUser.displayName}. Tôi đã đăng nhập bằng tài khoản Google và đang khám phá ứng dụng BK Jobmate.`,
        };

        console.log("📝 Final synced profile name:", syncedProfile.name);
        console.log("📧 Final synced profile email:", syncedProfile.email);
        console.log("🖼️ Final synced profile avatar:", syncedProfile.avatar);

        console.log("✅ UserContext: Created synced profile:", syncedProfile);
        setUserProfile(syncedProfile);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        console.log("✅ UserContext: Google user data sync completed");
      } catch (err) {
        console.error("❌ UserContext: Failed to sync Google user data:", err);
        setError("Failed to sync Google user data");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Check for Google sync data
  const checkGoogleSyncData = useCallback(async () => {
    try {
      const syncDataStr = await AsyncStorage.getItem("googleSyncData");
      if (syncDataStr) {
        console.log("🔍 Found Google sync data in AsyncStorage");
        const syncData = JSON.parse(syncDataStr);
        console.log("📋 Google sync data:", syncData);

        // Sync the data
        await syncGoogleUserData(syncData);

        // Clear the sync data after use
        await AsyncStorage.removeItem("googleSyncData");
        console.log("🗑️ Cleared Google sync data from AsyncStorage");
      } else {
        console.log("ℹ️ No Google sync data found, using mock data");
        // Fetch regular mock profile
        await fetchUserProfile();
      }
    } catch (error) {
      console.error("❌ Error checking Google sync data:", error);
      // Fallback to regular fetch
      await fetchUserProfile();
    }
  }, [syncGoogleUserData, fetchUserProfile]);

  // Tự động fetch thông tin người dùng khi component mount
  useEffect(() => {
    checkGoogleSyncData();
  }, [checkGoogleSyncData]);

  const value = {
    userProfile,
    isLoading,
    error,
    fetchUserProfile,
    updateUserProfile,
    updateUserSkills,
    syncGoogleUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
