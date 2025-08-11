import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { StatsCards } from '../components/dashboard/StatsCards';
import { DataTable } from '../components/ui/DataTable';
import { DashboardData, TimePeriod } from '../types/dashboard';
import { NavigationProps } from '../types/navigation';

interface DashboardProps extends NavigationProps {}

// Mock data - Backend will replace this
const mockDashboardData: DashboardData = {
  stats: {
    quotations: 10,
    rentals: 26,
    revenue: 10599
  },
  topProductCategories: [
    { category: 'Rental - Service', ordered: 25, revenue: 2990 }
  ],
  topProducts: [
    { product: 'Wheelchairs', ordered: 10, revenue: 3032 },
    { product: 'Tables', ordered: 5, revenue: 1009 },
    { product: 'Chairs', ordered: 4, revenue: 3009 }
  ],
  topCustomers: [
    { customer: 'Customer1', ordered: 10, revenue: 3032 },
    { customer: 'Customer2', ordered: 5, revenue: 1009 },
    { customer: 'Customer3', ordered: 4, revenue: 3009 }
  ]
};

export const Dashboard: React.FC<DashboardProps> = ({ 
  currentPage,
  onNavigate,
  onCreateRental,
  onEditRental
}) => {
  const [currentPeriod, setCurrentPeriod] = useState<string>('30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>(mockDashboardData);
  const [loading, setLoading] = useState(false);

  // Backend Integration Point - Replace with actual API call
  const fetchDashboardData = async (period: TimePeriod, search?: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dashboardAPI.getData({ period, search });
      // setDashboardData(response.data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setDashboardData(mockDashboardData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(currentPeriod as TimePeriod, searchQuery);
  }, [currentPeriod, searchQuery]);

  // Table configurations
  const productCategoryColumns = [
    { key: 'category' as const, label: 'Category' },
    { 
      key: 'ordered' as const, 
      label: 'Ordered',
      className: 'text-center',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">{value}</span>
      )
    },
    { 
      key: 'revenue' as const, 
      label: 'Revenue',
      className: 'text-right',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">${value.toLocaleString()}</span>
      )
    }
  ];

  const productColumns = [
    { key: 'product' as const, label: 'Product' },
    { 
      key: 'ordered' as const, 
      label: 'Ordered',
      className: 'text-center',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">{value}</span>
      )
    },
    { 
      key: 'revenue' as const, 
      label: 'Revenue',
      className: 'text-right',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">${value.toLocaleString()}</span>
      )
    }
  ];

  const customerColumns = [
    { key: 'customer' as const, label: 'Customer' },
    { 
      key: 'ordered' as const, 
      label: 'Ordered',
      className: 'text-center',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">{value}</span>
      )
    },
    { 
      key: 'revenue' as const, 
      label: 'Revenue',
      className: 'text-right',
      render: (value: number) => (
        <span className="text-gray-900 dark:text-gray-100 font-medium">${value.toLocaleString()}</span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Header
        currentPeriod={currentPeriod}
        onPeriodChange={setCurrentPeriod}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      
      <main className="px-6 py-8">
        {/* Stats Cards */}
        <StatsCards stats={dashboardData.stats} loading={loading} />
        
        {/* Data Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Product Categories */}
          <DataTable
            title="Top Product Categories"
            data={dashboardData.topProductCategories}
            columns={productCategoryColumns}
            loading={loading}
          />
          
          {/* Top Products */}
          <DataTable
            title="Top Products"
            data={dashboardData.topProducts}
            columns={productColumns}
            loading={loading}
          />
          
          {/* Top Customers - Full Width */}
          <div className="lg:col-span-2">
            <DataTable
              title="Top Customers"
              data={dashboardData.topCustomers}
              columns={customerColumns}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};