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
import { TokenManager } from "@/Services";
import { Config } from "@/Config";
import { MockUserStorage } from "@/utils/MockUserStorage";

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

  // No API mutations needed - using Mock Storage

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
        console.log("🔍 Loading user from storage...");

        // Try to get current user from Mock Storage first
        const mockUser = await MockUserStorage.getCurrentUser();
        if (mockUser) {
          const userData: User = {
            id: mockUser.id,
            email: mockUser.email,
            displayName: mockUser.displayName,
            photoURL: mockUser.photoURL,
            authMethod: mockUser.authMethod,
          };
          setUser(userData);
          console.log("✅ Loaded mock user:", userData.email);
          return;
        }

        // Fallback to AsyncStorage
        const userJSON = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const token = await TokenManager.getToken();

        if (userJSON && token) {
          setUser(JSON.parse(userJSON));
          console.log("✅ Loaded user from AsyncStorage");
        } else {
          console.log("ℹ️ No stored user found");
        }
      } catch (e) {
        console.error("❌ Failed to load user from storage", e);
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

  // Removed storeAuthData - using Mock Storage directly

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

        console.log("Processing Google authentication client-side...");
        console.log("Access token length:", accessToken?.length);
        console.log("ID token present:", !!idToken);

        // Decode user info from Google ID token (client-side only)
        let userInfo = null;

        if (idToken) {
          try {
            console.log("Decoding ID token...");
            // Decode JWT ID token to get user info
            const base64Url = idToken.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(
                  (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
            );
            userInfo = JSON.parse(jsonPayload);
            console.log("✅ Successfully decoded user info:", userInfo);
            console.log("📋 User info keys:", Object.keys(userInfo));
            console.log("📝 Name fields:", {
              name: userInfo.name,
              given_name: userInfo.given_name,
              family_name: userInfo.family_name,
              nickname: userInfo.nickname,
              preferred_username: userInfo.preferred_username,
            });
          } catch (decodeError) {
            console.error("❌ Could not decode ID token:", decodeError);
          }
        } else {
          console.warn(
            "⚠️ No ID token provided, trying to fetch user info with access token"
          );

          // Fallback: Fetch user info using access token
          try {
            const response = await fetch(
              `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
            );
            if (response.ok) {
              userInfo = await response.json();
              console.log("✅ Fetched user info from API:", userInfo);
              console.log("📋 API user info keys:", Object.keys(userInfo));
              console.log("📝 API Name fields:", {
                name: userInfo.name,
                given_name: userInfo.given_name,
                family_name: userInfo.family_name,
                nickname: userInfo.nickname,
                preferred_username: userInfo.preferred_username,
              });
            } else {
              console.error(
                "❌ Failed to fetch user info from API:",
                response.status
              );
            }
          } catch (fetchError) {
            console.error("❌ Error fetching user info:", fetchError);
          }
        }

        // Validate userInfo
        if (!userInfo) {
          console.error("❌ No user info available from Google");
          setError("Failed to get user information from Google");
          return;
        }

        // Create display name with multiple fallbacks
        let displayName = "Google User";

        if (userInfo.name) {
          displayName = userInfo.name;
          console.log("📝 Using 'name' field:", displayName);
        } else if (userInfo.given_name && userInfo.family_name) {
          displayName = `${userInfo.given_name} ${userInfo.family_name}`;
          console.log("📝 Using 'given_name + family_name':", displayName);
        } else if (userInfo.given_name) {
          displayName = userInfo.given_name;
          console.log("📝 Using 'given_name' only:", displayName);
        } else if (userInfo.family_name) {
          displayName = userInfo.family_name;
          console.log("📝 Using 'family_name' only:", displayName);
        } else if (userInfo.nickname) {
          displayName = userInfo.nickname;
          console.log("📝 Using 'nickname':", displayName);
        } else if (userInfo.preferred_username) {
          displayName = userInfo.preferred_username;
          console.log("📝 Using 'preferred_username':", displayName);
        } else {
          console.log("⚠️ No name fields found, using default:", displayName);
        }

        // Create user object from Google data
        const userData: User = {
          id: userInfo.sub || userInfo.id || `google_${Date.now()}`,
          email: userInfo.email || "google.user@example.com",
          displayName: displayName,
          photoURL: userInfo.picture || userInfo.photo || "",
          authMethod: "google",
        };

        console.log("✅ Created user data:", userData);
        console.log("📋 Google user info details:", {
          sub: userInfo.sub,
          id: userInfo.id,
          name: userInfo.name,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
          picture: userInfo.picture,
          photo: userInfo.photo,
          email: userInfo.email,
          verified_email: userInfo.verified_email,
        });

        // Save Google user to Mock Storage
        await MockUserStorage.saveGoogleUser({
          id: userData.id,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        });

        // Store user data locally (no backend call)
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

        // Store sync data for later use
        const syncData = {
          id: userData.id,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        };
        console.log("📤 Storing sync data for UserContext:", syncData);

        // Store in AsyncStorage for UserContext to pick up
        await AsyncStorage.setItem("googleSyncData", JSON.stringify(syncData));

        // Generate mock tokens for consistency
        const mockToken = `google_token_${Date.now()}`;
        const mockRefreshToken = `google_refresh_${Date.now()}`;

        // Store tokens (optional, for consistency with other auth methods)
        await TokenManager.setTokens(mockToken, mockRefreshToken);

        setUser(userData);
        console.log("Google authentication successful - client-side only");
        console.log(
          "User state updated, AuthGuard should trigger navigation to MAIN"
        );
      } catch (e: any) {
        console.error("Error handling Google auth success:", e);
        setError(e?.message || "Failed to process Google authentication");
      } finally {
        setIsLoading(false);
      }
    },
    [] // No dependencies needed for client-side only auth
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🔐 Mock Login attempt:", email);

      // Use Mock Storage instead of API
      const mockUser = await MockUserStorage.loginUser(email, password);

      // Convert MockUser to User
      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
        authMethod: mockUser.authMethod,
      };

      // Store user data
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

      // Generate mock tokens
      const mockToken = `mock_token_${Date.now()}`;
      const mockRefreshToken = `mock_refresh_${Date.now()}`;
      await TokenManager.setTokens(mockToken, mockRefreshToken);

      setUser(userData);
      console.log("✅ Mock login successful:", userData.email);

      // Store sync data for UserContext
      const syncData = {
        id: userData.id,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };
      await AsyncStorage.setItem("googleSyncData", JSON.stringify(syncData));
    } catch (e: any) {
      console.error("❌ Mock login error:", e);
      setError(e?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const displayName = name || email.split("@")[0];
        console.log("📝 Mock Registration attempt:", email, displayName);

        // Use Mock Storage instead of API
        const mockUser = await MockUserStorage.registerUser(
          email,
          password,
          displayName
        );

        // Convert MockUser to User
        const userData: User = {
          id: mockUser.id,
          email: mockUser.email,
          displayName: mockUser.displayName,
          photoURL: mockUser.photoURL,
          authMethod: mockUser.authMethod,
        };

        // Store user data
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

        // Generate mock tokens
        const mockToken = `mock_token_${Date.now()}`;
        const mockRefreshToken = `mock_refresh_${Date.now()}`;
        await TokenManager.setTokens(mockToken, mockRefreshToken);

        setUser(userData);
        console.log("✅ Mock registration successful:", userData.email);

        // Store sync data for UserContext
        const syncData = {
          id: userData.id,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        };
        await AsyncStorage.setItem("googleSyncData", JSON.stringify(syncData));
      } catch (e: any) {
        console.error("❌ Mock registration error:", e);
        setError(e?.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);

      console.log("🚪 Mock logout");

      // Clear mock storage
      await MockUserStorage.clearCurrentUser();

      // Clear local storage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await AsyncStorage.removeItem("googleSyncData");
      await TokenManager.clearAuthData();

      setUser(null);
      setError(null);
      console.log("✅ Mock logout successful");
    } catch (e) {
      console.error("❌ Error signing out", e);
      setError("Failed to sign out properly");
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
      console.log("Web Client ID:", Config.GOOGLE_OAUTH_CLIENT_ID.WEB);

      const actualRedirectUri =
        Platform.OS === "web"
          ? `${window.location.origin}/`
          : "Using Expo default";
      console.log("Redirect URI being sent:", actualRedirectUri);
      console.log("Current URL:", window.location.href);

      // Check if client ID is configured
      const clientId = Platform.select({
        android: Config.GOOGLE_OAUTH_CLIENT_ID.ANDROID,
        ios: Config.GOOGLE_OAUTH_CLIENT_ID.IOS,
        web: Config.GOOGLE_OAUTH_CLIENT_ID.WEB,
        default: Config.GOOGLE_OAUTH_CLIENT_ID.WEB,
      });

      if (!clientId) {
        throw new Error(
          `Google OAuth Client ID is not configured for ${Platform.OS}. Please check your environment variables and Google Services configuration.`
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
      console.log("Google auth result:", JSON.stringify(result, null, 2));
      console.log("Result type:", result.type);

      if (result.type === "success") {
        console.log(
          "Access token:",
          result.authentication?.accessToken ? "Present" : "Missing"
        );
        console.log(
          "ID token:",
          result.authentication?.idToken ? "Present" : "Missing"
        );
      }

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

      // Handle successful authentication
      if (result.type === "success" && result.authentication) {
        console.log("Google authentication successful, processing tokens...");
        await handleGoogleAuthSuccess(
          result.authentication.accessToken,
          result.authentication.idToken
        );
      }
    } catch (e) {
      console.error("Google sign in error:", e);

      let errorMessage = "Failed to sign in with Google";

      if (e instanceof Error) {
        if (e.message.includes("Client ID")) {
          errorMessage =
            "Google OAuth not configured properly. Please check your setup.";
        } else if (e.message.includes("cancelled")) {
          errorMessage = "Google sign in was cancelled";
        } else if (e.message.includes("network")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else {
          errorMessage = e.message;
        }
      }

      setError(errorMessage);
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
