import { ID, Status } from './common.types';

export interface Product {
  id: ID;
  name: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  brand?: string;
  model?: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  rentalTerms: RentalTerms;
  pricing: ProductPricing;
  availability: ProductAvailability;
  status: Status;
  tags: string[];
  features: string[];
  accessories?: Accessory[];
  insurance?: InsuranceOption[];
  createdAt: string;
  updatedAt: string;
  createdBy: ID;
}

export interface ProductCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  parentId?: ID;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ProductImage {
  id: ID;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  id: ID;
  name: string;
  value: string;
  unit?: string;
  category: string;
  isImportant: boolean;
}

export interface RentalTerms {
  minRentalPeriod: number; // in hours
  maxRentalPeriod: number; // in hours
  unit?: string; // 'hour' | 'day' | 'week' | 'month'
  advanceBookingRequired: number; // in hours
  cancellationPolicy: string;
  lateReturnPolicy: string;
  damagePolicy: string;
  depositRequired: boolean;
  depositAmount?: number;
  includesDelivery: boolean;
  includesPickup: boolean;
}

export interface ProductPricing {
  basePrice: number;
  currency: string;
  pricingTiers: PricingTier[];
  discounts: Discount[];
  seasonalPricing?: SeasonalPricing[];
}

export interface PricingTier {
  id: ID;
  name: string;
  minDuration: number; // in hours
  maxDuration?: number; // in hours
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
}

export interface Discount {
  id: ID;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  minDuration?: number;
  minQuantity?: number;
  validFrom?: string;
  validTo?: string;
  isActive: boolean;
}

export interface SeasonalPricing {
  id: ID;
  name: string;
  startDate: string;
  endDate: string;
  multiplier: number; // 1.2 = 20% increase, 0.8 = 20% decrease
  isActive: boolean;
}

export interface ProductAvailability {
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  maintenanceQuantity: number;
  damagedQuantity: number;
  nextAvailableDate?: string;
  unavailableDates: string[];
}

export interface Accessory {
  id: ID;
  name: string;
  description: string;
  price: number;
  isRequired: boolean;
  isAvailable: boolean;
  image?: string;
}

export interface InsuranceOption {
  id: ID;
  name: string;
  description: string;
  coverage: string;
  price: number;
  priceType: 'percentage' | 'fixed' | 'daily';
  isRecommended: boolean;
}

export interface ProductFilter {
  categories?: ID[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: {
    startDate: string;
    endDate: string;
  };
  features?: string[];
  rating?: number;
  brand?: string[];
}

export interface ProductSearchParams {
  query?: string;
  filters?: ProductFilter;
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Enhanced types for Phase 4 implementation
export interface ProductSearchResponse {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: {
    categories: ProductCategory[];
    priceRange: { min: number; max: number };
    brands: string[];
    features: string[];
  };
}

export interface ProductDisplaySettings {
  view: 'grid' | 'list';
  itemsPerPage: 12 | 24 | 48;
  showFilters: boolean;
}

export interface ProductWishlistItem {
  id: ID;
  productId: ID;
  userId: ID;
  product?: Product;
  addedAt: string;
}

export interface ProductRating {
  id: ID;
  productId: ID;
  userId: ID;
  userName: string;
  rating: number;
  review?: string;
  createdAt: string;
  isVerifiedRental: boolean;
}

export interface ProductAnalytics {
  productId: ID;
  views: number;
  rentals: number;
  revenue: number;
  avgRating: number;
  reviewCount: number;
  conversionRate: number;
  popularityScore: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  brand: string;
  model: string;
  images: File[];
  specifications: Omit<ProductSpecification, 'id'>[];
  rentalTerms: RentalTerms;
  pricing: ProductPricing;
  availability: ProductAvailability;
  status: 'active' | 'inactive' | 'maintenance';
  tags: string[];
  features: string[];
  accessories?: Omit<Accessory, 'id'>[];
}
