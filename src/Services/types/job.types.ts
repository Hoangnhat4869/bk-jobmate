// Job related types and DTOs

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  type: "full-time" | "part-time" | "contract" | "internship";
  level: "entry" | "junior" | "mid" | "senior" | "lead";
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  remote: boolean;
  featured: boolean;
  postedAt: string;
  expiresAt: string;
  applicationCount: number;
  status: "active" | "closed" | "draft";
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string[];
  level?: string[];
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  page?: number;
  limit?: number;
  sortBy?: "relevance" | "date" | "salary" | "company";
  sortOrder?: "asc" | "desc";
}

export interface JobSearchResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: {
    locations: string[];
    types: string[];
    levels: string[];
    skills: string[];
  };
}

export interface CreateJobRequest {
  title: string;
  company: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  type: string;
  level: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  remote: boolean;
  expiresAt: string;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: "active" | "closed" | "draft";
}

export interface SavedJob {
  id: string;
  jobId: string;
  userId: string;
  savedAt: string;
  job: Job;
}
