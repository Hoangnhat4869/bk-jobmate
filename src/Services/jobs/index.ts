import { API } from "../base";
import {
  Job,
  JobFilters,
  JobSearchResponse,
  CreateJobRequest,
  UpdateJobRequest,
  SavedJob,
  ApiResponse,
} from "../types";

const jobApi = API.injectEndpoints({
  endpoints: (build) => ({
    // Search and filter jobs
    searchJobs: build.query<ApiResponse<JobSearchResponse>, JobFilters>({
      query: (filters) => {
        const params = new URLSearchParams();

        // Add filters to query params
        if (filters.search) params.append("search", filters.search);
        if (filters.location) params.append("location", filters.location);
        if (filters.type?.length) params.append("type", filters.type.join(","));
        if (filters.level?.length)
          params.append("level", filters.level.join(","));
        if (filters.remote !== undefined)
          params.append("remote", String(filters.remote));
        if (filters.salaryMin)
          params.append("salaryMin", String(filters.salaryMin));
        if (filters.salaryMax)
          params.append("salaryMax", String(filters.salaryMax));
        if (filters.skills?.length)
          params.append("skills", filters.skills.join(","));
        if (filters.page) params.append("page", String(filters.page));
        if (filters.limit) params.append("limit", String(filters.limit));
        if (filters.sortBy) params.append("sortBy", filters.sortBy);
        if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

        return `jobs?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.jobs
          ? [
              ...result.data.jobs.map(({ id }) => ({
                type: "Job" as const,
                id,
              })),
              { type: "Job", id: "LIST" },
            ]
          : [{ type: "Job", id: "LIST" }],
    }),

    // Get job by ID
    getJob: build.query<ApiResponse<Job>, string>({
      query: (id) => `jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),

    // Get featured jobs
    getFeaturedJobs: build.query<ApiResponse<Job[]>, { limit?: number }>({
      query: ({ limit = 10 }) => `jobs/featured?limit=${limit}`,
      providesTags: [{ type: "Job", id: "FEATURED" }],
    }),

    // Get recommended jobs for user
    getRecommendedJobs: build.query<ApiResponse<Job[]>, { limit?: number }>({
      query: ({ limit = 10 }) => `jobs/recommended?limit=${limit}`,
      providesTags: [{ type: "Job", id: "RECOMMENDED" }],
    }),

    // Create new job (for employers)
    createJob: build.mutation<ApiResponse<Job>, CreateJobRequest>({
      query: (jobData) => ({
        url: "jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),

    // Update job (for employers)
    updateJob: build.mutation<
      ApiResponse<Job>,
      { id: string; data: UpdateJobRequest }
    >({
      query: ({ id, data }) => ({
        url: `jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Job", id },
        { type: "Job", id: "LIST" },
      ],
    }),

    // Delete job (for employers)
    deleteJob: build.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Job", id },
        { type: "Job", id: "LIST" },
      ],
    }),

    // Save job for later
    saveJob: build.mutation<ApiResponse<SavedJob>, string>({
      query: (jobId) => ({
        url: `jobs/${jobId}/save`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Job", id: "SAVED" }],
    }),

    // Unsave job
    unsaveJob: build.mutation<ApiResponse<{ message: string }>, string>({
      query: (jobId) => ({
        url: `jobs/${jobId}/unsave`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Job", id: "SAVED" }],
    }),

    // Get saved jobs
    getSavedJobs: build.query<
      ApiResponse<SavedJob[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `jobs/saved?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Job", id: "SAVED" }],
    }),

    // Get job statistics
    getJobStats: build.query<
      ApiResponse<{
        total: number;
        thisWeek: number;
        featured: number;
        byType: Record<string, number>;
        byLocation: Record<string, number>;
      }>,
      void
    >({
      query: () => "jobs/stats",
    }),
  }),
  overrideExisting: false,
});

export const {
  useSearchJobsQuery,
  useLazySearchJobsQuery,
  useGetJobQuery,
  useLazyGetJobQuery,
  useGetFeaturedJobsQuery,
  useGetRecommendedJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetSavedJobsQuery,
  useGetJobStatsQuery,
} = jobApi;
