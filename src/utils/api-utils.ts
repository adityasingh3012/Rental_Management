import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from './constants';
import { storage } from './helpers';
import { ApiError, ApiRequestConfig, ApiResponse } from '../types/api.types';

// Create axios instance with default configuration
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        
        // Redirect to login page
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// Default API client instance
export const apiClient = createApiClient();

// Generic API request function
export const apiRequest = async <T = any>(
  config: ApiRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request<ApiResponse<T>>({
      method: config.method,
      url: config.url,
      data: config.data,
      params: config.params,
      headers: config.headers,
      timeout: config.timeout,
    });

    return response.data;
  } catch (error: any) {
    throw createApiError(error);
  }
};

// Create standardized API error
export const createApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    return {
      code: error.response.status.toString(),
      message: error.response.data?.message || error.response.statusText,
      details: error.response.data,
    };
  } else if (error.request) {
    // Network error
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error occurred. Please check your connection.',
    };
  } else {
    // Other error
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
    };
  }
};

// HTTP method helpers
export const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ 
    method: 'GET', 
    url, 
    params: config?.params,
    timeout: config?.timeout
  });
};

export const post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ 
    method: 'POST', 
    url, 
    data,
    params: config?.params,
    timeout: config?.timeout
  });
};

export const put = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ 
    method: 'PUT', 
    url, 
    data,
    params: config?.params,
    timeout: config?.timeout
  });
};

export const patch = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ 
    method: 'PATCH', 
    url, 
    data,
    params: config?.params,
    timeout: config?.timeout
  });
};

export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return apiRequest<T>({ 
    method: 'DELETE', 
    url,
    params: config?.params,
    timeout: config?.timeout
  });
};

// File upload helper
export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<ApiResponse<any>> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    });

    return response.data;
  } catch (error: any) {
    throw createApiError(error);
  }
};

// Download file helper
export const downloadFile = async (url: string, filename?: string): Promise<void> => {
  try {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error: any) {
    throw createApiError(error);
  }
};

// Retry logic for failed requests
export const retryRequest = async <T = any>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
};

// Request cancellation
export const createCancelToken = () => {
  return axios.CancelToken.source();
};

export const isCancelledRequest = (error: any): boolean => {
  return axios.isCancel(error);
};

// API response type guards
export const isSuccessResponse = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true } => {
  return response.success === true;
};

export const isErrorResponse = (response: ApiResponse): response is ApiResponse & { success: false } => {
  return response.success === false;
};

// Batch requests
export const batchRequests = async <T = any>(
  requests: (() => Promise<T>)[]
): Promise<PromiseSettledResult<T>[]> => {
  return Promise.allSettled(requests.map(request => request()));
};

// Transform request/response data
export const transformRequest = (data: any): any => {
  // Transform request data if needed (e.g., convert dates to ISO strings)
  if (data && typeof data === 'object') {
    const transformed = { ...data };
    Object.keys(transformed).forEach(key => {
      if (transformed[key] instanceof Date) {
        transformed[key] = transformed[key].toISOString();
      }
    });
    return transformed;
  }
  return data;
};

export const transformResponse = (data: any): any => {
  // Transform response data if needed (e.g., parse date strings)
  if (data && typeof data === 'object') {
    const transformed = { ...data };
    Object.keys(transformed).forEach(key => {
      if (typeof transformed[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(transformed[key])) {
        transformed[key] = new Date(transformed[key]);
      }
    });
    return transformed;
  }
  return data;
};
