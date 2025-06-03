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

  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      setHasInitialized(true);

      if (isAuthenticated && user) {
        // User is authenticated, check if they need onboarding
        console.log("AuthGuard: User authenticated", {
          authMethod: user.authMethod,
          email: user.email,
          displayName: user.displayName,
        });

        if (user.authMethod === "google") {
          // For Google auth users, navigate to onboarding first
          console.log("AuthGuard: Navigating Google user to ONBOARDING");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: RootScreens.ONBOARDING }],
            })
          );
        } else {
          // For email auth users, go directly to main app
          console.log("AuthGuard: Navigating email user to MAIN");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: RootScreens.MAIN }],
            })
          );
        }
      } else if (!error) {
        // Only navigate to welcome if there's no authentication error
        // This prevents redirecting away from login/register screens when there's an error
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RootScreens.WELCOME }],
          })
        );
      }
    }
  }, [isAuthenticated, user, isLoading, navigation, hasInitialized, error]);

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
