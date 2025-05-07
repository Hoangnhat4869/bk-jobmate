import React, { createContext, useState, useContext, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Define types for our context
export type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  error: string | null;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
  error: null,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Initialize WebBrowser for Expo Auth Session
WebBrowser.maybeCompleteAuthSession();

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "916197727859-710m45q3vuihkikgk92av3fr8bjgejaq.apps.googleusercontent.com",
    iosClientId:
      "916197727859-710m45q3vuihkikgk92av3fr8bjgejaq.apps.googleusercontent.com",
    webClientId:
      "916197727859-m5c57q0il4us2l93qij4rnsr9k43hhmh.apps.googleusercontent.com",
    redirectUri: Platform.select({
      web: typeof window !== "undefined" ? window.location.origin : undefined,
      default: undefined,
    }),
  });

  // const [_, response, promptAsync] = Google.useAuthRequest({
  //   clientId: process.env.EXPO_CLIENT_ID,
  //   androidClientId: process.env.ANDROID_CLIENT_ID,
  //   iosClientId: process.env.IOS_CLIENT_ID,
  //   webClientId: process.env.WEB_CLIENT_ID,
  //   redirectUri: Platform.select({
  //     web: typeof window !== "undefined" ? window.location.origin : undefined,
  //     default: undefined,
  //   }),
  // });

  // Check for stored user on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        let userJSON;
        // Check if SecureStore is available (not available on web)
        if (Platform.OS !== "web") {
          userJSON = await SecureStore.getItemAsync("user");
        } else {
          // Use localStorage for web
          userJSON = localStorage.getItem("user");
        }

        if (userJSON) {
          setUser(JSON.parse(userJSON));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle Google Auth response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google Auth Success:", authentication);

      // In a real app, you would exchange this token with your backend
      // For now, we'll create a user from the token
      const fetchUserInfo = async () => {
        try {
          setIsLoading(true);
          setError(null);

          // For demo purposes, we'll just create a mock user
          // In a real app, you would fetch user info from Google API
          const mockUser = {
            id: "google-user-id-" + Date.now(),
            email: "user@example.com",
            displayName: "Google User",
            photoURL: "https://via.placeholder.com/150",
          };

          handleUserLogin(mockUser);
        } catch (e) {
          console.error("Error fetching Google user info:", e);
          setError(
            e instanceof Error
              ? e.message
              : "Failed to get user info from Google"
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserInfo();
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
      setError(response.error?.message || "Google authentication failed");
    }
  }, [response]);

  const handleUserLogin = async (userData: User) => {
    setUser(userData);
    try {
      // Check if SecureStore is available (not available on web)
      if (Platform.OS !== "web") {
        await SecureStore.setItemAsync("user", JSON.stringify(userData));
      } else {
        // Use localStorage for web
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock authentication - replace with actual authentication
      if (email && password) {
        const mockUser = {
          id: "123",
          email,
          displayName: email.split("@")[0],
        };
        await handleUserLogin(mockUser);
      } else {
        throw new Error("Email and password are required");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock registration - replace with actual registration
      if (email && password) {
        const mockUser = {
          id: "123",
          email,
          displayName: email.split("@")[0],
        };
        await handleUserLogin(mockUser);
      } else {
        throw new Error("Email and password are required");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Check if SecureStore is available (not available on web)
      if (Platform.OS !== "web") {
        await SecureStore.deleteItemAsync("user");
      } else {
        // Use localStorage for web
        localStorage.removeItem("user");
      }
      setUser(null);
    } catch (e) {
      console.error("Error signing out", e);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting Google sign in...");
      console.log("Platform:", Platform.OS);
      console.log(
        "Redirect URI:",
        Platform.OS === "web" ? window.location.origin : "Using Expo default"
      );

      // Cấu hình tùy chọn cho promptAsync
      const options =
        Platform.OS === "web"
          ? {
              showInRecents: true,
              promptParentId: "root", // ID của phần tử cha để hiển thị popup
            }
          : undefined;

      // Gọi promptAsync với tùy chọn
      const result = await promptAsync(options);
      console.log("Google auth result:", result);

      // Kiểm tra kết quả
      if (result.type !== "success") {
        throw new Error(
          `Google sign in was ${result.type}: ${JSON.stringify(result)}`
        );
      }
    } catch (e) {
      console.error("Google sign in error:", e);
      setError(
        e instanceof Error ? e.message : "Failed to sign in with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
