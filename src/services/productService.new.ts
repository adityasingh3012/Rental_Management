import { api } from './api';
import { Product, ProductCategory } from '../types/product.types';
import { SearchFilters, PaginatedResponse } from '../types/common.types';

export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  categoryId: string;
  images: string[];
  pricing: {
    hourly?: number;
    daily: number;
    weekly?: number;
    monthly?: number;
    currency: string;
  };
  specifications: Record<string, any>;
  status: 'active' | 'inactive';
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductAvailability {
  isAvailable: boolean;
  availableQuantity: number;
  conflictingRentals?: any[];
  suggestedDates?: string[];
}

export const productService = {
  // GET /products?search=&category=&page=&limit=
  getProducts: async (filters?: FilterOptions, pagination?: PaginationParams): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', { 
      params: { ...filters, ...pagination } 
    });
    return response.data;
  },

  // GET /products/:id
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // GET /products/:id/availability?startDate=&endDate=
  getProductAvailability: async (id: string, startDate: string, endDate: string): Promise<ProductAvailability> => {
    const response = await api.get(`/products/${id}/availability`, { 
      params: { startDate, endDate } 
    });
    return response.data;
  },

  // POST /products (Admin only)
  createProduct: async (productData: CreateProductData): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // PUT /products/:id (Admin only)
  updateProduct: async (id: string, productData: UpdateProductData): Promise<Product> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // DELETE /products/:id (Admin only)
  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // GET /products/categories
  getCategories: async (): Promise<ProductCategory[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Additional useful methods
  // GET /products/featured
  getFeaturedProducts: async (limit?: number): Promise<Product[]> => {
    const response = await api.get('/products/featured', { 
      params: { limit } 
    });
    return response.data;
  },

  // GET /products/search
  searchProducts: async (query: string, filters?: SearchFilters): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products/search', { 
      params: { query, ...filters } 
    });
    return response.data;
  },
};

export default productService;
