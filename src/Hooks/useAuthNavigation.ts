import { useCallback } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/Context/AuthContext";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useAuthNavigation = () => {
  const { signOut, clearError } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const navigateToLogin = useCallback(() => {
    navigation.navigate(RootScreens.LOGIN);
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate(RootScreens.REGISTER);
  }, [navigation]);

  const navigateToOnboarding = useCallback(() => {
    navigation.navigate(RootScreens.ONBOARDING);
  }, [navigation]);

  const navigateToMain = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RootScreens.MAIN }],
      })
    );
  }, [navigation]);

  const navigateToWelcome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RootScreens.WELCOME }],
      })
    );
  }, [navigation]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      navigateToWelcome();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [signOut, navigateToWelcome]);

  const handleClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    navigateToLogin,
    navigateToRegister,
    navigateToOnboarding,
    navigateToMain,
    navigateToWelcome,
    handleLogout,
    handleClearError,
  };
};
