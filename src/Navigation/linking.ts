import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import { RootScreens } from "@/Screens";

/**
 * Linking configuration for React Navigation
 * Enables deep linking and URL routing for web
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    // For web
    "http://localhost:3000",
    "https://bkjobmate.app",
    "https://www.bkjobmate.app",
    // For mobile deep linking
    "com.bkjobmate://",
    "bkjobmate://",
  ],
  config: {
    screens: {
      [RootScreens.WELCOME]: {
        path: "/",
        exact: true,
      },
      [RootScreens.LOGIN]: "/login",
      [RootScreens.REGISTER]: "/register",
      [RootScreens.FORGOT_PASSWORD]: "/forgot-password",
      [RootScreens.ONBOARDING]: "/onboarding",
      [RootScreens.MAIN]: {
        path: "/app",
        screens: {
          Home: "/home",
          Study: "/study",
          Forum: "/forum",
          Chat: "/chat",
          Profile: "/profile",
        },
      },
    },
  },
  // Handle initial URL when app starts
  async getInitialURL() {
    // For web, use the current URL
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return null;
  },
  // Subscribe to URL changes
  subscribe(listener) {
    if (typeof window !== "undefined") {
      const handlePopState = () => {
        listener(window.location.href);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
    return () => {};
  },
};

/**
 * Get the path for a specific screen
 */
export const getScreenPath = (screen: RootScreens): string => {
  const paths: Record<RootScreens, string> = {
    [RootScreens.WELCOME]: "/",
    [RootScreens.LOGIN]: "/login",
    [RootScreens.REGISTER]: "/register",
    [RootScreens.FORGOT_PASSWORD]: "/forgot-password",
    [RootScreens.ONBOARDING]: "/onboarding",
    [RootScreens.MAIN]: "/app",
    [RootScreens.HOME]: "/app/home",
    [RootScreens.STUDY]: "/app/study",
    [RootScreens.FORUM]: "/app/forum",
    [RootScreens.CHAT]: "/app/chat",
    [RootScreens.PROFILE]: "/app/profile",
    [RootScreens.EDIT_PROFILE]: "/app/profile/edit",
    [RootScreens.SETTINGS]: "/app/settings",
  };

  return paths[screen] || "/";
};
