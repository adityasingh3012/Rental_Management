import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  CreditCard, 
  Star,
  TrendingUp
} from 'lucide-react';

// Import components directly from their main files
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { LoadingSpinner, LoadingDots, LoadingSkeleton } from '../components/common/Loading';
import Select from '../components/common/Select';
import TextArea from '../components/common/TextArea';
import DatePicker from '../components/common/DatePicker';
import NumberInput from '../components/common/NumberInput';
import Alert from '../components/common/Alert';
import { ToastProvider, useToastHelpers } from '../components/common/Toast';
import EmptyState from '../components/common/EmptyState';
import Breadcrumb from '../components/common/Breadcrumb';
import Pagination from '../components/common/Pagination';
import Tabs from '../components/common/Tabs';
import StepIndicator from '../components/common/StepIndicator';
import { AdminLayout } from '../components/layout/Layout';

// Demo component for showcasing all Phase 2 components
const Phase2Demo: React.FC = () => {
  const [currentPage, setPagination] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    description: '',
    date: '',
    quantity: 1,
  });

  const toast = useToastHelpers();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Phase 2 Demo', current: true },
  ];

  const steps = [
    { id: 'basic', title: 'Basic Info', description: 'Enter basic information' },
    { id: 'details', title: 'Details', description: 'Add detailed information' },
    { id: 'review', title: 'Review', description: 'Review and confirm' },
    { id: 'complete', title: 'Complete', description: 'Process complete' },
  ];

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'tools', label: 'Tools & Equipment' },
  ];

  const handleFormChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showToastDemo = () => {
    toast.success('Success! Your action was completed successfully.');
    setTimeout(() => {
      toast.info('This is an informational message.');
    }, 1000);
    setTimeout(() => {
      toast.warning('Warning: Please review your input.');
    }, 2000);
    setTimeout(() => {
      toast.error('Error: Something went wrong.');
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Phase 2 Component Demo</h1>
            <p className="mt-2 text-gray-600">
              Showcase of all newly implemented components with modern, interactive design.
            </p>
          </div>
        </div>

        {/* Input Components Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Enhanced Input Components</h2>
            <p className="text-gray-600">Modern form inputs with validation and icons</p>
          </Card.Header>
          <Card.Body className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange('name', e.target.value)}
                hint="This will be the display name"
                leftIcon={Package}
              />

              <Select
                label="Category"
                placeholder="Select a category"
                options={categoryOptions}
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormChange('category', e.target.value)}
              />

              <DatePicker
                label="Rental Date"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange('date', e.target.value)}
                showTime
              />

              <NumberInput
                label="Quantity"
                value={formData.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange('quantity', parseInt(e.target.value) || 0)}
                min={1}
                max={100}
                showControls
              />
            </div>

            <TextArea
              label="Description"
              placeholder="Enter product description..."
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormChange('description', e.target.value)}
              autoResize
              maxLength={500}
              showCharCount
              hint="Provide a detailed description of the product"
            />
          </Card.Body>
        </Card>

        {/* Feedback Components Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Feedback Components</h2>
            <p className="text-gray-600">Alerts and notifications for user feedback</p>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="success" title="Success!">
                Your rental has been successfully created and is now active.
              </Alert>

              <Alert variant="warning" title="Warning" closable>
                Your subscription expires in 3 days. Renew now to avoid interruption.
              </Alert>

              <Alert variant="error" title="Error">
                Failed to process payment. Please check your payment method.
              </Alert>

              <Alert variant="info" title="Info">
                New features have been added to the dashboard. Check them out!
              </Alert>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={showToastDemo}>Show Toast Demo</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Navigation Components Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Navigation Components</h2>
            <p className="text-gray-600">Tabs, pagination, and step indicators</p>
          </Card.Header>
          <Card.Body className="space-y-6">
            {/* Tabs Demo */}
            <div>
              <h3 className="text-lg font-medium mb-4">Tabs</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Trigger value="overview" icon={TrendingUp}>
                    Overview
                  </Tabs.Trigger>
                  <Tabs.Trigger value="products" icon={Package} badge={12}>
                    Products
                  </Tabs.Trigger>
                  <Tabs.Trigger value="customers" icon={Users} badge={45}>
                    Customers
                  </Tabs.Trigger>
                  <Tabs.Trigger value="rentals" icon={CreditCard}>
                    Rentals
                  </Tabs.Trigger>
                </Tabs.List>

                <div className="mt-4">
                  <Tabs.Content value="overview">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Overview Content</h4>
                      <p className="text-gray-600">This is the overview tab content with key metrics and insights.</p>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="products">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Products Management</h4>
                      <p className="text-gray-600">Manage your rental products, inventory, and categories here.</p>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="customers">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Customer Management</h4>
                      <p className="text-gray-600">View and manage customer information and rental history.</p>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="rentals">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Active Rentals</h4>
                      <p className="text-gray-600">Monitor active rentals, due dates, and returns.</p>
                    </div>
                  </Tabs.Content>
                </div>
              </Tabs>
            </div>

            {/* Step Indicator Demo */}
            <div>
              <h3 className="text-lg font-medium mb-4">Step Indicator</h3>
              <div className="space-y-4">
                <StepIndicator
                  steps={steps}
                  currentStep={currentStep}
                  completedSteps={[0, 1]}
                  clickable
                  onStepClick={setCurrentStep}
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Pagination Demo */}
            <div>
              <h3 className="text-lg font-medium mb-4">Pagination</h3>
              <div className="space-y-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setPagination}
                  showFirstLast
                  showPrevNext
                />
                <div className="text-sm text-gray-600">
                  Showing 1-20 of 200 results (Page {currentPage} of 10)
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Empty State Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Empty States</h2>
            <p className="text-gray-600">Beautiful empty states for different scenarios</p>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <EmptyState
                  icon={Package}
                  title="No Products Found"
                  description="You haven't added any products yet. Start by creating your first rental product."
                  action={{
                    label: "Add Product",
                    onClick: () => toast.info("Add product clicked!"),
                  }}
                  size="sm"
                />
              </div>

              <div className="border rounded-lg p-4">
                <EmptyState
                  icon={Users}
                  title="No Customers"
                  description="No customers have registered yet. Share your rental platform to get started."
                  action={{
                    label: "Invite Customers",
                    onClick: () => toast.info("Invite customers clicked!"),
                  }}
                  secondaryAction={{
                    label: "Learn More",
                    onClick: () => toast.info("Learn more clicked!"),
                  }}
                  size="sm"
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Component Variations Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Component Variations</h2>
            <p className="text-gray-600">Different sizes and styles of components</p>
          </Card.Header>
          <Card.Body className="space-y-6">
            {/* Button Variations */}
            <div>
              <h3 className="text-lg font-medium mb-4">Buttons</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">Small Primary</Button>
                  <Button variant="primary" size="md">Medium Primary</Button>
                  <Button variant="primary" size="lg">Large Primary</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" leftIcon={Star}>With Icon</Button>
                  <Button variant="danger" loading>Loading</Button>
                  <Button variant="success" rightIcon={CreditCard}>Success</Button>
                </div>
              </div>
            </div>

            {/* Loading Variations */}
            <div>
              <h3 className="text-lg font-medium mb-4">Loading States</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex justify-center">
                  <LoadingSpinner size="md" />
                </div>
                <div className="p-4 border rounded-lg flex justify-center">
                  <LoadingDots />
                </div>
                <div className="p-4 border rounded-lg">
                  <LoadingSkeleton className="h-20" />
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Wrap with ToastProvider
const Phase2DemoWithToast: React.FC = () => (
  <ToastProvider>
    <Phase2Demo />
  </ToastProvider>
);

export default Phase2DemoWithToast;
