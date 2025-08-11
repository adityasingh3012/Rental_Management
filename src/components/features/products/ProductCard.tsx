import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, Calendar, MapPin } from 'lucide-react';
import { Product } from '../../../types/product.types';
import { ID } from '../../../types/common.types';
import { Button } from '../../common/Button';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { cn } from '../../../utils/cn';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: ID) => void;
  onAddToWishlist?: (productId: ID) => void;
  onRemoveFromWishlist?: (productId: ID) => void;
  onQuickView?: (productId: ID) => void;
  isInWishlist?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onQuickView,
  isInWishlist = false,
  className,
  variant = 'default'
}) => {
  const { colors } = useAppTheme();
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const basePrice = product.pricing?.basePrice || 0;
  const isAvailable = (product.availability?.availableQuantity || 0) > 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      onRemoveFromWishlist?.(product.id);
    } else {
      onAddToWishlist?.(product.id);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const cardVariants = {
    default: 'h-auto',
    compact: 'h-80',
    featured: 'h-96'
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all duration-300 ease-out',
        'hover:shadow-xl hover:-translate-y-1',
        cardVariants[variant],
        className
      )}
      style={{
        backgroundColor: colors.background.elevated,
        borderColor: colors.border.primary,
        border: '1px solid'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Product Image */}
        <img
          src={primaryImage?.url || '/images/placeholder-product.jpg'}
          alt={primaryImage?.alt || product.name}
          className={cn(
            'h-full w-full object-cover transition-all duration-500',
            'group-hover:scale-105',
            imageLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setImageLoading(false)}
        />

        {/* Image Loading Skeleton */}
        {imageLoading && (
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: colors.background.secondary }}
          />
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
              isAvailable 
                ? 'text-green-700 bg-green-50'
                : 'text-red-700 bg-red-50'
            )}
          >
            {isAvailable ? `${product.availability.availableQuantity} Available` : 'Out of Stock'}
          </span>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
            'opacity-0 group-hover:opacity-100',
            isInWishlist 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-white hover:text-red-500'
          )}
          style={{
            backgroundColor: isHovered ? colors.background.elevated : 'rgba(0,0,0,0.5)'
          }}
          onClick={handleWishlistClick}
        >
          <Heart 
            className={cn('h-4 w-4', isInWishlist && 'fill-current')} 
          />
        </Button>

        {/* Quick Actions Overlay */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 p-4 transition-all duration-300',
            'translate-y-full group-hover:translate-y-0'
          )}
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))'
          }}
        >
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={handleQuickView}
            >
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!isAvailable}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isAvailable ? 'Add to Cart' : 'Unavailable'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span 
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: colors.text.secondary }}
          >
            {product.category?.name}
          </span>
          {product.brand && (
            <span 
              className="text-xs"
              style={{ color: colors.text.tertiary }}
            >
              {product.brand}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="font-semibold line-clamp-2 leading-tight"
          style={{ color: colors.text.primary }}
        >
          {product.name}
        </h3>

        {/* Description */}
        {variant !== 'compact' && (
          <p 
            className="text-sm line-clamp-2"
            style={{ color: colors.text.secondary }}
          >
            {product.shortDescription || product.description}
          </p>
        )}

        {/* Features */}
        {variant === 'featured' && product.features?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                style={{
                  backgroundColor: colors.background.accent,
                  color: colors.text.secondary
                }}
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span
                className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                style={{
                  backgroundColor: colors.background.accent,
                  color: colors.text.secondary
                }}
              >
                +{product.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(4.5) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span 
            className="text-sm font-medium"
            style={{ color: colors.text.secondary }}
          >
            4.5
          </span>
          <span 
            className="text-sm"
            style={{ color: colors.text.tertiary }}
          >
            (24 reviews)
          </span>
        </div>

        {/* Rental Info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" style={{ color: colors.text.tertiary }} />
            <span style={{ color: colors.text.secondary }}>
              Min. {Math.ceil((product.rentalTerms?.minRentalPeriod || 24) / 24)}d
            </span>
          </div>
          {product.rentalTerms?.includesDelivery && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" style={{ color: colors.text.tertiary }} />
              <span style={{ color: colors.text.secondary }}>Delivery</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span 
                className="text-2xl font-bold"
                style={{ color: colors.brand.primary[600] }}
              >
                ${basePrice}
              </span>
              <span 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                /day
              </span>
            </div>
            {product.pricing?.pricingTiers && product.pricing.pricingTiers.length > 1 && (
              <span 
                className="text-xs"
                style={{ color: colors.text.tertiary }}
              >
                Starting price
              </span>
            )}
          </div>

          {/* Deposit Badge */}
          {product.rentalTerms?.depositRequired && (
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
              style={{
                backgroundColor: colors.background.accent,
                color: colors.text.secondary
              }}
            >
              Deposit Required
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
