import { api } from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  ProfileUpdateData,
  User,
  PasswordResetRequest,
  PasswordReset
} from '../types/user.types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  // POST /auth/login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // POST /auth/register  
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // POST /auth/forgot-password
  forgotPassword: async (data: PasswordResetRequest): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  // POST /auth/reset-password
  resetPassword: async (data: PasswordReset): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // GET /auth/me
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // PUT /auth/profile
  updateProfile: async (profileData: ProfileUpdateData): Promise<User> => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // POST /auth/logout
  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // POST /auth/refresh-token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  // POST /auth/verify-email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // POST /auth/resend-verification
  resendVerification: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },

  // POST /auth/change-password
  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },
};

export default authService;
