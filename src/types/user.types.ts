import { ID, Status, Address, ContactInfo } from './common.types';

export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  role: UserRole;
  status: Status;
  profileImage?: string;
  contactInfo: ContactInfo;
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
  };
  dashboard: {
    defaultView: 'grid' | 'list';
    itemsPerPage: number;
  };
  rental: {
    defaultRentalPeriod: number;
    preferredPaymentMethod?: string;
    autoRenewal: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  preferences?: Partial<UserPreferences>;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
