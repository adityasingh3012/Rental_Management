// Common utility types
export type ID = string | number;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  options?: SelectOption[];
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

export interface SearchFilters {
  query?: string;
  filters: Record<string, any>;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export interface Address {
  id?: ID;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  alternatePhone?: string;
}
