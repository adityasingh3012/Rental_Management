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

interface ProductFormData {
  name: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  brand: string;
  model: string;
  basePrice: number;
  status: 'active' | 'inactive' | 'maintenance';
  tags: string[];
  features: string[];
}

interface ProductEditorProps {
  product?: Product;
  onSave?: (productData: ProductFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  shortDescription: '',
  categoryId: '',
  brand: '',
  model: '',
  basePrice: 0,
  status: 'active',
  tags: [],
  features: []
};

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  onSave,
  onCancel,
  loading = false
}) => {
  const { colors } = useAppTheme();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription || '',
        categoryId: String(product.category.id),
        brand: product.brand || '',
        model: product.model || '',
        basePrice: product.pricing.basePrice,
        status: product.status === 'active' ? 'active' : product.status === 'inactive' ? 'inactive' : 'maintenance',
        tags: product.tags,
        features: product.features
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    handleInputChange('tags', formData.tags.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      handleInputChange('features', [...formData.features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    handleInputChange('features', formData.features.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg shadow-xl"
        style={{ backgroundColor: colors.background.primary }}
      >
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          {/* Header */}
          <div 
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: colors.border.primary }}
          >
            <h2 className="text-xl font-semibold" style={{ color: colors.text.primary }}>
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-1"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 border rounded-md"
                    style={{
                      backgroundColor: colors.background.primary,
                      borderColor: colors.border.primary,
                      color: colors.text.primary
                    }}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="audio">Audio Equipment</option>
                    <option value="lighting">Lighting</option>
                    <option value="camera">Camera & Video</option>
                    <option value="staging">Staging</option>
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
                  placeholder="Brief product description"
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
                  className="w-full px-3 py-2 border rounded-md resize-vertical"
                  style={{
                    backgroundColor: colors.background.primary,
                    borderColor: colors.border.primary,
                    color: colors.text.primary
                  }}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Base Price (per hour) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: colors.text.secondary }} />
                    <Input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => handleInputChange('basePrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="pl-10"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{
                      backgroundColor: colors.background.primary,
                      borderColor: colors.border.primary,
                      color: colors.text.primary
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                      style={{
                        backgroundColor: colors.brand.primary[100],
                        color: colors.brand.primary[700]
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:bg-red-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                  Features
                </label>
                <div className="space-y-2 mb-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span
                        className="flex-1 px-3 py-2 rounded border"
                        style={{
                          backgroundColor: colors.background.secondary,
                          borderColor: colors.border.primary,
                          color: colors.text.primary
                        }}
                      >
                        {feature}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="px-6 py-4 border-t flex justify-end gap-3"
            style={{ borderColor: colors.border.primary }}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name || !formData.description}
            >
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
