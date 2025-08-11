import { api } from './api';
import { UserRole } from '../types/user.types';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface RevenueReportFilters extends DateRange {
  groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  productCategory?: string;
  customerId?: string;
  staffId?: string;
}

export interface ProductReportFilters extends DateRange {
  sortBy?: 'revenue' | 'quantity' | 'popularity' | 'availability';
  categoryId?: string;
  includeInactive?: boolean;
}

export interface CustomerReportFilters extends DateRange {
  sortBy?: 'totalSpent' | 'rentalCount' | 'registrationDate' | 'lastActivity';
  customerType?: 'individual' | 'business';
  minSpent?: number;
}

export interface ExportReportData {
  reportType: 'revenue' | 'products' | 'customers' | 'rentals' | 'inventory';
  format: 'pdf' | 'excel' | 'csv';
  filters: any;
  includeCharts?: boolean;
}

export interface DashboardData {
  overview: {
    totalRevenue: number;
    totalRentals: number;
    activeRentals: number;
    totalCustomers: number;
    pendingQuotations: number;
    overdueRentals: number;
  };
  revenueChart: {
    labels: string[];
    data: number[];
    period: string;
  };
  topProducts: {
    productId: string;
    productName: string;
    revenue: number;
    rentalCount: number;
  }[];
  recentActivities: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userId?: string;
    userName?: string;
  }[];
  upcomingPickups: any[];
  upcomingReturns: any[];
}

export const reportsService = {
  // GET /reports/dashboard?role=&dateRange=
  getDashboardData: async (role?: UserRole, dateRange?: DateRange): Promise<DashboardData> => {
    const response = await api.get('/reports/dashboard', { 
      params: { role, ...dateRange } 
    });
    return response.data;
  },

  // GET /reports/revenue?startDate=&endDate=&groupBy=
  getRevenueReport: async (filters: RevenueReportFilters) => {
    const response = await api.get('/reports/revenue', { params: filters });
    return response.data;
  },

  // GET /reports/products?startDate=&endDate=&sortBy=
  getProductReport: async (filters: ProductReportFilters) => {
    const response = await api.get('/reports/products', { params: filters });
    return response.data;
  },

  // GET /reports/customers?startDate=&endDate=&sortBy=
  getCustomerReport: async (filters: CustomerReportFilters) => {
    const response = await api.get('/reports/customers', { params: filters });
    return response.data;
  },

  // POST /reports/export
  exportReport: async (reportData: ExportReportData): Promise<Blob> => {
    const response = await api.post('/reports/export', reportData, { 
      responseType: 'blob' 
    });
    return response.data;
  },

  // Additional useful methods
  // GET /reports/rentals
  getRentalReport: async (filters: DateRange & {
    status?: string;
    customerId?: string;
    productId?: string;
  }) => {
    const response = await api.get('/reports/rentals', { params: filters });
    return response.data;
  },

  // GET /reports/inventory
  getInventoryReport: async (categoryId?: string) => {
    const response = await api.get('/reports/inventory', { 
      params: { categoryId } 
    });
    return response.data;
  },

  // GET /reports/financial
  getFinancialReport: async (filters: DateRange & {
    includeProjections?: boolean;
    groupBy?: 'month' | 'quarter';
  }) => {
    const response = await api.get('/reports/financial', { params: filters });
    return response.data;
  },

  // GET /reports/performance
  getPerformanceReport: async (filters: DateRange & {
    staffId?: string;
    metrics?: string[];
  }) => {
    const response = await api.get('/reports/performance', { params: filters });
    return response.data;
  },

  // GET /reports/analytics
  getAnalyticsReport: async (filters: DateRange & {
    metrics?: string[];
    groupBy?: string;
  }) => {
    const response = await api.get('/reports/analytics', { params: filters });
    return response.data;
  },

  // GET /reports/trends
  getTrendsReport: async (filters: DateRange & {
    type?: 'products' | 'customers' | 'revenue';
    period?: 'daily' | 'weekly' | 'monthly';
  }) => {
    const response = await api.get('/reports/trends', { params: filters });
    return response.data;
  },

  // POST /reports/schedule
  scheduleReport: async (reportConfig: {
    reportType: string;
    filters: any;
    schedule: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    format: 'pdf' | 'excel' | 'csv';
  }) => {
    const response = await api.post('/reports/schedule', reportConfig);
    return response.data;
  },

  // GET /reports/scheduled
  getScheduledReports: async () => {
    const response = await api.get('/reports/scheduled');
    return response.data;
  },

  // DELETE /reports/scheduled/:id
  deleteScheduledReport: async (id: string) => {
    const response = await api.delete(`/reports/scheduled/${id}`);
    return response.data;
  },

  // GET /reports/custom
  getCustomReport: async (query: {
    tables: string[];
    fields: string[];
    filters?: any;
    groupBy?: string[];
    orderBy?: string[];
    limit?: number;
  }) => {
    const response = await api.get('/reports/custom', { params: query });
    return response.data;
  },

  // POST /reports/custom/save
  saveCustomReport: async (reportConfig: {
    name: string;
    description?: string;
    query: any;
    isPublic?: boolean;
  }) => {
    const response = await api.post('/reports/custom/save', reportConfig);
    return response.data;
  },

  // GET /reports/kpis
  getKPIs: async (dateRange?: DateRange) => {
    const response = await api.get('/reports/kpis', { params: dateRange });
    return response.data;
  },
};

export default reportsService;
