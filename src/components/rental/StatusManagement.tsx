import React from 'react';
import { RentalStatus, InvoiceStatus } from '../../types/rental';

interface StatusManagementProps {
  rentalStatus: RentalStatus;
  invoiceStatus: InvoiceStatus;
  onRentalStatusChange: (status: RentalStatus) => void;
  onInvoiceStatusChange: (status: InvoiceStatus) => void;
  disabled?: boolean;
}

export const StatusManagement: React.FC<StatusManagementProps> = ({
  rentalStatus,
  invoiceStatus,
  onRentalStatusChange,
  onInvoiceStatusChange,
  disabled = false
}) => {
  const rentalStatusOptions: { value: RentalStatus; label: string; color: string }[] = [
    { value: 'quotation', label: 'Quotation', color: 'bg-blue-500' },
    { value: 'reserved', label: 'Reserved', color: 'bg-purple-500' },
    { value: 'pickedup', label: 'Picked Up', color: 'bg-green-500' },
    { value: 'returned', label: 'Returned', color: 'bg-gray-500' }
  ];

  const invoiceStatusOptions: { value: InvoiceStatus; label: string; color: string }[] = [
    { value: 'nothing_to_invoice', label: 'Nothing to Invoice', color: 'bg-gray-500' },
    { value: 'to_invoice', label: 'To Invoice', color: 'bg-yellow-500' },
    { value: 'fully_invoiced', label: 'Fully Invoiced', color: 'bg-green-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Rental Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Rental Status</h3>
        <div className="space-y-2">
          {rentalStatusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onRentalStatusChange(option.value)}
              disabled={disabled}
              className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                rentalStatus === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-3 h-3 rounded-full ${option.color} mr-3`}></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.label}
              </span>
              {rentalStatus === option.value && (
                <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Invoice Status</h3>
        <div className="space-y-2">
          {invoiceStatusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onInvoiceStatusChange(option.value)}
              disabled={disabled}
              className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                invoiceStatus === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-3 h-3 rounded-full ${option.color} mr-3`}></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.label}
              </span>
              {invoiceStatus === option.value && (
                <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};