import { api } from './api';
import { PaginationParams } from './productService.new';

export interface NotificationFilters {
  read?: boolean;
  type?: 'info' | 'warning' | 'error' | 'success' | 'rental' | 'payment' | 'system';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'rental' | 'payment' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  readAt?: string;
}

export interface SendNotificationData {
  userIds?: string[];
  roles?: string[];
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'rental' | 'payment' | 'system';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionText?: string;
  sendEmail?: boolean;
  sendSms?: boolean;
  sendPush?: boolean;
  metadata?: Record<string, any>;
  scheduleFor?: string; // ISO date string for scheduled notifications
}

export const notificationService = {
  // GET /notifications?read=&type=&page=&limit=
  getNotifications: async (filters?: NotificationFilters, pagination?: PaginationParams) => {
    const response = await api.get('/notifications', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // GET /notifications/:id
  getNotification: async (id: string): Promise<Notification> => {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  },

  // PUT /notifications/:id/read
  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // PUT /notifications/read-all
  markAllAsRead: async (): Promise<{ message: string; count: number }> => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // DELETE /notifications/:id
  deleteNotification: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // POST /notifications (Admin only)
  sendNotification: async (notificationData: SendNotificationData): Promise<{ message: string; sentCount: number }> => {
    const response = await api.post('/notifications', notificationData);
    return response.data;
  },

  // Additional useful methods
  // GET /notifications/unread-count
  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },

  // GET /notifications/recent
  getRecentNotifications: async (limit: number = 10): Promise<Notification[]> => {
    const response = await api.get('/notifications/recent', { 
      params: { limit } 
    });
    return response.data;
  },

  // PUT /notifications/bulk-read
  markMultipleAsRead: async (notificationIds: string[]): Promise<{ message: string; count: number }> => {
    const response = await api.put('/notifications/bulk-read', { 
      notificationIds 
    });
    return response.data;
  },

  // DELETE /notifications/bulk-delete
  deleteMultiple: async (notificationIds: string[]): Promise<{ message: string; count: number }> => {
    const response = await api.delete('/notifications/bulk-delete', { 
      data: { notificationIds } 
    });
    return response.data;
  },

  // GET /notifications/settings
  getNotificationSettings: async () => {
    const response = await api.get('/notifications/settings');
    return response.data;
  },

  // PUT /notifications/settings
  updateNotificationSettings: async (settings: {
    emailEnabled?: boolean;
    smsEnabled?: boolean;
    pushEnabled?: boolean;
    types?: Record<string, boolean>;
  }) => {
    const response = await api.put('/notifications/settings', settings);
    return response.data;
  },

  // POST /notifications/test
  sendTestNotification: async (type: string): Promise<{ message: string }> => {
    const response = await api.post('/notifications/test', { type });
    return response.data;
  },

  // GET /notifications/templates (Admin only)
  getNotificationTemplates: async () => {
    const response = await api.get('/notifications/templates');
    return response.data;
  },

  // POST /notifications/templates (Admin only)
  createNotificationTemplate: async (templateData: {
    name: string;
    type: string;
    title: string;
    message: string;
    variables?: string[];
  }) => {
    const response = await api.post('/notifications/templates', templateData);
    return response.data;
  },

  // POST /notifications/broadcast (Admin only)
  broadcastNotification: async (notificationData: Omit<SendNotificationData, 'userIds'>) => {
    const response = await api.post('/notifications/broadcast', notificationData);
    return response.data;
  },

  // GET /notifications/history (Admin only)
  getNotificationHistory: async (filters?: {
    userId?: string;
    type?: string;
    dateRange?: { start: string; end: string };
  }, pagination?: PaginationParams) => {
    const response = await api.get('/notifications/history', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },
};

export default notificationService;
