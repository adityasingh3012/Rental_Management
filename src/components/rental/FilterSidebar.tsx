import React from 'react';
import { RentalStats, RentalFilters } from '../../types/rental';

interface FilterSidebarProps {
  stats: RentalStats;
  filters: RentalFilters;
  onFiltersChange: (filters: RentalFilters) => void;
  loading?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  stats,
  filters,
  onFiltersChange,
  loading = false
}) => {
  const rentalStatusOptions = [
    { key: 'all', label: 'ALL', count: stats.all },
    { key: 'quotation', label: 'Quotation', count: stats.quotation },
    { key: 'reserved', label: 'Reserved', count: stats.reserved },
    { key: 'pickedup', label: 'Pickup', count: stats.pickedup },
    { key: 'returned', label: 'Returned', count: stats.returned }
  ];

  const invoiceStatusOptions = [
    { key: 'fully_invoiced', label: 'Fully Invoiced', count: stats.fullyInvoiced },
    { key: 'nothing_to_invoice', label: 'Nothing to invoice', count: stats.nothingToInvoice },
    { key: 'to_invoice', label: 'To invoice', count: stats.toInvoice }
  ];

  const handleRentalStatusChange = (status: string) => {
    if (status === 'all') {
      onFiltersChange({ ...filters, rentalStatus: undefined });
    } else {
      const currentStatuses = filters.rentalStatus || [];
      const newStatuses = currentStatuses.includes(status as any)
        ? currentStatuses.filter(s => s !== status)
        : [...currentStatuses, status as any];
      
      onFiltersChange({ 
        ...filters, 
        rentalStatus: newStatuses.length > 0 ? newStatuses : undefined 
      });
    }
  };

  const handleInvoiceStatusChange = (status: string) => {
    const currentStatuses = filters.invoiceStatus || [];
    const newStatuses = currentStatuses.includes(status as any)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status as any];
    
    onFiltersChange({ 
      ...filters, 
      invoiceStatus: newStatuses.length > 0 ? newStatuses : undefined 
    });
  };

  if (loading) {
    return (
      <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {/* Rental Status Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
            Rental Status
          </h3>
          <div className="space-y-2">
            {rentalStatusOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleRentalStatusChange(option.key)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  (option.key === 'all' && !filters.rentalStatus) ||
                  filters.rentalStatus?.includes(option.key as any)
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>{option.label}</span>
                <span className="text-xs font-medium">{option.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Status Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
            Invoice Status
          </h3>
          <div className="space-y-2">
            {invoiceStatusOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleInvoiceStatusChange(option.key)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  filters.invoiceStatus?.includes(option.key as any)
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>{option.label}</span>
                <span className="text-xs font-medium">{option.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};