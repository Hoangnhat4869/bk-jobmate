/**
 * Mock API service for development when backend is not available
 */

export interface MockUser {
  id: string;
  email: string;
  name: string;
  displayName: string;
  avatar?: string;
  authMethod: "email" | "google";
}

export interface MockAuthResponse {
  success: boolean;
  data?: {
    user: MockUser;
    token: string;
    refreshToken: string;
  };
  error?: {
    message: string;
  };
}

class MockApiService {
  private delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Mock Google authentication
   */
  async googleAuth(
    accessToken: string,
    idToken?: string
  ): Promise<MockAuthResponse> {
    console.log("MockAPI: Google auth called with tokens:", {
      accessToken: accessToken.substring(0, 20) + "...",
      idToken: idToken?.substring(0, 20) + "...",
    });

    // Simulate API delay
    await this.delay(1000);

    // Mock successful response
    const mockUser: MockUser = {
      id: "mock-google-user-" + Date.now(),
      email: "user@gmail.com",
      name: "Google User",
      displayName: "Google User",
      avatar: "https://via.placeholder.com/150",
      authMethod: "google",
    };

    const response: MockAuthResponse = {
      success: true,
      data: {
        user: mockUser,
        token: "mock-jwt-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
      },
    };

    console.log("MockAPI: Google auth response:", response);
    return response;
  }

  /**
   * Mock email login with realistic validation
   */
  async login(email: string, password: string): Promise<MockAuthResponse> {
    console.log("MockAPI: Login called with:", { email, password: "***" });

    // Simulate API delay
    await this.delay(800);

    // Mock validation - empty fields
    if (!email || !password) {
      return {
        success: false,
        error: {
          message: "Email và mật khẩu không được để trống",
        },
      };
    }

    // Mock validation - invalid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: {
          message: "Định dạng email không hợp lệ",
        },
      };
    }

    // Mock validation - password too short
    if (password.length < 6) {
      return {
        success: false,
        error: {
          message: "Mật khẩu phải có ít nhất 6 ký tự",
        },
      };
    }

    // Mock specific test cases for wrong credentials
    const testCredentials = [
      { email: "test@example.com", password: "123456" },
      { email: "user@gmail.com", password: "password" },
      { email: "admin@bkjobmate.com", password: "admin123" },
    ];

    const isValidCredentials = testCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );

    // Mock wrong credentials error
    if (!isValidCredentials) {
      return {
        success: false,
        error: {
          message: "Email hoặc mật khẩu không chính xác",
        },
      };
    }

    // Mock successful response for valid credentials
    const mockUser: MockUser = {
      id: "mock-email-user-" + Date.now(),
      email: email,
      name: email.split("@")[0],
      displayName: email.split("@")[0],
      authMethod: "email",
    };

    const response: MockAuthResponse = {
      success: true,
      data: {
        user: mockUser,
        token: "mock-jwt-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
      },
    };

    console.log("MockAPI: Login successful for:", email);
    return response;
  }

  /**
   * Mock registration
   */
  async register(
    email: string,
    password: string,
    name?: string
  ): Promise<MockAuthResponse> {
    console.log("MockAPI: Register called with:", {
      email,
      password: "***",
      name,
    });

    // Simulate API delay
    await this.delay(1000);

    // Mock validation
    if (!email || !password) {
      return {
        success: false,
        error: {
          message: "Email and password are required",
        },
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: {
          message: "Password must be at least 6 characters",
        },
      };
    }

    // Mock successful response
    const mockUser: MockUser = {
      id: "mock-new-user-" + Date.now(),
      email: email,
      name: name || email.split("@")[0],
      displayName: name || email.split("@")[0],
      authMethod: "email",
    };

    const response: MockAuthResponse = {
      success: true,
      data: {
        user: mockUser,
        token: "mock-jwt-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
      },
    };

    console.log("MockAPI: Register response:", response);
    return response;
  }

  /**
   * Mock logout
   */
  async logout(): Promise<{ success: boolean }> {
    console.log("MockAPI: Logout called");

    // Simulate API delay
    await this.delay(300);

    console.log("MockAPI: Logout successful");
    return { success: true };
  }
}

export const mockApiService = new MockApiService();
