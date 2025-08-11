import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  loading = false,
  className = ''
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className={`bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-dark-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 ${column.className || ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`py-3 text-sm ${column.className || ''}`}
                    >
                      {column.render 
                        ? column.render(item[column.key], item)
                        : <span className="text-gray-900 dark:text-gray-100">{item[column.key]}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}