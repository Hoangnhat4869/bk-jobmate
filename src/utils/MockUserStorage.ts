import AsyncStorage from "@react-native-async-storage/async-storage";

export interface MockUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  photoURL?: string;
  authMethod: "email" | "google";
  createdAt: string;
}

const MOCK_USERS_KEY = "mock_users";
const CURRENT_USER_KEY = "current_mock_user";

export class MockUserStorage {
  // Lấy tất cả users đã đăng ký
  static async getAllUsers(): Promise<MockUser[]> {
    try {
      const usersStr = await AsyncStorage.getItem(MOCK_USERS_KEY);
      return usersStr ? JSON.parse(usersStr) : [];
    } catch (error) {
      console.error("Error getting all users:", error);
      return [];
    }
  }

  // Lưu user mới
  static async saveUser(user: MockUser): Promise<void> {
    try {
      const users = await this.getAllUsers();
      const existingIndex = users.findIndex(u => u.email === user.email);
      
      if (existingIndex >= 0) {
        users[existingIndex] = user; // Update existing user
      } else {
        users.push(user); // Add new user
      }
      
      await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
      console.log("✅ User saved to mock storage:", user.email);
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }

  // Tìm user theo email
  static async findUserByEmail(email: string): Promise<MockUser | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(u => u.email === email) || null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  }

  // Verify password
  static async verifyUser(email: string, password: string): Promise<MockUser | null> {
    try {
      const user = await this.findUserByEmail(email);
      if (user && user.password === password) {
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error verifying user:", error);
      return null;
    }
  }

  // Lưu current user
  static async setCurrentUser(user: MockUser): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      console.log("✅ Current user set:", user.email);
    } catch (error) {
      console.error("Error setting current user:", error);
      throw error;
    }
  }

  // Lấy current user
  static async getCurrentUser(): Promise<MockUser | null> {
    try {
      const userStr = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // Clear current user (logout)
  static async clearCurrentUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      console.log("✅ Current user cleared");
    } catch (error) {
      console.error("Error clearing current user:", error);
      throw error;
    }
  }

  // Register new user
  static async registerUser(email: string, password: string, displayName: string): Promise<MockUser> {
    try {
      // Check if user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // Create new user
      const newUser: MockUser = {
        id: `mock_${Date.now()}`,
        email,
        password,
        displayName,
        authMethod: "email",
        createdAt: new Date().toISOString(),
      };

      // Save user
      await this.saveUser(newUser);
      await this.setCurrentUser(newUser);

      console.log("✅ User registered successfully:", newUser.email);
      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Login user
  static async loginUser(email: string, password: string): Promise<MockUser> {
    try {
      const user = await this.verifyUser(email, password);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      await this.setCurrentUser(user);
      console.log("✅ User logged in successfully:", user.email);
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  // Save Google user
  static async saveGoogleUser(googleData: {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
  }): Promise<MockUser> {
    try {
      const googleUser: MockUser = {
        id: googleData.id,
        email: googleData.email,
        password: "", // Google users don't have password
        displayName: googleData.displayName,
        photoURL: googleData.photoURL,
        authMethod: "google",
        createdAt: new Date().toISOString(),
      };

      await this.saveUser(googleUser);
      await this.setCurrentUser(googleUser);

      console.log("✅ Google user saved successfully:", googleUser.email);
      return googleUser;
    } catch (error) {
      console.error("Error saving Google user:", error);
      throw error;
    }
  }

  // Debug: Get all users (for testing)
  static async debugGetAllUsers(): Promise<void> {
    const users = await this.getAllUsers();
    console.log("🔍 All registered users:", users);
  }
}
