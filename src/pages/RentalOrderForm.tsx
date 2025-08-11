import React, { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon, 
  UserCircleIcon,
  CalendarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { Header } from '../components/layout/Header';
import { FormField } from '../components/forms/FormField';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Textarea } from '../components/forms/Textarea';
import { Button } from '../components/ui/Button';
import { OrderLinesTable } from '../components/rental/OrderLinesTable';
import { StatusManagement } from '../components/rental/StatusManagement';
import { RentalOrderActions } from '../components/rental/RentalOrderActions';
import { 
  RentalOrderFormData, 
  Customer, 
  Product, 
  RentalTemplate, 
  Pricelist,
  RentalOrderLine 
} from '../types/rentalForm';
import { NavigationProps } from '../types/navigation';

interface RentalOrderFormProps extends NavigationProps {
  orderId?: string; // If provided, we're editing an existing order
  onSave: (data: RentalOrderFormData) => Promise<void>;
  onCancel: () => void;
}

// Mock data - Backend will replace this
const mockCustomers: Customer[] = [
  { id: '1', name: 'Customer 1', email: 'customer1@example.com', phone: '+1234567890', invoiceAddress: '123 Invoice St', deliveryAddress: '123 Delivery St' },
  { id: '2', name: 'Customer 2', email: 'customer2@example.com', phone: '+1234567891', invoiceAddress: '456 Invoice St', deliveryAddress: '456 Delivery St' }
];

const mockProducts: Product[] = [
  { id: '1', name: 'Product 1', description: 'Description 1', unitPrice: 200, category: 'Category A', isRentable: true },
  { id: '2', name: 'Product 2', description: 'Description 2', unitPrice: 150, category: 'Category B', isRentable: true }
];

const mockTemplates: RentalTemplate[] = [
  { id: '1', name: 'Standard Template', description: 'Standard rental template', termsAndConditions: 'Standard terms and conditions...' }
];

const mockPricelists: Pricelist[] = [
  { id: '1', name: 'Standard Pricelist', description: 'Standard pricing', validFrom: '2024-01-01', validTo: '2024-12-31' }
];

