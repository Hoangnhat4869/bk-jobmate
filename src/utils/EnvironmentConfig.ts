/**
 * Environment Configuration Utility
 * Provides helper functions for working with different environments
 */

export type Environment = "development" | "staging" | "production";

export class EnvironmentConfig {
  /**
   * Get current environment
   */
  static getEnvironment(): Environment {
    const env = process.env.EXPO_PUBLIC_ENVIRONMENT as Environment;
    return env || "production";
  }

  /**
   * Check if running in development mode
   */
  static isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  /**
   * Check if running in staging mode
   */
  static isStaging(): boolean {
    return this.getEnvironment() === "staging";
  }

  /**
   * Check if running in production mode
   */
  static isProduction(): boolean {
    return this.getEnvironment() === "production";
  }

  /**
   * Get base URL with environment-specific fallbacks
   */
  static getBaseUrl(): string {
    // Priority: BASE_URL > API_URL > environment-specific defaults
    if (process.env.EXPO_PUBLIC_BASE_URL) {
      return process.env.EXPO_PUBLIC_BASE_URL;
    }

    if (process.env.EXPO_PUBLIC_API_URL) {
      return process.env.EXPO_PUBLIC_API_URL;
    }

    // Environment-specific defaults
    switch (this.getEnvironment()) {
      case "development":
        return "http://localhost:3000/api/";
      case "staging":
        return "https://staging-api.cyese.me/";
      case "production":
      default:
        return "https://api.cyese.me/";
    }
  }

  /**
   * Check if debug mode is enabled
   */
  static isDebugEnabled(): boolean {
    return process.env.EXPO_PUBLIC_DEBUG_API === "true" || this.isDevelopment();
  }

  /**
   * Check if dev mode is enabled
   */
  static isDevModeEnabled(): boolean {
    return process.env.EXPO_PUBLIC_DEV_MODE === "true" || this.isDevelopment();
  }

  /**
   * Log environment info (only in development)
   */
  static logEnvironmentInfo(): void {
    if (this.isDebugEnabled()) {
      console.log("🔧 Environment Configuration:");
      console.log(`  Environment: ${this.getEnvironment()}`);
      console.log(`  Base URL: ${this.getBaseUrl()}`);
      console.log(`  Debug Mode: ${this.isDebugEnabled()}`);
      console.log(`  Dev Mode: ${this.isDevModeEnabled()}`);
    }
  }
}
