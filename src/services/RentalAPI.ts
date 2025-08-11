import { RentalOrder, RentalFilters, RentalStats } from '../types/rental';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface GetRentalOrdersParams {
  filters: RentalFilters;
  page: number;
  limit: number;
  search?: string;
}

interface GetRentalOrdersResponse {
  orders: RentalOrder[];
  stats: RentalStats;
  total: number;
  page: number;
  totalPages: number;
}

export class RentalAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get rental orders with filters and pagination
  async getOrders(params: GetRentalOrdersParams): Promise<{ data: GetRentalOrdersResponse }> {
    const searchParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      ...(params.search && { search: params.search }),
      ...(params.filters.rentalStatus && { 
        rental_status: params.filters.rentalStatus.join(',') 
      }),
      ...(params.filters.invoiceStatus && { 
        invoice_status: params.filters.invoiceStatus.join(',') 
      }),
      ...(params.filters.customer && { customer: params.filters.customer }),
      ...(params.filters.dateRange && {
        start_date: params.filters.dateRange.start,
        end_date: params.filters.dateRange.end
      })
    });

    const response = await fetch(`${this.baseURL}/rental-orders?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Rental Orders API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get rental order by ID
  async getOrderById(id: string): Promise<{ data: RentalOrder }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Rental Order API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Create new rental order
  async createOrder(orderData: Partial<RentalOrder>): Promise<{ data: RentalOrder }> {
    const response = await fetch(`${this.baseURL}/rental-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`Create Rental Order API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Update rental order
  async updateOrder(id: string, orderData: Partial<RentalOrder>): Promise<{ data: RentalOrder }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`Update Rental Order API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Delete rental order
  async deleteOrder(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/rental-orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Delete Rental Order API error: ${response.statusText}`);
    }
  }

  // Get rental statistics
  async getStats(filters?: RentalFilters): Promise<{ data: RentalStats }> {
    const searchParams = new URLSearchParams();
    
    if (filters?.rentalStatus) {
      searchParams.set('rental_status', filters.rentalStatus.join(','));
    }
    if (filters?.invoiceStatus) {
      searchParams.set('invoice_status', filters.invoiceStatus.join(','));
    }
    if (filters?.dateRange) {
      searchParams.set('start_date', filters.dateRange.start);
      searchParams.set('end_date', filters.dateRange.end);
    }

    const response = await fetch(`${this.baseURL}/rental-orders/stats?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Rental Stats API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const rentalAPI = new RentalAPI();