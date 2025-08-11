// Application constants
export const APP_NAME = 'Rental Management';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: process.env.REACT_APP_TOKEN_STORAGE_KEY || 'rental_auth_token',
  REFRESH_TOKEN: process.env.REACT_APP_REFRESH_TOKEN_KEY || 'rental_refresh_token',
  USER_PREFERENCES: 'rental_user_preferences',
  THEME: 'rental_theme',
  LANGUAGE: 'rental_language',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '5242880'), // 5MB
  ALLOWED_TYPES: (process.env.REACT_APP_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(','),
  MAX_FILES: 10,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  INPUT: 'yyyy-MM-dd',
  API: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  TIME_ONLY: 'HH:mm',
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  STAFF: 'staff',
  ADMIN: 'admin',
} as const;

// Rental Status
export const RENTAL_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
} as const;

// Quotation Status
export const QUOTATION_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  VIEWED: 'viewed',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIALLY_PAID: 'partially_paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  
  // Customer Routes
  CUSTOMER: {
    DASHBOARD: '/customer/dashboard',
    PRODUCTS: '/customer/products',
    PRODUCT_DETAILS: '/customer/products/:id',
    QUOTATIONS: '/customer/quotations',
    RENTALS: '/customer/rentals',
    PROFILE: '/customer/profile',
    PAYMENTS: '/customer/payments',
  },
  
  // Staff Routes
  STAFF: {
    DASHBOARD: '/staff/dashboard',
    PICKUPS: '/staff/pickups',
    RETURNS: '/staff/returns',
    TASKS: '/staff/tasks',
    PROFILE: '/staff/profile',
  },
  
  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    QUOTATIONS: '/admin/quotations',
    RENTALS: '/admin/rentals',
    USERS: '/admin/users',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Feature Flags
export const FEATURES = {
  NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  REAL_TIME_UPDATES: process.env.REACT_APP_ENABLE_REAL_TIME_UPDATES === 'true',
  ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
} as const;

// Debounce Delays
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  API_CALL: 500,
  RESIZE: 150,
} as const;
