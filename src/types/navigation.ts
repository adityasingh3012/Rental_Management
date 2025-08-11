// Navigation type definitions
export type NavigationPage = 'dashboard' | 'rental' | 'order' | 'products' | 'reporting' | 'setting' | 'rental-form';

// Navigation context type
export interface NavigationProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onCreateRental: () => void;
  onEditRental: (orderId: string) => void;
}
