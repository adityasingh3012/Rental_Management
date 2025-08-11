import { api } from './api';
import { User, UserRole } from '../types/user.types';
import { PaginationParams } from './productService.new';

export interface UserFilters {
  role?: UserRole;
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  emailVerified?: boolean;
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  password?: string; // Optional - can be auto-generated
  sendWelcomeEmail?: boolean;
  permissions?: string[];
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
  status?: 'active' | 'inactive' | 'suspended';
  permissions?: string[];
  contactInfo?: {
    phone?: string;
    alternatePhone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export const userService = {
  // GET /users?role=&status=&page=&limit= (Admin only)
  getUsers: async (filters?: UserFilters, pagination?: PaginationParams) => {
    const response = await api.get('/users', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // GET /users/:id (Admin only)
  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // POST /users (Admin only)
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // PUT /users/:id (Admin only)
  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // DELETE /users/:id (Admin only)
  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // PUT /users/:id/status (Admin only)
  updateUserStatus: async (id: string, status: UserStatus, reason?: string): Promise<User> => {
    const response = await api.put(`/users/${id}/status`, { status, reason });
    return response.data;
  },

  // Additional useful methods
  // GET /users/staff
  getStaffUsers: async () => {
    const response = await api.get('/users/staff');
    return response.data;
  },

  // GET /users/customers
  getCustomers: async (filters?: Omit<UserFilters, 'role'>, pagination?: PaginationParams) => {
    const response = await api.get('/users/customers', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // PUT /users/:id/role
  updateUserRole: async (id: string, role: UserRole): Promise<User> => {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data;
  },

  // POST /users/:id/reset-password
  resetUserPassword: async (id: string, sendEmail: boolean = true): Promise<{ message: string; temporaryPassword?: string }> => {
    const response = await api.post(`/users/${id}/reset-password`, { sendEmail });
    return response.data;
  },

  // PUT /users/:id/permissions
  updateUserPermissions: async (id: string, permissions: string[]): Promise<User> => {
    const response = await api.put(`/users/${id}/permissions`, { permissions });
    return response.data;
  },

  // GET /users/:id/activity
  getUserActivity: async (id: string, limit?: number) => {
    const response = await api.get(`/users/${id}/activity`, { 
      params: { limit } 
    });
    return response.data;
  },

  // GET /users/:id/rentals
  getUserRentals: async (id: string, status?: string) => {
    const response = await api.get(`/users/${id}/rentals`, { 
      params: { status } 
    });
    return response.data;
  },

  // POST /users/bulk-actions
  bulkUpdateUsers: async (userIds: string[], action: string, data?: any) => {
    const response = await api.post('/users/bulk-actions', { 
      userIds, 
      action, 
      data 
    });
    return response.data;
  },

  // POST /users/invite
  inviteUser: async (inviteData: {
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    message?: string;
  }) => {
    const response = await api.post('/users/invite', inviteData);
    return response.data;
  },

  // GET /users/search
  searchUsers: async (query: string, role?: UserRole) => {
    const response = await api.get('/users/search', { 
      params: { query, role } 
    });
    return response.data;
  },

  // POST /users/:id/suspend
  suspendUser: async (id: string, reason: string, duration?: number) => {
    const response = await api.post(`/users/${id}/suspend`, { 
      reason, 
      duration 
    });
    return response.data;
  },

  // POST /users/:id/unsuspend
  unsuspendUser: async (id: string) => {
    const response = await api.post(`/users/${id}/unsuspend`);
    return response.data;
  },
};

export default userService;
