import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Product, ProductSearchParams, ProductDisplaySettings } from '../../../types/product.types';
import { ID } from '../../../types/common.types';
import { ProductCard } from './ProductCard';
import { Button } from '../../common/Button';
import { LoadingSkeleton } from '../../common/Loading';
import EmptyState from '../../common/EmptyState';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { cn } from '../../../utils/cn';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  totalCount?: number;
  searchParams?: ProductSearchParams;
  displaySettings?: ProductDisplaySettings;
  onSearchParamsChange?: (params: ProductSearchParams) => void;
  onDisplaySettingsChange?: (settings: ProductDisplaySettings) => void;
  onProductClick?: (productId: ID) => void;
  onAddToCart?: (productId: ID) => void;
  onAddToWishlist?: (productId: ID) => void;
  onRemoveFromWishlist?: (productId: ID) => void;
  onQuickView?: (productId: ID) => void;
  wishlistItems?: ID[];
  className?: string;
}

const SORT_OPTIONS = [
  { value: 'name', label: 'Name', order: 'asc' },
  { value: 'price', label: 'Price: Low to High', order: 'asc' },
  { value: 'price', label: 'Price: High to Low', order: 'desc' },
  { value: 'rating', label: 'Rating', order: 'desc' },
  { value: 'availability', label: 'Availability', order: 'desc' },
  { value: 'newest', label: 'Newest First', order: 'desc' },
] as const;

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  totalCount = 0,
  searchParams = {},
  displaySettings = { view: 'grid', itemsPerPage: 12, showFilters: true },
  onSearchParamsChange,
  onDisplaySettingsChange,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onQuickView,
  wishlistItems = [],
  className
}) => {
  const { colors } = useAppTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    onSearchParamsChange?.({
      ...searchParams,
      sortBy: sortBy as any,
      sortOrder
    });
  };

  const handleViewChange = (view: 'grid' | 'list') => {
    onDisplaySettingsChange?.({
      ...displaySettings,
      view
    });
  };

  const handleItemsPerPageChange = (itemsPerPage: 12 | 24 | 48) => {
    onDisplaySettingsChange?.({
      ...displaySettings,
      itemsPerPage
    });
  };

  const gridCols = {
    grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    list: 'grid-cols-1'
  };

  const cardVariant = displaySettings.view === 'list' ? 'compact' : 'default';

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Toolbar Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="h-10 w-32 rounded-lg animate-pulse"
              style={{ backgroundColor: colors.background.secondary }}
            />
            <div 
              className="h-10 w-24 rounded-lg animate-pulse"
              style={{ backgroundColor: colors.background.secondary }}
            />
          </div>
          <div 
            className="h-10 w-40 rounded-lg animate-pulse"
            style={{ backgroundColor: colors.background.secondary }}
          />
        </div>

        {/* Product Grid Skeleton */}
        <div className={cn('grid gap-6', gridCols[displaySettings.view])}>
          {Array.from({ length: displaySettings.itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl animate-pulse"
              style={{ backgroundColor: colors.background.secondary }}
            >
              <div className="aspect-[4/3] rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 rounded" />
                <div className="h-6 rounded" />
                <div className="h-4 w-2/3 rounded" />
                <div className="h-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <EmptyState
        icon={Filter}
        title="No products found"
        description="Try adjusting your search criteria or filters to find what you're looking for."
        action={{
          label: "Clear All Filters",
          onClick: () => onSearchParamsChange?.({}),
          variant: "primary"
        }}
      />
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side - Results Info & View Toggle */}
        <div className="flex items-center gap-4">
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Showing {products.length} of {totalCount} products
          </div>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border" style={{ borderColor: colors.border.primary }}>
            <Button
              variant={displaySettings.view === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleViewChange('grid')}
              className="rounded-r-none border-r-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={displaySettings.view === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleViewChange('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Items Per Page */}
          <select
            value={displaySettings.itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value as any)}
            className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colors.background.elevated,
              borderColor: colors.border.primary,
              color: colors.text.primary
            }}
          >
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
            <option value={48}>48 per page</option>
          </select>
        </div>

        {/* Right Side - Sort & Filter */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <select
            value={`${searchParams.sortBy}-${searchParams.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              handleSortChange(sortBy, sortOrder as 'asc' | 'desc');
            }}
            className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 min-w-[160px]"
            style={{
              backgroundColor: colors.background.elevated,
              borderColor: colors.border.primary,
              color: colors.text.primary
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={`${option.value}-${option.order}`} value={`${option.value}-${option.order}`}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Toggle */}
          <Button
            variant={displaySettings.showFilters ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              const newSettings = { ...displaySettings, showFilters: !displaySettings.showFilters };
              onDisplaySettingsChange?.(newSettings);
              setIsFilterOpen(!displaySettings.showFilters);
            }}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={cn('grid gap-6', gridCols[displaySettings.view])}>
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => onProductClick?.(product.id)}
          >
            <ProductCard
              product={product}
              variant={cardVariant}
              isInWishlist={wishlistItems.includes(product.id)}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              onRemoveFromWishlist={onRemoveFromWishlist}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>

      {/* Load More / Pagination would go here */}
      {products.length < totalCount && (
        <div className="flex justify-center pt-8">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
};
