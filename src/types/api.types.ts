import { ApiResponse, PaginatedResponse } from './common.types';

// Re-export common types
export type { ApiResponse, PaginatedResponse };

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Request Configuration
export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Generic API Response Types
export interface SuccessResponse<T = any> extends ApiResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
  errors?: ValidationError[];
}

// Pagination Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Search Query Parameters
export interface SearchParams extends PaginationParams {
  q?: string;
  filters?: Record<string, any>;
}

// File Upload Types
export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Notification Types
export interface NotificationResponse {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  label: string;
  action: string;
  primary?: boolean;
}

// Dashboard/Analytics Types
export interface DashboardStats {
  totalRentals: number;
  activeRentals: number;
  pendingQuotations: number;
  monthlyRevenue: number;
  customerSatisfaction: number;
  utilizationRate: number;
}

export interface AnalyticsData {
  period: string;
  metrics: {
    rentals: number;
    revenue: number;
    customers: number;
    utilization: number;
  };
}

// System Health Types
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  services: ServiceHealth[];
  lastChecked: string;
}

export interface ServiceHealth {
  name: string;
  status: 'up' | 'down' | 'slow';
  responseTime?: number;
  lastChecked: string;
}

// Export common combinations
export type ApiResponseType<T = any> = SuccessResponse<T> | ErrorResponse;
export type PaginatedApiResponse<T> = ApiResponseType<PaginatedResponse<T>>;

// API Endpoints Configuration
export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    forgotPassword: string;
    resetPassword: string;
    verifyEmail: string;
  };
  users: {
    profile: string;
    updateProfile: string;
    changePassword: string;
    preferences: string;
  };
  products: {
    list: string;
    details: (id: string) => string;
    categories: string;
    search: string;
    availability: (id: string) => string;
  };
  quotations: {
    list: string;
    create: string;
    details: (id: string) => string;
    update: (id: string) => string;
    accept: (id: string) => string;
    reject: (id: string) => string;
  };
  rentals: {
    list: string;
    create: string;
    details: (id: string) => string;
    update: (id: string) => string;
    timeline: (id: string) => string;
  };
  payments: {
    process: string;
    history: string;
    methods: string;
  };
  uploads: {
    single: string;
    multiple: string;
  };
  notifications: {
    list: string;
    markRead: (id: string) => string;
    markAllRead: string;
  };
  dashboard: {
    stats: string;
    analytics: string;
  };
  system: {
    health: string;
  };
}
