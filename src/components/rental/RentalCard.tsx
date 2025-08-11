import React from 'react';
import { UserIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { RentalOrder } from '../../types/rental';
import { StatusBadge } from './StatusBadge';

interface RentalCardProps {
  rental: RentalOrder;
  onEdit: (rental: RentalOrder) => void;
  onView: (rental: RentalOrder) => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental, onEdit, onView }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 p-6 hover:shadow-medium transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {rental.orderReference}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <UserIcon className="w-4 h-4 mr-1" />
            {rental.customerName}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ${rental.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <StatusBadge status={rental.rentalStatus} type="rental" />
        <StatusBadge status={rental.invoiceStatus} type="invoice" />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>Created: {new Date(rental.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <UserIcon className="w-4 h-4 mr-2" />
          <span>By: {rental.createdByUser}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onView(rental)}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(rental)}
          className="flex-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};