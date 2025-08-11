import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Share2, 
  Heart, 
  ShoppingCart, 
  Calendar, 
  Clock, 
  MapPin, 
  Shield, 
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Zap
} from 'lucide-react';
import { Product, ProductRating } from '../../../types/product.types';
import { ID } from '../../../types/common.types';
import { Button } from '../../common/Button';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { cn } from '../../../utils/cn';

interface ProductDetailsProps {
  product: Product;
  isInWishlist?: boolean;
  relatedProducts?: Product[];
  reviews?: ProductRating[];
  averageRating?: number;
  totalReviews?: number;
  onAddToCart?: (productId: ID) => void;
  onAddToWishlist?: (productId: ID) => void;
  onRemoveFromWishlist?: (productId: ID) => void;
  onShare?: (productId: ID) => void;
  onRequestQuote?: (productId: ID) => void;
  onCheckAvailability?: (productId: ID, startDate: string, endDate: string) => void;
  className?: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isInWishlist = false,
  relatedProducts = [],
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onShare,
  onRequestQuote,
  onCheckAvailability,
  className
}) => {
  const { colors } = useAppTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState({ start: '', end: '' });
  const [quantity, setQuantity] = useState(1);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const images = product.images || [];
  const isAvailable = (product.availability?.availableQuantity || 0) > 0;
  const basePrice = product.pricing?.basePrice || 0;

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      onRemoveFromWishlist?.(product.id);
    } else {
      onAddToWishlist?.(product.id);
    }
  };

  const handleCheckAvailability = () => {
    if (selectedDate.start && selectedDate.end) {
      onCheckAvailability?.(product.id, selectedDate.start, selectedDate.end);
    }
  };

  return (
    <div className={cn('max-w-7xl mx-auto', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src={images[currentImageIndex]?.url || '/images/placeholder-product.jpg'}
              alt={images[currentImageIndex]?.alt || product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </Button>
              </>
            )}

            {/* Zoom Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Availability Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                  isAvailable 
                    ? 'text-green-700 bg-green-50'
                    : 'text-red-700 bg-red-50'
                )}
              >
                {isAvailable ? `${product.availability.availableQuantity} Available` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                    index === currentImageIndex 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-transparent hover:border-gray-300'
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span 
                className="text-sm font-medium uppercase tracking-wide"
                style={{ color: colors.brand.primary[600] }}
              >
                {product.category?.name}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShare?.(product.id)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistClick}
                  className={isInWishlist ? 'text-red-500' : ''}
                >
                  <Heart className={cn('h-4 w-4', isInWishlist && 'fill-current')} />
                </Button>
              </div>
            </div>
            
            <h1 
              className="text-3xl font-bold mb-4"
              style={{ color: colors.text.primary }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < Math.floor(averageRating) 
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
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>

            {/* Brand */}
            {product.brand && (
              <p className="text-lg mb-4" style={{ color: colors.text.secondary }}>
                by <span className="font-semibold">{product.brand}</span>
                {product.model && <span> - {product.model}</span>}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              {product.description}
            </p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: colors.text.primary }}
              >
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span 
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          <div 
            className="p-6 rounded-xl border"
            style={{ 
              backgroundColor: colors.background.accent,
              borderColor: colors.border.primary 
            }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-3xl font-bold"
                    style={{ color: colors.brand.primary[600] }}
                  >
                    ${basePrice}
                  </span>
                  <span 
                    className="text-lg"
                    style={{ color: colors.text.secondary }}
                  >
                    /day
                  </span>
                </div>
                {product.pricing?.pricingTiers && product.pricing.pricingTiers.length > 1 && (
                  <p 
                    className="text-sm mt-1"
                    style={{ color: colors.text.tertiary }}
                  >
                    Better rates for longer rentals
                  </p>
                )}
              </div>
              
              {product.rentalTerms?.depositRequired && (
                <div className="text-right">
                  <p 
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    Deposit Required
                  </p>
                  <p 
                    className="font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    ${product.rentalTerms.depositAmount || 'TBD'}
                  </p>
                </div>
              )}
            </div>

            {/* Rental Terms */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: colors.text.tertiary }} />
                <span style={{ color: colors.text.secondary }}>
                  Min. {Math.ceil((product.rentalTerms?.minRentalPeriod || 24) / 24)} days
                </span>
              </div>
              {product.rentalTerms?.includesDelivery && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: colors.text.tertiary }} />
                  <span style={{ color: colors.text.secondary }}>Free Delivery</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: colors.text.tertiary }} />
                <span style={{ color: colors.text.secondary }}>Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" style={{ color: colors.text.tertiary }} />
                <span style={{ color: colors.text.secondary }}>Quick Setup</span>
              </div>
            </div>

            {/* Availability Check */}
            <div className="space-y-3 mb-4">
              <h4 
                className="font-medium"
                style={{ color: colors.text.primary }}
              >
                Check Availability
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: colors.text.secondary }}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate.start}
                    onChange={(e) => setSelectedDate(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: colors.background.elevated,
                      borderColor: colors.border.primary,
                      color: colors.text.primary
                    }}
                  />
                </div>
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: colors.text.secondary }}
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate.end}
                    onChange={(e) => setSelectedDate(prev => ({ ...prev, end: e.target.value }))}
                    min={selectedDate.start}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: colors.background.elevated,
                      borderColor: colors.border.primary,
                      color: colors.text.primary
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: colors.text.secondary }}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.availability?.availableQuantity || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: colors.background.elevated,
                      borderColor: colors.border.primary,
                      color: colors.text.primary
                    }}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCheckAvailability}
                    disabled={!selectedDate.start || !selectedDate.end}
                    className="w-full"
                  >
                    Check
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onAddToCart?.(product.id)}
                disabled={!isAvailable}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAvailable ? 'Add to Cart' : 'Unavailable'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onRequestQuote?.(product.id)}
                className="flex-1"
              >
                Get Quote
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm space-y-2" style={{ color: colors.text.tertiary }}>
            <p>• Free cancellation up to 24 hours before rental</p>
            <p>• Professional setup and breakdown included</p>
            <p>• 24/7 customer support during rental period</p>
          </div>
        </div>
      </div>
    </div>
  );
};
