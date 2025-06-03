import { EnvironmentConfig } from "@/utils/EnvironmentConfig";

export const Config = {
  // Base URL for API calls - supports different environments
  BASE_URL: EnvironmentConfig.getBaseUrl(),

  // Legacy support - will be same as BASE_URL
  API_URL: EnvironmentConfig.getBaseUrl(),

  // Environment detection
  ENVIRONMENT: EnvironmentConfig.getEnvironment(),

  // Environment state helpers
  IS_DEVELOPMENT: EnvironmentConfig.isDevelopment(),
  IS_STAGING: EnvironmentConfig.isStaging(),
  IS_PRODUCTION: EnvironmentConfig.isProduction(),

  GOOGLE_OAUTH_CLIENT_ID: {
    ANDROID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    IOS: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    WEB: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
  },
  GOOGLE_OAUTH_REDIRECT_URI: {
    ANDROID: "com.bkjobmate://auth/google",
    IOS: "com.bkjobmate://auth/google",
    WEB: `${EnvironmentConfig.getBaseUrl()}auth/google/callback`,
  },
  APP_SCHEME: process.env.EXPO_PUBLIC_APP_SCHEME || "com.bkjobmate",
  DEV_MODE: EnvironmentConfig.isDevModeEnabled(),
  DEBUG_API: EnvironmentConfig.isDebugEnabled(),
};

// Log environment info in debug mode
EnvironmentConfig.logEnvironmentInfo();
