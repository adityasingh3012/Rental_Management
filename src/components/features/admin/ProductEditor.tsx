import React, { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Upload, 
  Trash2, 
  Plus,
  Image as ImageIcon,
  DollarSign,
  Package,
  Settings,
  Info
} from 'lucide-react';
import { Product, ProductCategory, ProductSpecification, ProductImage } from '../../../types/product.types';
import { ID, Status } from '../../../types/common.types';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { Input } from '../../common/Input';
import { LoadingSpinner } from '../../common/Loading';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { ProductFormData } from '../../../types/product.types';

interface ProductEditorProps {
  product?: Product;
  onSave?: (productData: ProductFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  onSave,
  onCancel,
  loading = false
}) => {
  const { colors } = useAppTheme();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    shortDescription: '',
    categoryId: '',
    brand: '',
    model: '',
    specifications: [],
    rentalTerms: {
      minRentalPeriod: 1,
      maxRentalPeriod: 30,
      unit: 'day',
      advanceBookingRequired: 24,
      cancellationPolicy: '',
      lateReturnPolicy: '',
      damagePolicy: '',
      depositRequired: false,
      includesDelivery: false,
      includesPickup: false
    },
    pricing: {
      basePrice: 0,
      currency: 'USD',
      pricingTiers: [],
      discounts: []
    },
    availability: {
      totalQuantity: 1,
      availableQuantity: 1,
      reservedQuantity: 0,
      maintenanceQuantity: 0,
      damagedQuantity: 0,
      unavailableDates: []
    },
    status: 'active',
    tags: [],
    features: [],
    images: []
  });

  const [categories] = useState<ProductCategory[]>([
    { id: '1', name: 'Audio Equipment', slug: 'audio', sortOrder: 1, isActive: true },
    { id: '2', name: 'Lighting', slug: 'lighting', sortOrder: 2, isActive: true },
    { id: '3', name: 'Photography', slug: 'photography', sortOrder: 3, isActive: true },
    { id: '4', name: 'Video Equipment', slug: 'video', sortOrder: 4, isActive: true }
  ]);

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription || '',
        categoryId: String(product.category.id),
        brand: product.brand || '',
        model: product.model || '',
        specifications: product.specifications || [],
        rentalTerms: product.rentalTerms,
        pricing: product.pricing,
        availability: product.availability,
        status: (product.status === 'pending' || product.status === 'archived') ? 'inactive' : product.status as 'active' | 'inactive' | 'maintenance',
        tags: product.tags,
        features: product.features,
        images: [] // Reset images for editing - file uploads need to be handled separately
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: keyof ProductFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [field]: value
      }
    }));
  };

  const addFeature = () => {
    const feature = prompt('Enter feature name:');
    if (feature) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    const tag = prompt('Enter tag name:');
    if (tag) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Info },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <Card.Body className="p-0">
          <div className="border-b" style={{ borderColor: colors.border.primary }}>
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                    style={{
                      color: activeTab === tab.id ? colors.brand.primary[600] : colors.text.secondary,
                      borderBottomColor: activeTab === tab.id ? colors.brand.primary[500] : 'transparent'
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Product Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Category *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => handleInputChange('categoryId', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      style={{ 
                        borderColor: colors.border.primary,
                        backgroundColor: colors.background.primary,
                        color: colors.text.primary
                      }}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Brand
                    </label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Enter brand name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Model
                    </label>
                    <Input
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Enter model number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Short Description
                  </label>
                  <Input
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Brief description for listings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Full Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed product description"
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2"
                    style={{ 
                      borderColor: colors.border.primary,
                      backgroundColor: colors.background.primary,
                      color: colors.text.primary
                    }}
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        style={{ 
                          backgroundColor: colors.brand.primary[100],
                          color: colors.brand.primary[700]
                        }}
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="hover:bg-red-200 rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        style={{ 
                          backgroundColor: colors.semantic.info[100],
                          color: colors.semantic.info[700]
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:bg-red-200 rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center"
                  style={{ borderColor: colors.border.secondary }}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4" style={{ color: colors.text.secondary }} />
                  <p className="text-lg font-medium mb-2" style={{ color: colors.text.primary }}>
                    Upload Product Images
                  </p>
                  <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>
                    Drag and drop images here, or click to browse
                  </p>
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Base Price (per day) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.pricing.basePrice}
                      onChange={(e) => handleNestedChange('pricing', 'basePrice', parseFloat(e.target.value))}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Currency
                    </label>
                    <select
                      value={formData.pricing.currency}
                      onChange={(e) => handleNestedChange('pricing', 'currency', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      style={{ 
                        borderColor: colors.border.primary,
                        backgroundColor: colors.background.primary,
                        color: colors.text.primary
                      }}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Min Rental Period
                    </label>
                    <Input
                      type="number"
                      value={formData.rentalTerms.minRentalPeriod}
                      onChange={(e) => handleNestedChange('rentalTerms', 'minRentalPeriod', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Max Rental Period
                    </label>
                    <Input
                      type="number"
                      value={formData.rentalTerms.maxRentalPeriod}
                      onChange={(e) => handleNestedChange('rentalTerms', 'maxRentalPeriod', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Unit
                    </label>
                    <select
                      value={formData.rentalTerms.unit}
                      onChange={(e) => handleNestedChange('rentalTerms', 'unit', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      style={{ 
                        borderColor: colors.border.primary,
                        backgroundColor: colors.background.primary,
                        color: colors.text.primary
                      }}
                    >
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Total Quantity *
                    </label>
                    <Input
                      type="number"
                      value={formData.availability.totalQuantity}
                      onChange={(e) => handleNestedChange('availability', 'totalQuantity', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Available Quantity
                    </label>
                    <Input
                      type="number"
                      value={formData.availability.availableQuantity}
                      onChange={(e) => handleNestedChange('availability', 'availableQuantity', parseInt(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Reserved Quantity
                    </label>
                    <Input
                      type="number"
                      value={formData.availability.reservedQuantity}
                      onChange={(e) => handleNestedChange('availability', 'reservedQuantity', parseInt(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                      Under Maintenance
                    </label>
                    <Input
                      type="number"
                      value={formData.availability.maintenanceQuantity}
                      onChange={(e) => handleNestedChange('availability', 'maintenanceQuantity', parseInt(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as Status)}
                    className="w-full border rounded-lg px-3 py-2"
                    style={{ 
                      borderColor: colors.border.primary,
                      backgroundColor: colors.background.primary,
                      color: colors.text.primary
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </form>
  );
};
