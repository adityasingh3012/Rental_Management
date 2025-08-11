import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MessageSquare, Calendar, ShoppingCart } from 'lucide-react';
import { ProductDetails, Product, ProductRating } from '../components/features/products';
import { ID } from '../types/common.types';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/Loading';
import { productService } from '../services';
import { useAppTheme } from '../hooks/useAppTheme';

export const ProductDetailsPage: React.FC = () => {
  const { colors } = useAppTheme();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  // State
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ProductRating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      loadProductData(productId);
    }
  }, [productId]);

  const loadProductData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Load product details and related data in parallel
      const [
        productData,
        relatedData,
        reviewsData,
        wishlistData
      ] = await Promise.allSettled([
        productService.getProduct(id),
        productService.getRelatedProducts(id),
        productService.getProductReviews(id),
        productService.getWishlist()
      ]);

      // Handle product data
      if (productData.status === 'fulfilled') {
        setProduct(productData.value);
        // Track product view
        await productService.trackProductView(id);
      } else {
        throw new Error('Product not found');
      }

      // Handle related products
      if (relatedData.status === 'fulfilled') {
        setRelatedProducts(relatedData.value);
      }

      // Handle reviews
      if (reviewsData.status === 'fulfilled') {
        setReviews(reviewsData.value.reviews);
        setAverageRating(reviewsData.value.averageRating);
        setTotalReviews(reviewsData.value.totalCount);
      }

      // Handle wishlist
      if (wishlistData.status === 'fulfilled') {
        setIsInWishlist(wishlistData.value.some(item => item.productId === id));
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: ID) => {
    try {
      // Add to cart logic would go here
      console.log('Add to cart:', productId);
      // Show success message
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleAddToWishlist = async (productId: ID) => {
    try {
      await productService.addToWishlist(productId);
      setIsInWishlist(true);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: ID) => {
    try {
      await productService.removeFromWishlist(productId);
      setIsInWishlist(false);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleShare = async (productId: ID) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          text: product?.shortDescription || product?.description,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // Show copied message
        console.log('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const handleRequestQuote = (productId: ID) => {
    navigate(`/quote/request?product=${productId}`);
  };

  const handleCheckAvailability = async (productId: ID, startDate: string, endDate: string) => {
    try {
      const availability = await productService.checkAvailability(productId, startDate, endDate);
      console.log('Availability:', availability);
      // Show availability results in UI
    } catch (error) {
      console.error('Failed to check availability:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background.primary }}>
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg" style={{ color: colors.text.secondary }}>
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background.primary }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
            Product Not Found
          </h1>
          <p className="text-lg mb-6" style={{ color: colors.text.secondary }}>
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Browse All Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.primary }}>
      {/* Navigation */}
      <div 
        className="border-b"
        style={{ 
          backgroundColor: colors.background.elevated,
          borderColor: colors.border.primary 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/products')}
                className="hover:underline"
                style={{ color: colors.text.secondary }}
              >
                Products
              </button>
              <span style={{ color: colors.text.tertiary }}>/</span>
              <button
                onClick={() => navigate(`/products?category=${product.category.id}`)}
                className="hover:underline"
                style={{ color: colors.text.secondary }}
              >
                {product.category.name}
              </button>
              <span style={{ color: colors.text.tertiary }}>/</span>
              <span style={{ color: colors.text.primary }}>{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetails
          product={product}
          isInWishlist={isInWishlist}
          relatedProducts={relatedProducts}
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onShare={handleShare}
          onRequestQuote={handleRequestQuote}
          onCheckAvailability={handleCheckAvailability}
        />
      </div>

      {/* Additional Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div 
            className="mb-12 p-6 rounded-xl border"
            style={{ 
              backgroundColor: colors.background.elevated,
              borderColor: colors.border.primary 
            }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.specifications.map((spec) => (
                <div key={spec.id} className="space-y-1">
                  <dt className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                    {spec.name}
                  </dt>
                  <dd className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                    {spec.value} {spec.unit && <span className="text-sm font-normal">{spec.unit}</span>}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rental Terms */}
        <div 
          className="mb-12 p-6 rounded-xl border"
          style={{ 
            backgroundColor: colors.background.elevated,
            borderColor: colors.border.primary 
          }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
            Rental Terms & Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text.primary }}>
                Rental Conditions
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                <li>• Minimum rental period: {Math.ceil((product.rentalTerms.minRentalPeriod || 24) / 24)} days</li>
                <li>• Maximum rental period: {Math.ceil((product.rentalTerms.maxRentalPeriod || 720) / 24)} days</li>
                <li>• Advance booking required: {Math.ceil((product.rentalTerms.advanceBookingRequired || 24) / 24)} days</li>
                {product.rentalTerms.depositRequired && (
                  <li>• Security deposit: ${product.rentalTerms.depositAmount || 'TBD'}</li>
                )}
                {product.rentalTerms.includesDelivery && <li>• Free delivery included</li>}
                {product.rentalTerms.includesPickup && <li>• Free pickup included</li>}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text.primary }}>
                Policies
              </h3>
              <div className="space-y-3 text-sm" style={{ color: colors.text.secondary }}>
                <div>
                  <span className="font-medium">Cancellation:</span>
                  <p className="mt-1">{product.rentalTerms.cancellationPolicy}</p>
                </div>
                <div>
                  <span className="font-medium">Late Return:</span>
                  <p className="mt-1">{product.rentalTerms.lateReturnPolicy}</p>
                </div>
                <div>
                  <span className="font-medium">Damage Policy:</span>
                  <p className="mt-1">{product.rentalTerms.damagePolicy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div 
            className="mb-12 p-6 rounded-xl border"
            style={{ 
              backgroundColor: colors.background.elevated,
              borderColor: colors.border.primary 
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
                Customer Reviews ({totalReviews})
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${i < Math.floor(averageRating) ? 'fill-current' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b pb-4" style={{ borderColor: colors.border.primary }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold" style={{ color: colors.text.primary }}>
                        {review.userName}
                      </span>
                      {review.isVerifiedRental && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: colors.brand.primary[100],
                            color: colors.brand.primary[700]
                          }}
                        >
                          Verified Rental
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-yellow-400 ${i < review.rating ? 'fill-current' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.review && (
                    <p style={{ color: colors.text.secondary }}>
                      {review.review}
                    </p>
                  )}
                  <p className="text-xs mt-2" style={{ color: colors.text.tertiary }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {totalReviews > 5 && (
              <div className="mt-6 text-center">
                <Button variant="outline">
                  View All {totalReviews} Reviews
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="cursor-pointer">
                  {/* Simplified product card for related products */}
                  <div
                    className="rounded-lg border p-4 hover:shadow-md transition-shadow"
                    style={{ 
                      backgroundColor: colors.background.elevated,
                      borderColor: colors.border.primary 
                    }}
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                  >
                    <img
                      src={relatedProduct.images?.[0]?.url || '/images/placeholder-product.jpg'}
                      alt={relatedProduct.name}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold mb-2" style={{ color: colors.text.primary }}>
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold" style={{ color: colors.brand.primary[600] }}>
                      ${relatedProduct.pricing?.basePrice}/day
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
