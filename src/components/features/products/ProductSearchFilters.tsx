import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronUp, DollarSign, Calendar, Star, Tag } from 'lucide-react';
import { ProductCategory, ProductSearchParams } from '../../../types/product.types';
import { ID } from '../../../types/common.types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { cn } from '../../../utils/cn';

interface ProductSearchFiltersProps {
  searchParams: ProductSearchParams;
  categories: ProductCategory[];
  availableBrands: string[];
  availableFeatures: string[];
  priceRange: { min: number; max: number };
  onSearchParamsChange: (params: ProductSearchParams) => void;
  onReset: () => void;
  isOpen?: boolean;
  className?: string;
}

const FILTER_SECTIONS = [
  { key: 'category', label: 'Categories', icon: Tag },
  { key: 'price', label: 'Price Range', icon: DollarSign },
  { key: 'availability', label: 'Availability', icon: Calendar },
  { key: 'features', label: 'Features', icon: Star },
] as const;

export const ProductSearchFilters: React.FC<ProductSearchFiltersProps> = ({
  searchParams,
  categories,
  availableBrands,
  availableFeatures,
  priceRange,
  onSearchParamsChange,
  onReset,
  isOpen = true,
  className
}) => {
  const { colors } = useAppTheme();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['category', 'price']));
  const [localPriceRange, setLocalPriceRange] = useState({
    min: searchParams.filters?.priceRange?.min || priceRange.min,
    max: searchParams.filters?.priceRange?.max || priceRange.max,
  });

  const handleSearchChange = (query: string) => {
    onSearchParamsChange({
      ...searchParams,
      query: query || undefined
    });
  };

  const handleCategoryChange = (categoryId: ID, checked: boolean) => {
    const currentCategories = searchParams.filters?.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter(id => id !== categoryId);

    onSearchParamsChange({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        categories: newCategories.length > 0 ? newCategories : undefined
      }
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = searchParams.filters?.brand || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter(b => b !== brand);

    onSearchParamsChange({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        brand: newBrands.length > 0 ? newBrands : undefined
      }
    });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = searchParams.filters?.features || [];
    const newFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures.filter(f => f !== feature);

    onSearchParamsChange({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        features: newFeatures.length > 0 ? newFeatures : undefined
      }
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setLocalPriceRange({ min, max });
    onSearchParamsChange({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        priceRange: { min, max }
      }
    });
  };

  const handleAvailabilityChange = (startDate: string, endDate: string) => {
    onSearchParamsChange({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        availability: startDate && endDate ? { startDate, endDate } : undefined
      }
    });
  };

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    const filters = searchParams.filters;
    if (filters?.categories?.length) count++;
    if (filters?.brand?.length) count++;
    if (filters?.features?.length) count++;
    if (filters?.priceRange) count++;
    if (filters?.availability) count++;
    if (searchParams.query) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  if (!isOpen) return null;

  return (
    <div 
      className={cn('space-y-6', className)}
      style={{ backgroundColor: colors.background.elevated }}
    >
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5" style={{ color: colors.text.tertiary }} />
        </div>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchParams.query || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchParams.query && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5" style={{ color: colors.text.tertiary }} />
          </button>
        )}
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
          Filters
          {activeFiltersCount > 0 && (
            <span 
              className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: colors.brand.primary[100],
                color: colors.brand.primary[700]
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {/* Categories */}
        <div className="border rounded-lg" style={{ borderColor: colors.border.primary }}>
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-50"
            style={{ backgroundColor: openSections.has('category') ? colors.background.secondary : 'transparent' }}
          >
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5" style={{ color: colors.text.secondary }} />
              <span className="font-medium" style={{ color: colors.text.primary }}>Categories</span>
            </div>
            {openSections.has('category') ? 
              <ChevronUp className="h-5 w-5" style={{ color: colors.text.secondary }} /> :
              <ChevronDown className="h-5 w-5" style={{ color: colors.text.secondary }} />
            }
          </button>
          {openSections.has('category') && (
            <div className="px-4 pb-4 space-y-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchParams.filters?.categories?.includes(category.id) || false}
                    onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span style={{ color: colors.text.secondary }}>{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border rounded-lg" style={{ borderColor: colors.border.primary }}>
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-50"
            style={{ backgroundColor: openSections.has('price') ? colors.background.secondary : 'transparent' }}
          >
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5" style={{ color: colors.text.secondary }} />
              <span className="font-medium" style={{ color: colors.text.primary }}>Price Range</span>
            </div>
            {openSections.has('price') ? 
              <ChevronUp className="h-5 w-5" style={{ color: colors.text.secondary }} /> :
              <ChevronDown className="h-5 w-5" style={{ color: colors.text.secondary }} />
            }
          </button>
          {openSections.has('price') && (
            <div className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text.secondary }}>
                    Min Price
                  </label>
                  <Input
                    type="number"
                    value={localPriceRange.min}
                    onChange={(e) => setLocalPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    onBlur={() => handlePriceRangeChange(localPriceRange.min, localPriceRange.max)}
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text.secondary }}>
                    Max Price
                  </label>
                  <Input
                    type="number"
                    value={localPriceRange.max}
                    onChange={(e) => setLocalPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    onBlur={() => handlePriceRangeChange(localPriceRange.min, localPriceRange.max)}
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>
              </div>
              
              {/* Price Range Slider would go here */}
              <div className="text-sm" style={{ color: colors.text.tertiary }}>
                ${localPriceRange.min} - ${localPriceRange.max} per day
              </div>
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="border rounded-lg" style={{ borderColor: colors.border.primary }}>
          <button
            onClick={() => toggleSection('availability')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-50"
            style={{ backgroundColor: openSections.has('availability') ? colors.background.secondary : 'transparent' }}
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" style={{ color: colors.text.secondary }} />
              <span className="font-medium" style={{ color: colors.text.primary }}>Availability</span>
            </div>
            {openSections.has('availability') ? 
              <ChevronUp className="h-5 w-5" style={{ color: colors.text.secondary }} /> :
              <ChevronDown className="h-5 w-5" style={{ color: colors.text.secondary }} />
            }
          </button>
          {openSections.has('availability') && (
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text.secondary }}>
                    Start Date
                  </label>
                  <DatePicker
                    value={searchParams.filters?.availability?.startDate || ''}
                    onChange={(e) => {
                      const endDate = searchParams.filters?.availability?.endDate || '';
                      handleAvailabilityChange(e.target.value, endDate);
                    }}
                    placeholder="Select start date"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text.secondary }}>
                    End Date
                  </label>
                  <DatePicker
                    value={searchParams.filters?.availability?.endDate || ''}
                    onChange={(e) => {
                      const startDate = searchParams.filters?.availability?.startDate || '';
                      handleAvailabilityChange(startDate, e.target.value);
                    }}
                    placeholder="Select end date"
                    type="date"
                    minDate={searchParams.filters?.availability?.startDate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {availableFeatures.length > 0 && (
          <div className="border rounded-lg" style={{ borderColor: colors.border.primary }}>
            <button
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-50"
              style={{ backgroundColor: openSections.has('features') ? colors.background.secondary : 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5" style={{ color: colors.text.secondary }} />
                <span className="font-medium" style={{ color: colors.text.primary }}>Features</span>
              </div>
              {openSections.has('features') ? 
                <ChevronUp className="h-5 w-5" style={{ color: colors.text.secondary }} /> :
                <ChevronDown className="h-5 w-5" style={{ color: colors.text.secondary }} />
              }
            </button>
            {openSections.has('features') && (
              <div className="px-4 pb-4 space-y-3 max-h-48 overflow-y-auto">
                {availableFeatures.map((feature) => (
                  <label key={feature} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchParams.filters?.features?.includes(feature) || false}
                      onChange={(e) => handleFeatureChange(feature, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span style={{ color: colors.text.secondary }}>{feature}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Brands */}
        {availableBrands.length > 0 && (
          <div className="border rounded-lg" style={{ borderColor: colors.border.primary }}>
            <button
              onClick={() => toggleSection('brands')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-50"
              style={{ backgroundColor: openSections.has('brands') ? colors.background.secondary : 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5" style={{ color: colors.text.secondary }} />
                <span className="font-medium" style={{ color: colors.text.primary }}>Brands</span>
              </div>
              {openSections.has('brands') ? 
                <ChevronUp className="h-5 w-5" style={{ color: colors.text.secondary }} /> :
                <ChevronDown className="h-5 w-5" style={{ color: colors.text.secondary }} />
              }
            </button>
            {openSections.has('brands') && (
              <div className="px-4 pb-4 space-y-3 max-h-48 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchParams.filters?.brand?.includes(brand) || false}
                      onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span style={{ color: colors.text.secondary }}>{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
