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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  useLoginMutation,
  useRegisterMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
  useGetProfileQuery,
  TokenManager,
} from "@/Services";
import { Config } from "@/Config";

// Storage keys
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

  // API mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [googleAuthMutation] = useGoogleAuthMutation();
  const [logoutMutation] = useLogoutMutation();

  // Memoized computed values
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize Google Auth with configuration from Config
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Config.GOOGLE_OAUTH_CLIENT_ID.ANDROID,
    iosClientId: Config.GOOGLE_OAUTH_CLIENT_ID.IOS,
    webClientId: Config.GOOGLE_OAUTH_CLIENT_ID.WEB,
    redirectUri: Platform.select({
      android: Config.GOOGLE_OAUTH_REDIRECT_URI.ANDROID,
      ios: Config.GOOGLE_OAUTH_REDIRECT_URI.IOS,
      web:
        Platform.OS === "web"
          ? `${window.location.origin}/`
          : Config.GOOGLE_OAUTH_REDIRECT_URI.WEB,
      default: undefined,
    }),
    scopes: ["openid", "profile", "email"],
    // Add additional configuration for web
    ...(Platform.OS === "web" && {
      additionalParameters: {},
      extraParams: {},
    }),
  });

  // Check for stored user on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const token = await TokenManager.getToken();

        if (userJSON && token) {
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
      handleGoogleAuthSuccess(
        authentication?.accessToken,
        authentication?.idToken
      );
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
      setError(response.error?.message || "Google authentication failed");
    }
  }, [response]);

  // Store user and tokens
  const storeAuthData = useCallback(
    async (userData: any, token: string, refreshToken: string) => {
      try {
        const user: User = {
          id: userData.id,
          email: userData.email,
          displayName: userData.name || userData.displayName,
          photoURL: userData.avatar,
          authMethod: userData.authMethod || "email",
        };

        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        await TokenManager.setTokens(token, refreshToken);

        setUser(user);
      } catch (error) {
        console.error("Failed to store auth data:", error);
        throw error;
      }
    },
    []
  );

  // Handle Google authentication success
  const handleGoogleAuthSuccess = useCallback(
    async (accessToken?: string, idToken?: string) => {
      if (!accessToken) {
        setError("No access token received from Google");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Send Google auth data to our backend
        const result = await googleAuthMutation({
          accessToken,
          idToken,
        }).unwrap();

        if (result.success && result.data) {
          // Ensure Google users have authMethod set to "google"
          const userData = {
            ...result.data.user,
            authMethod: "google", // Force Google auth method
          };

          await storeAuthData(
            userData,
            result.data.token,
            result.data.refreshToken
          );
          console.log("Google authentication successful");
        } else {
          throw new Error(
            result.error?.message || "Google authentication failed"
          );
        }
      } catch (e: any) {
        console.error("Error handling Google auth success:", e);
        setError(
          e?.data?.error?.message ||
            e?.message ||
            "Failed to authenticate with Google"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [googleAuthMutation, storeAuthData]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await loginMutation({
          email,
          password,
        }).unwrap();

        if (result.success && result.data) {
          await storeAuthData(
            result.data.user,
            result.data.token,
            result.data.refreshToken
          );
          console.log("Login successful");
        } else {
          throw new Error(result.error?.message || "Login failed");
        }
      } catch (e: any) {
        console.error("Login error:", e);
        setError(
          e?.data?.error?.message ||
            e?.message ||
            "Login failed. Please check your credentials."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [loginMutation, storeAuthData]
  );

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await registerMutation({
          email,
          password,
          name: name || email.split("@")[0],
        }).unwrap();

        if (result.success && result.data) {
          await storeAuthData(
            result.data.user,
            result.data.token,
            result.data.refreshToken
          );
          console.log("Registration successful");
        } else {
          throw new Error(result.error?.message || "Registration failed");
        }
      } catch (e: any) {
        console.error("Registration error:", e);
        setError(
          e?.data?.error?.message ||
            e?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [registerMutation, storeAuthData]
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);

      // Call logout API
      try {
        await logoutMutation().unwrap();
      } catch (apiError) {
        console.warn(
          "Logout API call failed, continuing with local cleanup:",
          apiError
        );
      }

      // Clear local storage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await TokenManager.clearAuthData();

      setUser(null);
      setError(null);
      console.log("Logout successful");
    } catch (e) {
      console.error("Error signing out", e);
      setError("Failed to sign out properly");
    } finally {
      setIsLoading(false);
    }
  }, [logoutMutation]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting Google sign in...");
      console.log("Platform:", Platform.OS);
      console.log("Web Client ID:", Config.GOOGLE_OAUTH_CLIENT_ID.WEB);

      const actualRedirectUri =
        Platform.OS === "web"
          ? `${window.location.origin}/`
          : "Using Expo default";
      console.log("Redirect URI being sent:", actualRedirectUri);
      console.log("Current URL:", window.location.href);

      // Check if client ID is configured
      if (!Config.GOOGLE_OAUTH_CLIENT_ID.WEB) {
        throw new Error(
          "Google OAuth Web Client ID is not configured. Please check your environment variables."
        );
      }

      // Cấu hình tùy chọn cho promptAsync
      const options =
        Platform.OS === "web"
          ? {
              showInRecents: true,
            }
          : undefined;

      // Gọi promptAsync với tùy chọn
      const result = await promptAsync(options);
      console.log("Google auth result:", result);

      // Kiểm tra kết quả
      if (result.type !== "success") {
        let errorMessage = "Google authentication failed";

        if (result.type === "cancel") {
          errorMessage = "Google authentication was cancelled";
        } else if (result.type === "error") {
          errorMessage = `Google authentication error: ${
            result.error?.message || "Unknown error"
          }`;
        } else if (result.type === "dismiss") {
          errorMessage = "Google authentication was dismissed";
        }

        throw new Error(errorMessage);
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
