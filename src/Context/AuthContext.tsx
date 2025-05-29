import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Constants
const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID || "";
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID || "";
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID || "";
const USER_STORAGE_KEY = "user";

// Define types for our context
export type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  authMethod?: "email" | "google";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  error: string | null;
  clearError: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
  error: null,
  clearError: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Initialize WebBrowser for Expo Auth Session
WebBrowser.maybeCompleteAuthSession();

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized computed values
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize Google Auth with better configuration
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: Platform.select({
      web: typeof window !== "undefined" ? window.location.origin : undefined,
      default: undefined,
    }),
    scopes: ["openid", "profile", "email"],
  });

  // Check for stored user on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        let userJSON;
        // Check if SecureStore is available (not available on web)
        if (Platform.OS !== "web") {
          userJSON = await SecureStore.getItemAsync(USER_STORAGE_KEY);
        } else {
          // Use localStorage for web
          userJSON = localStorage.getItem(USER_STORAGE_KEY);
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
      handleGoogleAuthSuccess(authentication?.accessToken);
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
      setError(response.error?.message || "Google authentication failed");
    }
  }, [response]);

  // Handle Google authentication success
  const handleGoogleAuthSuccess = useCallback(async (accessToken?: string) => {
    if (!accessToken) {
      setError("No access token received from Google");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch user info from Google API
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const googleUserInfo = await userInfoResponse.json();

      const user: User = {
        id: googleUserInfo.id,
        email: googleUserInfo.email,
        displayName: googleUserInfo.name || googleUserInfo.email.split("@")[0],
        photoURL: googleUserInfo.picture,
        authMethod: "google",
      };

      await handleUserLogin(user);
    } catch (e) {
      console.error("Error handling Google auth success:", e);
      setError(
        e instanceof Error ? e.message : "Failed to get user info from Google"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUserLogin = useCallback(async (userData: User) => {
    setUser(userData);
    try {
      // Check if SecureStore is available (not available on web)
      if (Platform.OS !== "web") {
        await SecureStore.setItemAsync(
          USER_STORAGE_KEY,
          JSON.stringify(userData)
        );
      } else {
        // Use localStorage for web
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock authentication - replace with actual authentication
        if (email && password) {
          const mockUser: User = {
            id: "123",
            email,
            displayName: email.split("@")[0],
            authMethod: "email",
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
    },
    [handleUserLogin]
  );

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock registration - replace with actual registration
        if (email && password) {
          const mockUser: User = {
            id: "123",
            email,
            displayName: name || email.split("@")[0],
            authMethod: "email",
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
    },
    [handleUserLogin]
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      // Check if SecureStore is available (not available on web)
      if (Platform.OS !== "web") {
        await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
      } else {
        // Use localStorage for web
        localStorage.removeItem(USER_STORAGE_KEY);
      }
      setUser(null);
      setError(null);
    } catch (e) {
      console.error("Error signing out", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
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
  }, [promptAsync]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      error,
      clearError,
    }),
    [
      user,
      isLoading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      error,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
