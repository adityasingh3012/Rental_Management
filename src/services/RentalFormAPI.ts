import { RentalOrderFormData, Customer, Product, RentalTemplate, Pricelist } from '../types/rentalForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export class RentalFormAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get customers for dropdown
  async getCustomers(): Promise<{ data: Customer[] }> {
    const response = await fetch(`${this.baseURL}/customers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Customers API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get products for order lines
  async getProducts(): Promise<{ data: Product[] }> {
    const response = await fetch(`${this.baseURL}/products?rentable=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Products API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get rental templates
  async getRentalTemplates(): Promise<{ data: RentalTemplate[] }> {
    const response = await fetch(`${this.baseURL}/rental-templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Rental Templates API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get pricelists
  async getPricelists(): Promise<{ data: Pricelist[] }> {
    const response = await fetch(`${this.baseURL}/pricelists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Pricelists API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Save rental order
  async saveRentalOrder(data: RentalOrderFormData): Promise<{ data: RentalOrderFormData }> {
    const url = data.id 
      ? `${this.baseURL}/rental-orders/${data.id}`
      : `${this.baseURL}/rental-orders`;
    
    const method = data.id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Save Rental Order API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Update pricing
  async updatePricing(orderId: string): Promise<{ data: RentalOrderFormData }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${orderId}/update-pricing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Update Pricing API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Create invoice
  async createInvoice(orderId: string): Promise<{ data: any }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${orderId}/create-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Create Invoice API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Create delivery order
  async createDeliveryOrder(orderId: string): Promise<{ data: any }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${orderId}/create-delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Create Delivery API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Create pickup order
  async createPickupOrder(orderId: string): Promise<{ data: any }> {
    const response = await fetch(`${this.baseURL}/rental-orders/${orderId}/create-pickup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Create Pickup API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const rentalFormAPI = new RentalFormAPI();