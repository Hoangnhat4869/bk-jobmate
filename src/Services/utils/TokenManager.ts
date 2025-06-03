import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "@/Config";

// Token management utilities
export class TokenManager {
  private static readonly TOKEN_KEY = "authToken";
  private static readonly REFRESH_TOKEN_KEY = "refreshToken";
  private static readonly USER_KEY = "user";

  // Get stored token
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  // Get stored refresh token
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  }

  // Store tokens
  static async setTokens(token: string, refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
      await AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error("Error storing tokens:", error);
      throw error;
    }
  }

  // Clear all auth data
  static async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.TOKEN_KEY,
        this.REFRESH_TOKEN_KEY,
        this.USER_KEY,
      ]);
    } catch (error) {
      console.error("Error clearing auth data:", error);
      throw error;
    }
  }

  // Check if token is expired (basic check)
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true; // Assume expired if we can't parse
    }
  }

  // Refresh access token
  static async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${Config.API_URL}auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      if (data.success && data.data) {
        await this.setTokens(data.data.token, data.data.refreshToken);
        return data.data.token;
      } else {
        throw new Error(data.error?.message || "Token refresh failed");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      await this.clearAuthData();
      return null;
    }
  }
}
