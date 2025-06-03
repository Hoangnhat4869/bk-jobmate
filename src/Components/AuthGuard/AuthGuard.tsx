import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/Context/AuthContext";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { COLORS } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated, error } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [lastAuthState, setLastAuthState] = useState<{
    isAuthenticated: boolean;
    userId: string | null;
  }>({ isAuthenticated: false, userId: null });

  useEffect(() => {
    const currentAuthState = {
      isAuthenticated,
      userId: user?.id || null,
    };

    console.log("AuthGuard useEffect triggered:", {
      isLoading,
      hasInitialized,
      isAuthenticated,
      user: user
        ? { id: user.id, email: user.email, authMethod: user.authMethod }
        : null,
      error,
      lastAuthState,
      currentAuthState,
    });

    // Check if auth state has actually changed
    const authStateChanged =
      lastAuthState.isAuthenticated !== currentAuthState.isAuthenticated ||
      lastAuthState.userId !== currentAuthState.userId;

    if (!isLoading && (!hasInitialized || authStateChanged)) {
      console.log(
        "AuthGuard: Auth state changed or initializing navigation..."
      );
      setHasInitialized(true);
      setLastAuthState(currentAuthState);

      if (isAuthenticated && user) {
        // User is authenticated, check if they need onboarding
        console.log("AuthGuard: User authenticated", {
          authMethod: user.authMethod,
          email: user.email,
          displayName: user.displayName,
        });

        // All authenticated users go directly to main app
        console.log("AuthGuard: Navigating authenticated user to MAIN");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RootScreens.MAIN }],
          })
        );
      } else if (!error) {
        // Only navigate to start if there's no authentication error
        // This prevents redirecting away from login/register screens when there's an error
        console.log("AuthGuard: Navigating unauthenticated user to START");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RootScreens.START }],
          })
        );
      } else {
        console.log("AuthGuard: Has error, not navigating:", error);
      }
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    navigation,
    hasInitialized,
    error,
    lastAuthState,
  ]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return <>{children}</>;
};
