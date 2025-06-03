import { API } from "../base";
import { AuthUser, ApiResponse } from "../types";

// Legacy User interface for compatibility
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    // Get user profile (using new API)
    getUserProfile: build.query<ApiResponse<AuthUser>, void>({
      query: () => "users/profile",
      providesTags: ["User"],
    }),

    // Update user profile
    updateUserProfile: build.mutation<ApiResponse<AuthUser>, Partial<AuthUser>>(
      {
        query: (userData) => ({
          url: "users/profile",
          method: "PUT",
          body: userData,
        }),
        invalidatesTags: ["User"],
      }
    ),

    // Legacy endpoint for compatibility
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),

    // Upload user avatar
    uploadAvatar: build.mutation<ApiResponse<{ avatar: string }>, FormData>({
      query: (formData) => ({
        url: "users/avatar",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete user avatar
    deleteAvatar: build.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: "users/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Get user statistics
    getUserStats: build.query<
      ApiResponse<{
        applicationsCount: number;
        savedJobsCount: number;
        profileViews: number;
        joinedDate: string;
      }>,
      void
    >({
      query: () => "users/stats",
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useGetUserStatsQuery,
} = userApi;
