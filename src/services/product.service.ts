import { Product, ProductFormData } from '../types/product.types';

export const productService = {
  // Placeholder service methods
  getAllProducts: async (): Promise<Product[]> => {
    return [];
  },
  
  getProductById: async (id: string): Promise<Product | null> => {
    return null;
  },
  
  createProduct: async (data: ProductFormData): Promise<Product> => {
    throw new Error('Not implemented');
  },
  
  updateProduct: async (id: string, data: ProductFormData): Promise<Product> => {
    throw new Error('Not implemented');
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    throw new Error('Not implemented');
  }
};

export default productService;
