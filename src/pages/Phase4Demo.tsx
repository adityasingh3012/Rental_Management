import React, { useState } from 'react';
import { 
  ProductCard, 
  ProductGrid, 
  ProductSearchFilters,
  Product, 
  ProductCategory,
  ProductSearchParams,
  ProductDisplaySettings 
} from '../components/features/products';
import { Button } from '../components/common/Button';
import { useAppTheme } from '../hooks/useAppTheme';
import { ID } from '../types/common.types';

// Mock data for demonstration
const mockCategories: ProductCategory[] = [
  { id: '1', name: 'Audio Equipment', slug: 'audio', sortOrder: 1, isActive: true },
  { id: '2', name: 'Lighting', slug: 'lighting', sortOrder: 2, isActive: true },
  { id: '3', name: 'Photography', slug: 'photography', sortOrder: 3, isActive: true },
  { id: '4', name: 'Video Equipment', slug: 'video', sortOrder: 4, isActive: true },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Wireless Microphone System',
    description: 'High-quality wireless microphone system perfect for events, presentations, and performances. Crystal clear audio transmission with reliable range.',
    shortDescription: 'Professional wireless mic system with crystal clear audio',
    category: mockCategories[0],
    brand: 'Shure',
    model: 'SLX-D24',
    images: [
      { id: '1', url: '/images/products/mic-system.jpg', alt: 'Wireless Microphone System', isPrimary: true, sortOrder: 1 }
    ],
    specifications: [
      { id: '1', name: 'Frequency Range', value: '2.4', unit: 'GHz', category: 'Technical', isImportant: true },
      { id: '2', name: 'Battery Life', value: '8', unit: 'hours', category: 'Power', isImportant: true },
      { id: '3', name: 'Range', value: '100', unit: 'meters', category: 'Technical', isImportant: true }
    ],
    rentalTerms: {
      minRentalPeriod: 24,
      maxRentalPeriod: 720,
      advanceBookingRequired: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours before rental',
      lateReturnPolicy: 'Late return fee of $50 per day applies',
      damagePolicy: 'Customer responsible for damages exceeding normal wear',
      depositRequired: true,
      depositAmount: 200,
      includesDelivery: true,
      includesPickup: true
    },
    pricing: {
      basePrice: 75,
      currency: 'USD',
      pricingTiers: [
        { id: '1', name: 'Daily', minDuration: 24, pricePerHour: 3.13, pricePerDay: 75 },
        { id: '2', name: 'Weekly', minDuration: 168, pricePerHour: 2.5, pricePerDay: 60, pricePerWeek: 420 }
      ],
      discounts: []
    },
    availability: {
      totalQuantity: 5,
      availableQuantity: 3,
      reservedQuantity: 2,
      maintenanceQuantity: 0,
      damagedQuantity: 0,
      unavailableDates: []
    },
    status: 'active',
    tags: ['professional', 'wireless', 'events'],
    features: ['Digital transmission', 'Long battery life', 'Professional grade', 'Easy setup'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin'
  },
  {
    id: '2',
    name: 'LED Panel Light Kit',
    description: 'Professional LED lighting kit with adjustable color temperature and brightness. Perfect for photography, videography, and live streaming.',
    shortDescription: 'Professional LED lighting kit with adjustable settings',
    category: mockCategories[1],
    brand: 'Godox',
    model: 'LED-500C',
    images: [
      { id: '2', url: '/images/products/led-panel.jpg', alt: 'LED Panel Light', isPrimary: true, sortOrder: 1 }
    ],
    specifications: [
      { id: '4', name: 'Power', value: '50', unit: 'watts', category: 'Technical', isImportant: true },
      { id: '5', name: 'Color Temperature', value: '3200-5600', unit: 'K', category: 'Light', isImportant: true },
      { id: '6', name: 'CRI', value: '95', unit: '+', category: 'Light', isImportant: true }
    ],
    rentalTerms: {
      minRentalPeriod: 24,
      maxRentalPeriod: 720,
      advanceBookingRequired: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours before rental',
      lateReturnPolicy: 'Late return fee of $35 per day applies',
      damagePolicy: 'Customer responsible for damages exceeding normal wear',
      depositRequired: true,
      depositAmount: 150,
      includesDelivery: true,
      includesPickup: true
    },
    pricing: {
      basePrice: 45,
      currency: 'USD',
      pricingTiers: [
        { id: '3', name: 'Daily', minDuration: 24, pricePerHour: 1.88, pricePerDay: 45 },
        { id: '4', name: 'Weekly', minDuration: 168, pricePerHour: 1.5, pricePerDay: 36, pricePerWeek: 252 }
      ],
      discounts: []
    },
    availability: {
      totalQuantity: 8,
      availableQuantity: 6,
      reservedQuantity: 2,
      maintenanceQuantity: 0,
      damagedQuantity: 0,
      unavailableDates: []
    },
    status: 'active',
    tags: ['lighting', 'led', 'photography'],
    features: ['Adjustable color temperature', 'High CRI rating', 'Dimmer control', 'Battery powered'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin'
  }
];

export const Phase4Demo: React.FC = () => {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState<'cards' | 'grid' | 'filters'>('cards');
  
  // State for demo
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 12
  });

  const [displaySettings, setDisplaySettings] = useState<ProductDisplaySettings>({
    view: 'grid',
    itemsPerPage: 12,
    showFilters: true
  });

  const [wishlistItems, setWishlistItems] = useState<ID[]>([]);

  const handleAddToWishlist = (productId: ID) => {
    setWishlistItems(prev => [...prev, productId]);
  };

  const handleRemoveFromWishlist = (productId: ID) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
  };

  const mockAvailableBrands = ['Shure', 'Godox', 'Canon', 'Sony'];
  const mockAvailableFeatures = ['Digital transmission', 'Long battery life', 'Professional grade', 'Easy setup', 'Adjustable color temperature'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.primary }}>
      {/* Header */}
      <div 
        className="border-b"
        style={{ 
          backgroundColor: colors.background.elevated,
          borderColor: colors.border.primary 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: colors.text.primary }}
            >
              Phase 4: Product Management System
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: colors.text.secondary }}
            >
              Complete product catalog with advanced search, filtering, and interactive components
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <div className="flex space-x-1 rounded-lg border" style={{ borderColor: colors.border.primary }}>
            {[
              { key: 'cards', label: 'Product Cards' },
              { key: 'grid', label: 'Product Grid' },
              { key: 'filters', label: 'Search & Filters' }
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.key as any)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'cards' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
                Product Card Variants
              </h2>
              <p style={{ color: colors.text.secondary }}>
                Modern, interactive product cards with wishlist, quick actions, and detailed information display
              </p>
            </div>

            {/* Default Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
                Default Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlistItems.includes(product.id)}
                    onAddToWishlist={handleAddToWishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={(id) => console.log('Add to cart:', id)}
                    onQuickView={(id) => console.log('Quick view:', id)}
                  />
                ))}
              </div>
            </div>

            {/* Compact Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
                Compact Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={`compact-${product.id}`}
                    product={product}
                    variant="compact"
                    isInWishlist={wishlistItems.includes(product.id)}
                    onAddToWishlist={handleAddToWishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={(id) => console.log('Add to cart:', id)}
                    onQuickView={(id) => console.log('Quick view:', id)}
                  />
                ))}
              </div>
            </div>

            {/* Featured Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
                Featured Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={`featured-${product.id}`}
                    product={product}
                    variant="featured"
                    isInWishlist={wishlistItems.includes(product.id)}
                    onAddToWishlist={handleAddToWishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={(id) => console.log('Add to cart:', id)}
                    onQuickView={(id) => console.log('Quick view:', id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grid' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
                Product Grid System
              </h2>
              <p style={{ color: colors.text.secondary }}>
                Responsive grid with view toggles, sorting, pagination, and interactive features
              </p>
            </div>

            <ProductGrid
              products={mockProducts}
              totalCount={mockProducts.length}
              searchParams={searchParams}
              displaySettings={displaySettings}
              onSearchParamsChange={setSearchParams}
              onDisplaySettingsChange={setDisplaySettings}
              onProductClick={(id) => console.log('Product clicked:', id)}
              onAddToCart={(id) => console.log('Add to cart:', id)}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onQuickView={(id) => console.log('Quick view:', id)}
              wishlistItems={wishlistItems}
            />
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
                Advanced Search & Filters
              </h2>
              <p style={{ color: colors.text.secondary }}>
                Comprehensive filtering system with categories, price range, availability, and features
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div 
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: colors.background.elevated,
                    borderColor: colors.border.primary
                  }}
                >
                  <ProductSearchFilters
                    searchParams={searchParams}
                    categories={mockCategories}
                    availableBrands={mockAvailableBrands}
                    availableFeatures={mockAvailableFeatures}
                    priceRange={{ min: 0, max: 500 }}
                    onSearchParamsChange={setSearchParams}
                    onReset={() => setSearchParams({ sortBy: 'name', sortOrder: 'asc', page: 1, limit: 12 })}
                    isOpen={true}
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div 
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: colors.background.elevated,
                    borderColor: colors.border.primary
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
                    Current Search Parameters
                  </h3>
                  <pre 
                    className="text-sm overflow-auto"
                    style={{ color: colors.text.secondary }}
                  >
                    {JSON.stringify(searchParams, null, 2)}
                  </pre>
                </div>

                <div 
                  className="mt-6 p-6 rounded-xl border"
                  style={{
                    backgroundColor: colors.background.elevated,
                    borderColor: colors.border.primary
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
                    Key Features
                  </h3>
                  <ul className="space-y-2" style={{ color: colors.text.secondary }}>
                    <li>• Real-time search with debouncing</li>
                    <li>• Multi-category selection</li>
                    <li>• Price range slider with input fields</li>
                    <li>• Date-based availability filtering</li>
                    <li>• Feature and brand multi-select</li>
                    <li>• Collapsible filter sections</li>
                    <li>• Filter state persistence in URL</li>
                    <li>• Active filter indicators</li>
                    <li>• One-click filter reset</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Summary */}
      <div 
        className="border-t"
        style={{ 
          backgroundColor: colors.background.elevated,
          borderColor: colors.border.primary 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
              Phase 4 Implementation Complete ✅
            </h2>
            <p style={{ color: colors.text.secondary }}>
              All product management components are now ready for backend integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: colors.background.primary,
                borderColor: colors.border.primary
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                Product Display Components
              </h3>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• ProductCard with variants</li>
                <li>• ProductGrid with view modes</li>
                <li>• Image galleries with zoom</li>
                <li>• Interactive hover effects</li>
                <li>• Wishlist functionality</li>
                <li>• Availability indicators</li>
              </ul>
            </div>

            <div 
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: colors.background.primary,
                borderColor: colors.border.primary
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                Search & Filter System
              </h3>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Advanced search capabilities</li>
                <li>• Category-based filtering</li>
                <li>• Price range controls</li>
                <li>• Availability date filtering</li>
                <li>• Feature multi-select</li>
                <li>• URL state persistence</li>
              </ul>
            </div>

            <div 
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: colors.background.primary,
                borderColor: colors.border.primary
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                Backend Integration Ready
              </h3>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Complete API service layer</li>
                <li>• Comprehensive endpoints</li>
                <li>• Type-safe interfaces</li>
                <li>• Error handling</li>
                <li>• Loading states</li>
                <li>• Analytics tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
