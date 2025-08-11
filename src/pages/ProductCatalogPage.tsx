import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sliders, X } from 'lucide-react';
import { 
  ProductGrid, 
  ProductSearchFilters,
  ProductSearchParams,
  ProductDisplaySettings,
  Product,
  ProductCategory 
} from '../components/features/products';
import { ID } from '../types/common.types';
import { Button } from '../components/common/Button';
import { productService } from '../services';
import { useAppTheme } from '../hooks/useAppTheme';
import { cn } from '../utils/cn';

export const ProductCatalogPage: React.FC = () => {
  const { colors } = useAppTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [totalCount, setTotalCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<ID[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Search and display settings
  const [productSearchParams, setProductSearchParams] = useState<ProductSearchParams>({
    query: searchParams.get('q') || undefined,
    sortBy: (searchParams.get('sortBy') as any) || 'name',
    sortOrder: (searchParams.get('sortOrder') as any) || 'asc',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 12,
    filters: {
      categories: searchParams.get('categories')?.split(',').map(Number).filter(Boolean) || undefined,
      priceRange: searchParams.get('priceMin') && searchParams.get('priceMax') ? {
        min: Number(searchParams.get('priceMin')),
        max: Number(searchParams.get('priceMax'))
      } : undefined,
      brand: searchParams.get('brands')?.split(',').filter(Boolean) || undefined,
      features: searchParams.get('features')?.split(',').filter(Boolean) || undefined,
    }
  });

  const [displaySettings, setDisplaySettings] = useState<ProductDisplaySettings>({
    view: (searchParams.get('view') as 'grid' | 'list') || 'grid',
    itemsPerPage: (Number(searchParams.get('itemsPerPage')) as 12 | 24 | 48) || 12,
    showFilters: searchParams.get('showFilters') !== 'false'
  });

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadWishlist();
  }, []);

  // Load products when search params change
  useEffect(() => {
    loadProducts();
    updateUrlParams();
  }, [productSearchParams, displaySettings]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({
        ...productSearchParams,
        limit: displaySettings.itemsPerPage
      });
      
      setProducts(response.products);
      setTotalCount(response.totalCount);
      
      // Update available filters from response
      if (response.filters) {
        setAvailableBrands(response.filters.brands || []);
        setAvailableFeatures(response.filters.features || []);
        setPriceRange(response.filters.priceRange || { min: 0, max: 1000 });
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await productService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadWishlist = async () => {
    try {
      const wishlistData = await productService.getWishlist();
      setWishlistItems(wishlistData.map(item => item.productId));
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    }
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (productSearchParams.query) params.set('q', productSearchParams.query);
    if (productSearchParams.sortBy) params.set('sortBy', productSearchParams.sortBy);
    if (productSearchParams.sortOrder) params.set('sortOrder', productSearchParams.sortOrder);
    if (productSearchParams.page && productSearchParams.page > 1) {
      params.set('page', productSearchParams.page.toString());
    }
    if (displaySettings.itemsPerPage !== 12) {
      params.set('itemsPerPage', displaySettings.itemsPerPage.toString());
    }
    if (displaySettings.view !== 'grid') params.set('view', displaySettings.view);
    if (!displaySettings.showFilters) params.set('showFilters', 'false');
    
    const filters = productSearchParams.filters;
    if (filters?.categories?.length) {
      params.set('categories', filters.categories.join(','));
    }
    if (filters?.priceRange) {
      params.set('priceMin', filters.priceRange.min.toString());
      params.set('priceMax', filters.priceRange.max.toString());
    }
    if (filters?.brand?.length) {
      params.set('brands', filters.brand.join(','));
    }
    if (filters?.features?.length) {
      params.set('features', filters.features.join(','));
    }
    
    setSearchParams(params);
  };

  const handleSearchParamsChange = (newParams: ProductSearchParams) => {
    setProductSearchParams({ ...newParams, page: 1 }); // Reset to first page on search
  };

  const handleDisplaySettingsChange = (newSettings: ProductDisplaySettings) => {
    setDisplaySettings(newSettings);
  };

  const handleProductClick = (productId: ID) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (productId: ID) => {
    // Track product view for analytics
    try {
      await productService.trackProductView(productId);
      // Add to cart logic would go here
      console.log('Add to cart:', productId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleAddToWishlist = async (productId: ID) => {
    try {
      await productService.addToWishlist(productId);
      setWishlistItems(prev => [...prev, productId]);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: ID) => {
    try {
      await productService.removeFromWishlist(productId);
      setWishlistItems(prev => prev.filter(id => id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleQuickView = (productId: ID) => {
    // Quick view modal logic would go here
    console.log('Quick view:', productId);
  };

  const handleResetFilters = () => {
    setProductSearchParams({
      sortBy: 'name',
      sortOrder: 'asc',
      page: 1,
      limit: displaySettings.itemsPerPage
    });
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold"
                style={{ color: colors.text.primary }}
              >
                Product Catalog
              </h1>
              <p 
                className="mt-2 text-lg"
                style={{ color: colors.text.secondary }}
              >
                Browse our extensive collection of rental equipment
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant={displaySettings.showFilters ? 'primary' : 'outline'}
                onClick={() => {
                  const newSettings = { ...displaySettings, showFilters: !displaySettings.showFilters };
                  setDisplaySettings(newSettings);
                  setIsFilterOpen(!displaySettings.showFilters);
                }}
              >
                <Sliders className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            'lg:col-span-1',
            displaySettings.showFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="sticky top-6">
              <div 
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: colors.background.elevated,
                  borderColor: colors.border.primary
                }}
              >
                <ProductSearchFilters
                  searchParams={productSearchParams}
                  categories={categories}
                  availableBrands={availableBrands}
                  availableFeatures={availableFeatures}
                  priceRange={priceRange}
                  onSearchParamsChange={handleSearchParamsChange}
                  onReset={handleResetFilters}
                  isOpen={displaySettings.showFilters}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={cn(
            displaySettings.showFilters ? 'lg:col-span-3' : 'lg:col-span-4'
          )}>
            <ProductGrid
              products={products}
              loading={loading}
              totalCount={totalCount}
              searchParams={productSearchParams}
              displaySettings={displaySettings}
              onSearchParamsChange={handleSearchParamsChange}
              onDisplaySettingsChange={handleDisplaySettingsChange}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onQuickView={handleQuickView}
              wishlistItems={wishlistItems}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          />
          <div 
            className="absolute right-0 top-0 h-full w-80 max-w-full overflow-y-auto"
            style={{ backgroundColor: colors.background.elevated }}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: colors.border.primary }}>
              <h2 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Filters
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <ProductSearchFilters
                searchParams={productSearchParams}
                categories={categories}
                availableBrands={availableBrands}
                availableFeatures={availableFeatures}
                priceRange={priceRange}
                onSearchParamsChange={handleSearchParamsChange}
                onReset={handleResetFilters}
                isOpen={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
