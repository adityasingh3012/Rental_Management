import React from 'react';
import { 
  DocumentTextIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import { DashboardStats } from '../../types/dashboard';

interface StatsCardsProps {
  stats: DashboardStats;
  loading?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading = false }) => {
  const statsConfig = [
    {
      title: 'Quotations',
      value: stats.quotations,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Rentals',
      value: stats.rentals,
      icon: CalendarDaysIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Revenue',
      value: stats.revenue,
      icon: CurrencyDollarIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      format: 'currency'
    }
  ];

  const formatValue = (value: number, format?: string) => {
    if (format === 'currency') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatValue(stat.value, stat.format)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};