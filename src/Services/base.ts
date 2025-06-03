import { Config } from "@/Config";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { TokenManager } from "./utils/TokenManager";
import { mockApiService } from "./mockApi";

// Helper function to handle mock auth endpoints
const handleMockAuth = async (
  url: string,
  method: string,
  args: string | FetchArgs,
  api: BaseQueryApi
) => {
  try {
    const body = typeof args === "object" && "body" in args ? args.body : {};

    let mockResult;

    if (url.includes("auth/google") && method === "POST") {
      const { accessToken, idToken } = body as any;
      mockResult = await mockApiService.googleAuth(accessToken, idToken);
    } else if (url.includes("auth/login") && method === "POST") {
      const { email, password } = body as any;
      mockResult = await mockApiService.login(email, password);
    } else if (url.includes("auth/register") && method === "POST") {
      const { email, password, name } = body as any;
      mockResult = await mockApiService.register(email, password, name);
    } else if (url.includes("auth/logout") && method === "POST") {
      mockResult = await mockApiService.logout();
    } else {
      // Default mock response for other auth endpoints
      mockResult = { success: true, data: null };
    }

    return { data: mockResult };
  } catch (error) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        data: { message: "Mock API error: " + (error as Error).message },
      },
    };
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: Config.BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    try {
      // Get token from TokenManager
      const token = await TokenManager.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Set content type
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    } catch (error) {
      console.error("Error preparing headers:", error);
      return headers;
    }
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // Check if this is an auth endpoint and use mock if backend is not available
  const url = typeof args === "string" ? args : args.url;
  const method = typeof args === "string" ? "GET" : args.method || "GET";

  // Handle auth endpoints with mock API
  if (url.includes("auth/")) {
    try {
      // Try real API first
      const result = await baseQuery(args, api, extraOptions);

      // If connection refused, use mock API
      if (
        result.error &&
        "status" in result.error &&
        result.error.status === "FETCH_ERROR"
      ) {
        console.log("Backend not available, using mock API for:", url);
        return await handleMockAuth(url, method, args, api);
      }

      return result;
    } catch (error) {
      console.log("Backend error, using mock API for:", url, error);
      return await handleMockAuth(url, method, args, api);
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === 401) {
      // Handle unauthorized - try to refresh token first
      try {
        const newToken = await TokenManager.refreshAccessToken();
        if (newToken) {
          // Retry the original request with new token
          const retryResult = await baseQuery(args, api, extraOptions);
          return retryResult;
        } else {
          // Refresh failed, clear auth data
          await TokenManager.clearAuthData();
        }
      } catch (error) {
        console.error("Error handling 401:", error);
        await TokenManager.clearAuthData();
      }
    } else if (status === 403) {
      // Handle forbidden
      console.warn("Access forbidden");
    } else if (typeof status === "number" && status >= 500) {
      // Handle server errors
      console.error("Server error:", result.error);
    }
  }

  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [
    "User",
    "Job",
    "Application",
    "Auth",
    "Course",
    "Lesson",
    "Question",
    "Progress",
  ],
  endpoints: () => ({}),
});
