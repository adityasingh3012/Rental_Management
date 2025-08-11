import React from 'react';
import { RentalStatus, InvoiceStatus } from '../../types/rental';

interface StatusBadgeProps {
  status: RentalStatus | InvoiceStatus;
  type: 'rental' | 'invoice';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  const getRentalStatusConfig = (status: RentalStatus) => {
    switch (status) {
      case 'quotation':
        return {
          label: 'Quotation',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        };
      case 'reserved':
        return {
          label: 'Reserved',
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
        };
      case 'pickedup':
        return {
          label: 'Picked Up',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        };
      case 'returned':
        return {
          label: 'Returned',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
    }
  };

  const getInvoiceStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case 'nothing_to_invoice':
        return {
          label: 'Nothing to Invoice',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
      case 'to_invoice':
        return {
          label: 'To Invoice',
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        };
      case 'fully_invoiced':
        return {
          label: 'Fully Invoiced',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
    }
  };

  const config = type === 'rental' 
    ? getRentalStatusConfig(status as RentalStatus)
    : getInvoiceStatusConfig(status as InvoiceStatus);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};