import { 
  Product, 
  ProductCategory, 
  ProductSearchParams, 
  ProductSearchResponse,
  ProductFormData,
  ProductWishlistItem,
  ProductRating,
  ProductAnalytics
} from '../types/product.types';
import { ID } from '../types/common.types';
import { ApiResponse } from '../types/api.types';
import { apiClient } from '../utils/api-utils';

// Utility function to safely extract data from API response
function extractApiData<T>(response: { data: ApiResponse<T> }, errorMessage: string): T {
  if (!response.data.data) {
    throw new Error(errorMessage);
  }
  return response.data.data;
}

/**
 * Product Service - Handles all product-related API calls
 * 
 * Backend Endpoints Documentation:
 * 
 * Products:
 * GET    /api/products                    - Get products with search/filter
 * GET    /api/products/:id                - Get single product
 * POST   /api/products                    - Create new product (Admin)
 * PUT    /api/products/:id                - Update product (Admin)
 * DELETE /api/products/:id                - Delete product (Admin)
 * POST   /api/products/bulk               - Bulk operations (Admin)
 * 
 * Categories:
 * GET    /api/categories                  - Get all categories
 * POST   /api/categories                  - Create category (Admin)
 * PUT    /api/categories/:id              - Update category (Admin)
 * DELETE /api/categories/:id              - Delete category (Admin)
 * 
 * Wishlist:
 * GET    /api/wishlist                    - Get user's wishlist
 * POST   /api/wishlist                    - Add to wishlist
 * DELETE /api/wishlist/:productId         - Remove from wishlist
 * 
 * Reviews:
 * GET    /api/products/:id/reviews        - Get product reviews
 * POST   /api/products/:id/reviews        - Add review
 * PUT    /api/reviews/:id                 - Update review
 * DELETE /api/reviews/:id                 - Delete review
 * 
 * Analytics:
 * GET    /api/products/:id/analytics      - Get product analytics (Admin)
 * POST   /api/products/:id/view           - Track product view
 */

class ProductService {
  async getProducts(params: ProductSearchParams = {}): Promise<ProductSearchResponse> {
    const response = await apiClient.get<ApiResponse<ProductSearchResponse>>('/products', { params });
    return extractApiData(response, 'Failed to fetch products');
  }

  async getProduct(id: ID): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return extractApiData(response, 'Failed to fetch product');
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured', { params: { limit } });
    return extractApiData(response, 'Failed to fetch featured products');
  }

  async getRelatedProducts(productId: ID, limit: number = 4): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(`/products/${productId}/related`, { params: { limit } });
    return extractApiData(response, 'Failed to fetch related products');
  }

  async createProduct(productData: ProductFormData): Promise<Product> {
    const formData = new FormData();
    
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'images') return;
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    productData.images.forEach((image: File) => {
      formData.append('images', image);
    });

    const response = await apiClient.post<ApiResponse<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return extractApiData(response, 'Failed to create product');
  }

  async updateProduct(id: ID, productData: Partial<ProductFormData>): Promise<Product> {
    const formData = new FormData();
    
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return extractApiData(response, 'Failed to update product');
  }

  async deleteProduct(id: ID): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }

  async bulkOperation(operation: 'delete' | 'activate' | 'deactivate', productIds: ID[]): Promise<void> {
    await apiClient.post('/products/bulk', { operation, productIds });
  }

  async getCategories(): Promise<ProductCategory[]> {
    const response = await apiClient.get<ApiResponse<ProductCategory[]>>('/categories');
    return extractApiData(response, 'Failed to fetch categories');
  }

  async createCategory(categoryData: Omit<ProductCategory, 'id'>): Promise<ProductCategory> {
    const response = await apiClient.post<ApiResponse<ProductCategory>>('/categories', categoryData);
    return extractApiData(response, 'Failed to create category');
  }

  async updateCategory(id: ID, categoryData: Partial<ProductCategory>): Promise<ProductCategory> {
    const response = await apiClient.put<ApiResponse<ProductCategory>>(`/categories/${id}`, categoryData);
    return extractApiData(response, 'Failed to update category');
  }

  async deleteCategory(id: ID): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  }

  async getWishlist(): Promise<ProductWishlistItem[]> {
    const response = await apiClient.get<ApiResponse<ProductWishlistItem[]>>('/wishlist');
    return extractApiData(response, 'Failed to fetch wishlist');
  }

  async addToWishlist(productId: ID): Promise<ProductWishlistItem> {
    const response = await apiClient.post<ApiResponse<ProductWishlistItem>>('/wishlist', { productId });
    return extractApiData(response, 'Failed to add to wishlist');
  }

  async removeFromWishlist(productId: ID): Promise<void> {
    await apiClient.delete(`/wishlist/${productId}`);
  }

  async trackProductView(productId: ID): Promise<void> {
    await apiClient.post(`/products/${productId}/view`);
  }

  async checkAvailability(productId: ID, startDate: string, endDate: string, quantity: number = 1): Promise<{
    isAvailable: boolean;
    availableQuantity: number;
    conflicts: Array<{ date: string; reason: string }>;
  }> {
    const response = await apiClient.post<ApiResponse<{
      isAvailable: boolean;
      availableQuantity: number;
      conflicts: Array<{ date: string; reason: string }>;
    }>>(`/products/${productId}/availability`, { startDate, endDate, quantity });
    return extractApiData(response, 'Failed to check availability');
  }

  async getProductReviews(productId: ID, page: number = 1, limit: number = 10): Promise<{
    reviews: ProductRating[];
    totalCount: number;
    averageRating: number;
  }> {
    const response = await apiClient.get<ApiResponse<{
      reviews: ProductRating[];
      totalCount: number;
      averageRating: number;
    }>>(`/products/${productId}/reviews`, { params: { page, limit } });
    return extractApiData(response, 'Failed to fetch product reviews');
  }
}

export const productService = new ProductService();
export default productService;
