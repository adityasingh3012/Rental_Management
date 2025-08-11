import { api } from './api';

export interface PaymentFilters {
  rentalId?: string;
  customerId?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'disputed';
  paymentMethod?: 'card' | 'bank_transfer' | 'cash' | 'check' | 'digital_wallet';
  dateRange?: {
    start: string;
    end: string;
  };
  minAmount?: number;
  maxAmount?: number;
}

export interface InvoiceFilters {
  customerId?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface CreatePaymentData {
  rentalId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'check' | 'digital_wallet';
  description?: string;
  metadata?: Record<string, any>;
  customerInfo?: {
    email: string;
    name: string;
  };
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethods: string[];
}

export interface Payment {
  id: string;
  rentalId?: string;
  customerId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  processorResponse?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  rentalId?: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
  dueDate: string;
  paidAt?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
}

export const paymentService = {
  // GET /payments?rentalId=&status=
  getPayments: async (filters?: PaymentFilters) => {
    const response = await api.get('/payments', { params: filters });
    return response.data;
  },

  // GET /payments/:id
  getPayment: async (id: string): Promise<Payment> => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  // POST /payments/intent (Create payment intent)
  createPaymentIntent: async (paymentData: CreatePaymentData): Promise<PaymentIntent> => {
    const response = await api.post('/payments/intent', paymentData);
    return response.data;
  },

  // POST /payments/confirm (Confirm payment)
  confirmPayment: async (paymentIntentId: string, paymentMethodId: string): Promise<Payment> => {
    const response = await api.post('/payments/confirm', { 
      paymentIntentId, 
      paymentMethodId 
    });
    return response.data;
  },

  // POST /payments/process (Direct payment processing)
  processPayment: async (paymentData: CreatePaymentData): Promise<Payment> => {
    const response = await api.post('/payments/process', paymentData);
    return response.data;
  },

  // POST /payments/:id/refund
  refundPayment: async (id: string, amount?: number, reason?: string): Promise<Payment> => {
    const response = await api.post(`/payments/${id}/refund`, { 
      amount, 
      reason 
    });
    return response.data;
  },

  // GET /invoices?customerId=&status=
  getInvoices: async (filters?: InvoiceFilters) => {
    const response = await api.get('/invoices', { params: filters });
    return response.data;
  },

  // GET /invoices/:id
  getInvoice: async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  // POST /invoices
  createInvoice: async (invoiceData: {
    customerId: string;
    rentalId?: string;
    items: InvoiceItem[];
    dueDate: string;
    notes?: string;
  }): Promise<Invoice> => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },

  // PUT /invoices/:id/send
  sendInvoice: async (id: string, email?: string): Promise<{ message: string }> => {
    const response = await api.put(`/invoices/${id}/send`, { email });
    return response.data;
  },

  // PUT /invoices/:id/mark-paid
  markInvoicePaid: async (id: string, paymentDetails?: any): Promise<Invoice> => {
    const response = await api.put(`/invoices/${id}/mark-paid`, paymentDetails);
    return response.data;
  },

  // GET /invoices/:id/download
  downloadInvoice: async (id: string): Promise<Blob> => {
    const response = await api.get(`/invoices/${id}/download`, { 
      responseType: 'blob' 
    });
    return response.data;
  },

  // Additional useful methods
  // GET /payments/methods
  getPaymentMethods: async (customerId?: string) => {
    const response = await api.get('/payments/methods', { 
      params: { customerId } 
    });
    return response.data;
  },

  // POST /payments/methods
  savePaymentMethod: async (paymentMethodData: any) => {
    const response = await api.post('/payments/methods', paymentMethodData);
    return response.data;
  },

  // DELETE /payments/methods/:id
  deletePaymentMethod: async (id: string) => {
    const response = await api.delete(`/payments/methods/${id}`);
    return response.data;
  },

  // GET /payments/transactions
  getTransactionHistory: async (customerId?: string, filters?: any) => {
    const response = await api.get('/payments/transactions', { 
      params: { customerId, ...filters } 
    });
    return response.data;
  },

  // POST /payments/webhooks
  handleWebhook: async (payload: any, signature: string) => {
    const response = await api.post('/payments/webhooks', payload, {
      headers: {
        'X-Signature': signature,
      },
    });
    return response.data;
  },
};

export default paymentService;
