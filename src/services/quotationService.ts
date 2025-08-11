import { api } from './api';
import { Quotation, QuotationItem } from '../types/rental.types';
import { PaginationParams } from './productService.new';

export interface QuotationFilters {
  status?: 'pending' | 'approved' | 'rejected' | 'expired';
  customerId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  minAmount?: number;
  maxAmount?: number;
}

export interface CreateQuotationData {
  customerId?: string;
  products: {
    productId: string;
    quantity: number;
    specialRequirements?: string;
  }[];
  startDate: string;
  endDate: string;
  notes?: string;
  customerInfo?: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

export interface UpdateQuotationData {
  products?: {
    productId: string;
    quantity: number;
    unitPrice?: number;
    specialRequirements?: string;
  }[];
  startDate?: string;
  endDate?: string;
  notes?: string;
  totalAmount?: number;
}

export type QuotationStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export const quotationService = {
  // GET /quotations?status=&page=&limit=
  getQuotations: async (filters?: QuotationFilters, pagination?: PaginationParams) => {
    const response = await api.get('/quotations', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // GET /quotations/:id
  getQuotation: async (id: string): Promise<Quotation> => {
    const response = await api.get(`/quotations/${id}`);
    return response.data;
  },

  // POST /quotations
  createQuotation: async (quotationData: CreateQuotationData): Promise<Quotation> => {
    const response = await api.post('/quotations', quotationData);
    return response.data;
  },

  // PUT /quotations/:id/status
  updateQuotationStatus: async (id: string, status: QuotationStatus, notes?: string): Promise<Quotation> => {
    const response = await api.put(`/quotations/${id}/status`, { status, notes });
    return response.data;
  },

  // PUT /quotations/:id (Admin only)
  updateQuotation: async (id: string, quotationData: UpdateQuotationData): Promise<Quotation> => {
    const response = await api.put(`/quotations/${id}`, quotationData);
    return response.data;
  },

  // DELETE /quotations/:id
  deleteQuotation: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/quotations/${id}`);
    return response.data;
  },

  // Additional useful methods
  // POST /quotations/:id/accept
  acceptQuotation: async (id: string): Promise<Quotation> => {
    const response = await api.post(`/quotations/${id}/accept`);
    return response.data;
  },

  // POST /quotations/:id/reject
  rejectQuotation: async (id: string, reason?: string): Promise<Quotation> => {
    const response = await api.post(`/quotations/${id}/reject`, { reason });
    return response.data;
  },

  // POST /quotations/:id/duplicate
  duplicateQuotation: async (id: string): Promise<Quotation> => {
    const response = await api.post(`/quotations/${id}/duplicate`);
    return response.data;
  },

  // GET /quotations/:id/pdf
  getQuotationPDF: async (id: string): Promise<Blob> => {
    const response = await api.get(`/quotations/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // POST /quotations/bulk-update
  bulkUpdateQuotations: async (ids: string[], updates: Partial<UpdateQuotationData>): Promise<{ message: string; updated: number }> => {
    const response = await api.post('/quotations/bulk-update', { ids, updates });
    return response.data;
  },
};

export default quotationService;
