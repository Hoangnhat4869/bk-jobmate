import { API } from "../base";
import {
  AuthUser,
  LoginRequest,
  RegisterRequest,
  GoogleAuthRequest,
  AuthResponse,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ApiResponse,
} from "../types";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    // Login with email and password
    login: build.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Register new user
    register: build.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Google OAuth login
    googleAuth: build.mutation<ApiResponse<AuthResponse>, GoogleAuthRequest>({
      query: (googleData) => ({
        url: "auth/google",
        method: "POST",
        body: googleData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Refresh access token
    refreshToken: build.mutation<
      ApiResponse<AuthResponse>,
      RefreshTokenRequest
    >({
      query: (tokenData) => ({
        url: "auth/refresh",
        method: "POST",
        body: tokenData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Forgot password
    forgotPassword: build.mutation<
      ApiResponse<{ message: string }>,
      ForgotPasswordRequest
    >({
      query: (emailData) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    // Reset password
    resetPassword: build.mutation<
      ApiResponse<{ message: string }>,
      ResetPasswordRequest
    >({
      query: (resetData) => ({
        url: "auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),

    // Verify email
    verifyEmail: build.mutation<
      ApiResponse<{ message: string }>,
      VerifyEmailRequest
    >({
      query: (verifyData) => ({
        url: "auth/verify-email",
        method: "POST",
        body: verifyData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Logout
    logout: build.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Get current user profile
    getProfile: build.query<ApiResponse<AuthUser>, void>({
      query: () => "auth/profile",
      providesTags: ["User"],
    }),

    // Update user profile
    updateProfile: build.mutation<ApiResponse<AuthUser>, UpdateProfileRequest>({
      query: (profileData) => ({
        url: "auth/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),

    // Change password
    changePassword: build.mutation<
      ApiResponse<{ message: string }>,
      ChangePasswordRequest
    >({
      query: (passwordData) => ({
        url: "auth/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),

    // Delete account
    deleteAccount: build.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: "auth/delete-account",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = authApi;
