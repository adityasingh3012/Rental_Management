import React from 'react';
import { 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NavigationPage } from '../../types/navigation';

interface HeaderProps {
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // Navigation props
  currentPage?: NavigationPage;
  onNavigate?: (page: NavigationPage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPeriod,
  onPeriodChange,
  searchQuery,
  onSearchChange,
  currentPage = 'dashboard',
  onNavigate
}) => {
  const periods = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' }
  ];

  const navigationItems: { key: Exclude<NavigationPage, 'rental-form'>; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'rental', label: 'Rental' },
    { key: 'order', label: 'Order' },
    { key: 'products', label: 'Products' },
    { key: 'reporting', label: 'Reporting' },
    { key: 'setting', label: 'Setting' }
  ];

  const handleNavigation = (page: Exclude<NavigationPage, 'rental-form'>) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
              Rental Management
            </h1>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* User Profile */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Adam
              </span>
              <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation and Controls */}
        <div className="mt-4 flex items-center justify-between">
          {/* Navigation Pills */}
          <nav className="flex space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.key === currentPage
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search and Period Selector */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Period Selector */}
            <select
              value={currentPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};