import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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
  const fetchUserProfile = async () => {
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
  };

  // Giả lập API call để cập nhật thông tin người dùng
  const updateUserProfile = async (data: Partial<UserProfile>) => {
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
  };

  // Giả lập API call để cập nhật kỹ năng
  const updateUserSkills = async (skills: Skill[]) => {
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
  };

  // Tự động fetch thông tin người dùng khi component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const value = {
    userProfile,
    isLoading,
    error,
    fetchUserProfile,
    updateUserProfile,
    updateUserSkills,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
