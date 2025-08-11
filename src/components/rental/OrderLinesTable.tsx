import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { RentalOrderLine, Product } from '../../types/rentalForm';
import { Select } from '../forms/Select';
import { Input } from '../forms/Input';
import { Button } from '../ui/Button';

interface OrderLinesTableProps {
  orderLines: RentalOrderLine[];
  onUpdateOrderLine: (index: number, line: RentalOrderLine) => void;
  onAddOrderLine: () => void;
  onRemoveOrderLine: (index: number) => void;
  products: Product[];
  disabled?: boolean;
}

export const OrderLinesTable: React.FC<OrderLinesTableProps> = ({
  orderLines,
  onUpdateOrderLine,
  onAddOrderLine,
  onRemoveOrderLine,
  products,
  disabled = false
}) => {
  const calculateSubTotal = (quantity: number, unitPrice: number, tax: number) => {
    const subtotal = quantity * unitPrice;
    return subtotal + (subtotal * tax / 100);
  };

  const updateOrderLine = (index: number, field: keyof RentalOrderLine, value: any) => {
    const line = { ...orderLines[index] };
    
    if (field === 'product') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        line.product = value;
        line.productName = selectedProduct.name;
        line.unitPrice = selectedProduct.unitPrice;
      }
    } else {
      (line as any)[field] = value;
    }

    // Recalculate subtotal when quantity, unit price, or tax changes
    if (['quantity', 'unitPrice', 'tax'].includes(field) || field === 'product') {
      line.subTotal = calculateSubTotal(line.quantity, line.unitPrice, line.tax);
    }

    onUpdateOrderLine(index, line);
  };

  const productOptions = products.map(product => ({
    value: product.id,
    label: product.name
  }));

  const totals = orderLines.reduce(
    (acc, line) => ({
      untaxedTotal: acc.untaxedTotal + (line.quantity * line.unitPrice),
      tax: acc.tax + ((line.quantity * line.unitPrice) * line.tax / 100),
      total: acc.total + line.subTotal
    }),
    { untaxedTotal: 0, tax: 0, total: 0 }
  );

  return (
    <div className="space-y-4">
      {/* Order Lines Table */}
      <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Order Lines</h3>
            <Button
              onClick={onAddOrderLine}
              disabled={disabled}
              size="sm"
              variant="outline"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Line
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/30">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tax %
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sub Total
                </th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orderLines.map((line, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <Select
                      value={line.product}
                      onChange={(value) => updateOrderLine(index, 'product', value)}
                      options={productOptions}
                      placeholder="Select product..."
                      disabled={disabled}
                      className="min-w-48"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={line.quantity}
                      onChange={(e) => updateOrderLine(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="0"
                      disabled={disabled}
                      className="text-center"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={line.unitPrice}
                      onChange={(e) => updateOrderLine(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      disabled={disabled}
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={line.tax}
                      onChange={(e) => updateOrderLine(index, 'tax', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      disabled={disabled}
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                    ${line.subTotal.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {!disabled && (
                      <button
                        onClick={() => onRemoveOrderLine(index)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orderLines.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No order lines added yet. Click "Add Line" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="space-y-2 max-w-sm ml-auto">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Untaxed Total:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${totals.untaxedTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tax:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${totals.tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-base font-semibold text-gray-900 dark:text-white">Total:</span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              ${totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};