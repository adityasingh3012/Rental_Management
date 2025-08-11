import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { 
  User, 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const getDashboardStats = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
          { title: 'Active Rentals', value: '89', icon: Package, color: 'green' },
          { title: 'Revenue (MTD)', value: '$12,450', icon: DollarSign, color: 'purple' },
          { title: 'Growth Rate', value: '+15.3%', icon: TrendingUp, color: 'orange' },
        ];
      case 'staff':
        return [
          { title: 'My Assignments', value: '23', icon: Calendar, color: 'blue' },
          { title: 'Pending Approvals', value: '7', icon: Package, color: 'orange' },
          { title: 'Completed Today', value: '12', icon: TrendingUp, color: 'green' },
          { title: 'Customer Requests', value: '5', icon: Users, color: 'purple' },
        ];
      case 'customer':
        return [
          { title: 'Active Rentals', value: '3', icon: Package, color: 'blue' },
          { title: 'Upcoming Returns', value: '2', icon: Calendar, color: 'orange' },
          { title: 'Total Spent', value: '$1,280', icon: DollarSign, color: 'green' },
          { title: 'Saved Items', value: '8', icon: User, color: 'purple' },
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Manage Users', description: 'Add, edit, or remove users', icon: Users },
          { title: 'Product Catalog', description: 'Manage rental inventory', icon: Package },
          { title: 'Analytics', description: 'View reports and insights', icon: TrendingUp },
          { title: 'System Settings', description: 'Configure application', icon: Settings },
        ];
      case 'staff':
        return [
          { title: 'Process Rentals', description: 'Approve or reject rental requests', icon: Package },
          { title: 'Schedule Deliveries', description: 'Organize pickup and returns', icon: Calendar },
          { title: 'Customer Support', description: 'Handle customer inquiries', icon: Users },
          { title: 'Inventory Check', description: 'Update product availability', icon: TrendingUp },
        ];
      case 'customer':
        return [
          { title: 'Browse Products', description: 'Find equipment to rent', icon: Package },
          { title: 'My Rentals', description: 'View current and past rentals', icon: Calendar },
          { title: 'Request Quote', description: 'Get pricing for bulk rentals', icon: DollarSign },
          { title: 'Account Settings', description: 'Update your profile', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const stats = getDashboardStats();
  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 capitalize">
                {user?.role} Dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/profile'}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button
                variant="secondary"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <action.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">{action.title}</h3>
                  <p className="mt-2 text-xs text-gray-600">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Phase 4 Preview */}
        <Card className="p-8">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Coming in Phase 4</h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Product management system, rental workflows, and advanced features will be implemented next. 
              The authentication system is now complete and ready for the next phase of development.
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => window.location.href = '/demo'}
                className="flex items-center space-x-2 mx-auto"
              >
                <Package className="h-4 w-4" />
                <span>View Phase 2 Demo</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
