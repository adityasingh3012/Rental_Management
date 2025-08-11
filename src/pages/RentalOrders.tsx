import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  ViewColumnsIcon,
  Squares2X2Icon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Header } from '../components/layout/Header';
import { FilterSidebar } from '../components/rental/FilterSidebar';
import { RentalCard } from '../components/rental/RentalCard';
import { RentalTable } from '../components/rental/RentalTable';
import { Button } from '../components/ui/Button';
import { RentalOrder, RentalFilters, RentalStats, ViewMode } from '../types/rental';
import { NavigationProps } from '../types/navigation';

interface RentalOrdersProps extends NavigationProps {}

// Mock data - Backend will replace this
const mockRentalStats: RentalStats = {
  all: 10,
  quotation: 1,
  reserved: 2,
  pickedup: 1,
  returned: 1,
  fullyInvoiced: 2,
  nothingToInvoice: 2,
  toInvoice: 2
};

const mockRentalOrders: RentalOrder[] = [
  {
    id: '1',
    orderReference: 'R0001',
    customer: 'customer1',
    customerName: 'Customer 1',
    createdBy: 'adam',
    createdByUser: 'Adam',
    rentalStatus: 'quotation',
    invoiceStatus: 'nothing_to_invoice',
    totalAmount: 2000,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    orderReference: 'R0002',
    customer: 'customer2',
    customerName: 'Customer 2',
    createdBy: 'adam',
    createdByUser: 'Adam',
    rentalStatus: 'pickedup',
    invoiceStatus: 'to_invoice',
    totalAmount: 3000,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    orderReference: 'R0003',
    customer: 'customer3',
    customerName: 'Customer 3',
    createdBy: 'adam',
    createdByUser: 'Adam',
    rentalStatus: 'returned',
    invoiceStatus: 'fully_invoiced',
    totalAmount: 2000,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    orderReference: 'R0004',
    customer: 'customer4',
    customerName: 'Customer 4',
    createdBy: 'adam',
    createdByUser: 'Adam',
    rentalStatus: 'reserved',
    invoiceStatus: 'nothing_to_invoice',
    totalAmount: 2000,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

export const RentalOrders: React.FC<RentalOrdersProps> = ({ 
  currentPage: currentNavPage,
  onNavigate,
  onCreateRental,
  onEditRental
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [filters, setFilters] = useState<RentalFilters>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentals, setRentals] = useState<RentalOrder[]>(mockRentalOrders);
  const [stats, setStats] = useState<RentalStats>(mockRentalStats);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(rentals.length / itemsPerPage);

  // Backend Integration Point - Replace with actual API call
  const fetchRentalOrders = async (filters: RentalFilters, page: number, search?: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await rentalAPI.getOrders({ filters, page, search, limit: itemsPerPage });
      // setRentals(response.data.orders);
      // setStats(response.data.stats);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters to mock data
      let filteredRentals = mockRentalOrders;
      
      if (filters.rentalStatus && filters.rentalStatus.length > 0) {
        filteredRentals = filteredRentals.filter(r => filters.rentalStatus!.includes(r.rentalStatus));
      }
      
      if (filters.invoiceStatus && filters.invoiceStatus.length > 0) {
        filteredRentals = filteredRentals.filter(r => filters.invoiceStatus!.includes(r.invoiceStatus));
      }
      
      if (search) {
        filteredRentals = filteredRentals.filter(r => 
          r.orderReference.toLowerCase().includes(search.toLowerCase()) ||
          r.customerName.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      setRentals(filteredRentals);
    } catch (error) {
      console.error('Failed to fetch rental orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentalOrders(filters, currentPage, searchQuery);
  }, [filters, currentPage, searchQuery]);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedItems(selected ? rentals.map(r => r.id) : []);
  };

  const handleCreateNew = () => {
    onCreateRental();
  };

  const handleEdit = (rental: RentalOrder) => {
    onEditRental(rental.id);
  };

  const handleView = (rental: RentalOrder) => {
    onEditRental(rental.id);
  };

  const paginatedRentals = rentals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Header
        currentPeriod="30days"
        onPeriodChange={() => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentPage={currentNavPage}
        onNavigate={onNavigate}
      />
      
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          stats={stats}
          filters={filters}
          onFiltersChange={setFilters}
          loading={loading}
        />
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Page Header */}
          <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleCreateNew}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create
                </Button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Rental Orders
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                {/* Pagination Info */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.min((currentPage - 1) * itemsPerPage + 1, rentals.length)}-{Math.min(currentPage * itemsPerPage, rentals.length)} of {rentals.length}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'card'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <ViewColumnsIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
                      <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  paginatedRentals.map((rental) => (
                    <RentalCard
                      key={rental.id}
                      rental={rental}
                      onEdit={handleEdit}
                      onView={handleView}
                    />
                  ))
                )}
              </div>
            ) : (
              <RentalTable
                rentals={paginatedRentals}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                onEdit={handleEdit}
                onView={handleView}
                loading={loading}
              />
            )}
            
            {/* Empty State */}
            {!loading && rentals.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                  No rental orders found
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-sm">
                  Try adjusting your filters or create a new rental order
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};