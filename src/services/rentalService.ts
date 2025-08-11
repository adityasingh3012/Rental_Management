import { api } from './api';
import { Rental, RentalStatus } from '../types/rental.types';
import { PaginationParams } from './productService.new';

export interface RentalFilters {
  status?: RentalStatus;
  customerId?: string;
  staffId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  overdue?: boolean;
}

export interface CreateRentalData {
  customerId?: string;
  products: {
    productId: string;
    quantity: number;
    unitPrice: number;
    accessories?: string[];
    insurance?: string;
  }[];
  startDate: string;
  endDate: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  specialInstructions?: string;
  deposit?: number;
}

export interface UpdateRentalData {
  startDate?: string;
  endDate?: string;
  deliveryAddress?: any;
  specialInstructions?: string;
  status?: RentalStatus;
}

export const rentalService = {
  // GET /rentals?status=&customerId=&page=&limit=
  getRentals: async (filters?: RentalFilters, pagination?: PaginationParams) => {
    const response = await api.get('/rentals', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // GET /rentals/:id
  getRental: async (id: string): Promise<Rental> => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },

  // POST /rentals (Convert quotation to rental)
  createRental: async (quotationId: string, rentalData?: CreateRentalData): Promise<Rental> => {
    const response = await api.post('/rentals', { quotationId, ...rentalData });
    return response.data;
  },

  // PUT /rentals/:id/status
  updateRentalStatus: async (id: string, status: RentalStatus, notes?: string): Promise<Rental> => {
    const response = await api.put(`/rentals/${id}/status`, { status, notes });
    return response.data;
  },

  // PUT /rentals/:id
  updateRental: async (id: string, rentalData: UpdateRentalData): Promise<Rental> => {
    const response = await api.put(`/rentals/${id}`, rentalData);
    return response.data;
  },

  // Additional useful methods
  // GET /rentals/active
  getActiveRentals: async (customerId?: string) => {
    const response = await api.get('/rentals/active', { 
      params: { customerId } 
    });
    return response.data;
  },

  // GET /rentals/overdue
  getOverdueRentals: async () => {
    const response = await api.get('/rentals/overdue');
    return response.data;
  },

  // POST /rentals/:id/extend
  extendRental: async (id: string, newEndDate: string, additionalFee?: number): Promise<Rental> => {
    const response = await api.post(`/rentals/${id}/extend`, { 
      newEndDate, 
      additionalFee 
    });
    return response.data;
  },

  // POST /rentals/:id/cancel
  cancelRental: async (id: string, reason?: string): Promise<Rental> => {
    const response = await api.post(`/rentals/${id}/cancel`, { reason });
    return response.data;
  },

  // GET /rentals/:id/timeline
  getRentalTimeline: async (id: string) => {
    const response = await api.get(`/rentals/${id}/timeline`);
    return response.data;
  },

  // GET /rentals/:id/documents
  getRentalDocuments: async (id: string) => {
    const response = await api.get(`/rentals/${id}/documents`);
    return response.data;
  },

  // POST /rentals/:id/documents
  uploadRentalDocument: async (id: string, file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post(`/rentals/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // GET /rentals/:id/contract
  getRentalContract: async (id: string): Promise<Blob> => {
    const response = await api.get(`/rentals/${id}/contract`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

export default rentalService;
