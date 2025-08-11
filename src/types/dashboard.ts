export interface DashboardStats {
  quotations: number;
  rentals: number;
  revenue: number;
}

export interface ProductCategory {
  category: string;
  ordered: number;
  revenue: number;
}

export interface TopProduct {
  product: string;
  ordered: number;
  revenue: number;
}

export interface TopCustomer {
  customer: string;
  ordered: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  topProductCategories: ProductCategory[];
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
}

export type TimePeriod = '7days' | '30days' | '90days' | '1year';