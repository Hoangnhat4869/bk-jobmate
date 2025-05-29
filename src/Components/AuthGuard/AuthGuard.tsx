import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
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
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // User is authenticated, check if they need onboarding
        if (user.authMethod === "google") {
          // For Google auth users, navigate to onboarding first
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: RootScreens.ONBOARDING }],
            })
          );
        } else {
          // For email auth users, go directly to main app
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: RootScreens.MAIN }],
            })
          );
        }
      } else {
        // User is not authenticated, go to welcome screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RootScreens.WELCOME }],
          })
        );
      }
    }
  }, [isAuthenticated, user, isLoading, navigation]);

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
