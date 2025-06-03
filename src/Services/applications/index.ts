import { API } from "../base";
import {
  Application,
  CreateApplicationRequest,
  UpdateApplicationRequest,
  ApplicationFilters,
  ApplicationsResponse,
  ApplicationStats,
  ApiResponse,
} from "../types";

const applicationApi = API.injectEndpoints({
  endpoints: (build) => ({
    // Get user's applications
    getApplications: build.query<
      ApiResponse<ApplicationsResponse>,
      ApplicationFilters
    >({
      query: (filters) => {
        const params = new URLSearchParams();

        // Add filters to query params
        if (filters.status?.length)
          params.append("status", filters.status.join(","));
        if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
        if (filters.dateTo) params.append("dateTo", filters.dateTo);
        if (filters.page) params.append("page", String(filters.page));
        if (filters.limit) params.append("limit", String(filters.limit));
        if (filters.sortBy) params.append("sortBy", filters.sortBy);
        if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

        return `applications?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.applications
          ? [
              ...result.data.applications.map(({ id }) => ({
                type: "Application" as const,
                id,
              })),
              { type: "Application", id: "LIST" },
            ]
          : [{ type: "Application", id: "LIST" }],
    }),

    // Get application by ID
    getApplication: build.query<ApiResponse<Application>, string>({
      query: (id) => `applications/${id}`,
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),

    // Create new application
    createApplication: build.mutation<
      ApiResponse<Application>,
      CreateApplicationRequest
    >({
      query: (applicationData) => {
        // Handle file upload if resume is provided
        if (applicationData.resumeFile) {
          const formData = new FormData();
          formData.append("jobId", applicationData.jobId);
          if (applicationData.coverLetter) {
            formData.append("coverLetter", applicationData.coverLetter);
          }
          formData.append("resume", applicationData.resumeFile);

          return {
            url: "applications",
            method: "POST",
            body: formData,
            formData: true,
          };
        } else {
          return {
            url: "applications",
            method: "POST",
            body: {
              jobId: applicationData.jobId,
              coverLetter: applicationData.coverLetter,
            },
          };
        }
      },
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),

    // Update application
    updateApplication: build.mutation<
      ApiResponse<Application>,
      { id: string; data: UpdateApplicationRequest }
    >({
      query: ({ id, data }) => ({
        url: `applications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Application", id },
        { type: "Application", id: "LIST" },
      ],
    }),

    // Withdraw application
    withdrawApplication: build.mutation<ApiResponse<Application>, string>({
      query: (id) => ({
        url: `applications/${id}/withdraw`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Application", id },
        { type: "Application", id: "LIST" },
      ],
    }),

    // Delete application
    deleteApplication: build.mutation<ApiResponse<{ message: string }>, string>(
      {
        query: (id) => ({
          url: `applications/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [
          { type: "Application", id },
          { type: "Application", id: "LIST" },
        ],
      }
    ),

    // Get application statistics
    getApplicationStats: build.query<ApiResponse<ApplicationStats>, void>({
      query: () => "applications/stats",
      providesTags: [{ type: "Application", id: "STATS" }],
    }),

    // Check if user has applied to a job
    checkApplicationStatus: build.query<
      ApiResponse<{ hasApplied: boolean; applicationId?: string }>,
      string
    >({
      query: (jobId) => `applications/check/${jobId}`,
    }),

    // Get applications for a specific job (for employers)
    getJobApplications: build.query<
      ApiResponse<Application[]>,
      { jobId: string; page?: number; limit?: number }
    >({
      query: ({ jobId, page = 1, limit = 10 }) =>
        `jobs/${jobId}/applications?page=${page}&limit=${limit}`,
      providesTags: (result, error, { jobId }) => [
        { type: "Application", id: `JOB_${jobId}` },
      ],
    }),

    // Update application status (for employers)
    updateApplicationStatus: build.mutation<
      ApiResponse<Application>,
      {
        id: string;
        status: "reviewing" | "accepted" | "rejected";
        notes?: string;
      }
    >({
      query: ({ id, status, notes }) => ({
        url: `applications/${id}/status`,
        method: "PUT",
        body: { status, notes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Application", id },
        { type: "Application", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useLazyGetApplicationsQuery,
  useGetApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useWithdrawApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationStatsQuery,
  useCheckApplicationStatusQuery,
  useLazyCheckApplicationStatusQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = applicationApi;
