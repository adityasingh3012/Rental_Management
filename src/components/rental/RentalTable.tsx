import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { RentalOrder } from '../../types/rental';
import { StatusBadge } from './StatusBadge';

interface RentalTableProps {
  rentals: RentalOrder[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onEdit: (rental: RentalOrder) => void;
  onView: (rental: RentalOrder) => void;
  loading?: boolean;
}

export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onEdit,
  onView,
  loading = false
}) => {
  const isAllSelected = rentals.length > 0 && selectedItems.length === rentals.length;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < rentals.length;

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="w-8 px-6 py-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Order Reference
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Created by user
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Rental Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Tax
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                Total
              </th>
              <th className="w-20 px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rentals.map((rental) => (
              <tr
                key={rental.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(rental.id)}
                    onChange={() => onSelectItem(rental.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(rental)}
                    className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    {rental.orderReference}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {rental.customerName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {rental.createdByUser}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <StatusBadge status={rental.rentalStatus} type="rental" />
                    <StatusBadge status={rental.invoiceStatus} type="invoice" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  ${((rental.totalAmount * 0.1)).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${rental.totalAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(rental)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};