export const RentalOrderForm: React.FC<RentalOrderFormProps> = ({
  orderId,
  onSave,
  onCancel,
  currentPage,
  onNavigate,
  onCreateRental,
  onEditRental
}) => {
  const [formData, setFormData] = useState<RentalOrderFormData>({
    customer: '',
    invoiceAddress: '',
    deliveryAddress: '',
    rentalTemplate: '',
    expiration: '',
    rentalOrderDate: new Date().toISOString().split('T')[0],
    pricelist: '',
    rentalPeriod: '',
    rentalDuration: '',
    orderLines: [],
    otherDetails: '',
    rentalNotes: '',
    termsAndConditions: '',
    rentalStatus: 'quotation',
    invoiceStatus: 'nothing_to_invoice'
  });

  const [customers] = useState<Customer[]>(mockCustomers);
  const [products] = useState<Product[]>(mockProducts);
  const [templates] = useState<RentalTemplate[]>(mockTemplates);
  const [pricelists] = useState<Pricelist[]>(mockPricelists);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'order' | 'other' | 'rental'>('order');

  const isEditing = Boolean(orderId);
  const isConfirmed = formData.rentalStatus !== 'quotation';

  // Backend Integration Point - Load existing order for editing
  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          // TODO: Replace with actual API call
          // const response = await rentalAPI.getOrderById(orderId);
          // setFormData(response.data);
          
          // Simulate API call with mock data
          await new Promise(resolve => setTimeout(resolve, 500));
          setFormData({
            ...formData,
            id: orderId,
            orderReference: 'R0001',
            customer: '1',
            invoiceAddress: '123 Invoice St',
            deliveryAddress: '123 Delivery St',
            orderLines: [
              { id: '1', product: '1', productName: 'Product 1', quantity: 5, unitPrice: 200, tax: 10, subTotal: 1100 }
            ]
          });
        } catch (error) {
          console.error('Failed to load order:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  const handleInputChange = (field: keyof RentalOrderFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-fill addresses when customer is selected
    if (field === 'customer') {
      const selectedCustomer = customers.find(c => c.id === value);
      if (selectedCustomer) {
        setFormData(prev => ({
          ...prev,
          customer: value,
          customerName: selectedCustomer.name,
          invoiceAddress: selectedCustomer.invoiceAddress,
          deliveryAddress: selectedCustomer.deliveryAddress
        }));
      }
    }

    // Auto-fill terms when template is selected
    if (field === 'rentalTemplate') {
      const selectedTemplate = templates.find(t => t.id === value);
      if (selectedTemplate) {
        setFormData(prev => ({
          ...prev,
          rentalTemplate: value,
          termsAndConditions: selectedTemplate.termsAndConditions
        }));
      }
    }
  };

  const handleOrderLineUpdate = (index: number, line: RentalOrderLine) => {
    const newOrderLines = [...formData.orderLines];
    newOrderLines[index] = line;
    setFormData(prev => ({ ...prev, orderLines: newOrderLines }));
  };

  const handleAddOrderLine = () => {
    setFormData(prev => ({
      ...prev,
      orderLines: [
        ...prev.orderLines,
        { product: '', quantity: 1, unitPrice: 0, tax: 0, subTotal: 0 }
      ]
    }));
  };

  const handleRemoveOrderLine = (index: number) => {
    setFormData(prev => ({
      ...prev,
      orderLines: prev.orderLines.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer) newErrors.customer = 'Customer is required';
    if (!formData.rentalOrderDate) newErrors.rentalOrderDate = 'Order date is required';
    if (formData.orderLines.length === 0) newErrors.orderLines = 'At least one order line is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Failed to save order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = () => {
    // TODO: Implement price update logic
    console.log('Update prices');
  };

  // Action handlers for confirmed orders
  const handleCreateInvoice = () => console.log('Create invoice');
  const handleCreateDelivery = () => console.log('Create delivery');
  const handleCreatePickup = () => console.log('Create pickup');
  const handlePrint = () => console.log('Print order');
  const handleConvertToQuotation = () => handleInputChange('rentalStatus', 'quotation');
  const handleConvertToRentalOrder = () => handleInputChange('rentalStatus', 'reserved');

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Header
        currentPeriod="30days"
        onPeriodChange={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEditing ? `Edit Order ${formData.orderReference}` : 'Create Rental Order'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isEditing ? 'Update rental order details' : 'Create a new rental order'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isConfirmed && (
              <RentalOrderActions
                rentalStatus={formData.rentalStatus}
                onCreateInvoice={handleCreateInvoice}
                onCreateDelivery={handleCreateDelivery}
                onCreatePickup={handleCreatePickup}
                onPrint={handlePrint}
                onConvertToQuotation={handleConvertToQuotation}
                onConvertToRentalOrder={handleConvertToRentalOrder}
                loading={loading}
              />
            )}
            
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} loading={loading}>
              {isEditing ? 'Update Order' : 'Save Order'}
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700">
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formData.orderReference || 'New Order'}
                </div>
                {isConfirmed && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 capitalize">
                      {formData.rentalStatus}
                    </span>
                  </div>
                )}
              </div>
              
              {!isConfirmed && (
                <Button onClick={handleUpdatePrice} variant="outline" size="sm">
                  <CogIcon className="w-4 h-4 mr-1" />
                  Update Prices
                </Button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'order', label: 'Order Lines' },
                { id: 'other', label: 'Other Details' },
                { id: 'rental', label: 'Rental Notes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField label="Customer" required error={errors.customer}>
                  <Select
                    value={formData.customer}
                    onChange={(value) => handleInputChange('customer', value)}
                    options={customers.map(c => ({ value: c.id, label: c.name }))}
                    placeholder="Select customer..."
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Invoice Address">
                  <Textarea
                    value={formData.invoiceAddress}
                    onChange={(e) => handleInputChange('invoiceAddress', e.target.value)}
                    rows={3}
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Delivery Address">
                  <Textarea
                    value={formData.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    rows={3}
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Rental Template">
                  <Select
                    value={formData.rentalTemplate}
                    onChange={(value) => handleInputChange('rentalTemplate', value)}
                    options={templates.map(t => ({ value: t.id, label: t.name }))}
                    placeholder="Select template..."
                    disabled={isConfirmed}
                  />
                </FormField>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField label="Expiration">
                  <Input
                    type="date"
                    value={formData.expiration}
                    onChange={(e) => handleInputChange('expiration', e.target.value)}
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Rental Order Date" required>
                  <Input
                    type="date"
                    value={formData.rentalOrderDate}
                    onChange={(e) => handleInputChange('rentalOrderDate', e.target.value)}
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Pricelist">
                  <Select
                    value={formData.pricelist}
                    onChange={(value) => handleInputChange('pricelist', value)}
                    options={pricelists.map(p => ({ value: p.id, label: p.name }))}
                    placeholder="Select pricelist..."
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Rental Period">
                  <Input
                    value={formData.rentalPeriod}
                    onChange={(e) => handleInputChange('rentalPeriod', e.target.value)}
                    placeholder="e.g., 1 month"
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Rental Duration">
                  <Input
                    value={formData.rentalDuration}
                    onChange={(e) => handleInputChange('rentalDuration', e.target.value)}
                    placeholder="e.g., 30 days"
                    disabled={isConfirmed}
                  />
                </FormField>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'order' && (
              <div className="space-y-6">
                <OrderLinesTable
                  orderLines={formData.orderLines}
                  onUpdateOrderLine={handleOrderLineUpdate}
                  onAddOrderLine={handleAddOrderLine}
                  onRemoveOrderLine={handleRemoveOrderLine}
                  products={products}
                  disabled={isConfirmed}
                />
                {errors.orderLines && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.orderLines}</p>
                )}
              </div>
            )}

            {activeTab === 'other' && (
              <div className="space-y-4">
                <FormField label="Other Details">
                  <Textarea
                    value={formData.otherDetails}
                    onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                    rows={6}
                    placeholder="Additional order details..."
                    disabled={isConfirmed}
                  />
                </FormField>
              </div>
            )}

            {activeTab === 'rental' && (
              <div className="space-y-4">
                <FormField label="Rental Notes">
                  <Textarea
                    value={formData.rentalNotes}
                    onChange={(e) => handleInputChange('rentalNotes', e.target.value)}
                    rows={4}
                    placeholder="Rental-specific notes..."
                    disabled={isConfirmed}
                  />
                </FormField>

                <FormField label="Terms & Conditions">
                  <Textarea
                    value={formData.termsAndConditions}
                    onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                    rows={8}
                    placeholder="Terms and conditions..."
                    disabled={isConfirmed}
                  />
                </FormField>
              </div>
            )}

            {/* Status Management for Confirmed Orders */}
            {isConfirmed && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Status Management
                </h3>
                <StatusManagement
                  rentalStatus={formData.rentalStatus}
                  invoiceStatus={formData.invoiceStatus}
                  onRentalStatusChange={(status) => handleInputChange('rentalStatus', status)}
                  onInvoiceStatusChange={(status) => handleInputChange('invoiceStatus', status)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};