// Application related types and DTOs

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewing" | "accepted" | "rejected" | "withdrawn";
  coverLetter?: string;
  resume?: {
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
  };
  appliedAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
  notes?: string;
}

export interface CreateApplicationRequest {
  jobId: string;
  coverLetter?: string;
  resumeFile?: File | any; // For file upload
}

export interface UpdateApplicationRequest {
  status?: "withdrawn";
  coverLetter?: string;
}

export interface ApplicationFilters {
  status?: string[];
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: "date" | "status" | "company";
  sortOrder?: "asc" | "desc";
}

export interface ApplicationsResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: {
    pending: number;
    reviewing: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
  };
}

export interface ApplicationStats {
  total: number;
  thisMonth: number;
  pending: number;
  accepted: number;
  rejected: number;
  responseRate: number;
}
