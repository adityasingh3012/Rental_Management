import React from 'react';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card } from '../../common/Card';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const AdminDashboard: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          Admin Dashboard
        </h1>
        <p className="text-sm" style={{ color: colors.text.secondary }}>
          Overview of your rental business operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.brand.primary[100] }}
              >
                <DollarSign className="h-5 w-5" style={{ color: colors.brand.primary[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Total Revenue</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>$24,580</p>
                <p className="text-xs" style={{ color: colors.semantic.success[600] }}>+12% from last month</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.semantic.success[100] }}
              >
                <Users className="h-5 w-5" style={{ color: colors.semantic.success[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Active Customers</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>342</p>
                <p className="text-xs" style={{ color: colors.semantic.success[600] }}>+8% from last month</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.semantic.warning[100] }}
              >
                <Package className="h-5 w-5" style={{ color: colors.semantic.warning[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Active Rentals</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>67</p>
                <p className="text-xs" style={{ color: colors.semantic.success[600] }}>+15% from last month</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.brand.accent[100] }}
              >
                <TrendingUp className="h-5 w-5" style={{ color: colors.brand.accent[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Utilization Rate</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>78%</p>
                <p className="text-xs" style={{ color: colors.semantic.success[600] }}>+5% from last month</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              Recent Activity
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.success[100] }}
                >
                  <CheckCircle className="h-4 w-4" style={{ color: colors.semantic.success[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    New rental confirmed
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Audio equipment rented by John Doe - 2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.brand.primary[100] }}
                >
                  <Package className="h-4 w-4" style={{ color: colors.brand.primary[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Equipment returned
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    LED kit returned by Sarah Wilson - 4 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.warning[100] }}
                >
                  <AlertCircle className="h-4 w-4" style={{ color: colors.semantic.warning[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Overdue return alert
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Camera equipment overdue from Mike Johnson - 6 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.info[100] }}
                >
                  <Users className="h-4 w-4" style={{ color: colors.semantic.info[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    New customer registration
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Emma Thompson joined the platform - 8 hours ago
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              Upcoming Tasks
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.warning[100] }}
                >
                  <Clock className="h-4 w-4" style={{ color: colors.semantic.warning[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Pickup scheduled
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Collect lighting equipment from downtown - Today 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.brand.primary[100] }}
                >
                  <Calendar className="h-4 w-4" style={{ color: colors.brand.primary[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Delivery scheduled
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Deliver audio setup to City Hall - Tomorrow 9:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.info[100] }}
                >
                  <Package className="h-4 w-4" style={{ color: colors.semantic.info[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Equipment maintenance
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Monthly service for camera equipment - Tomorrow 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.semantic.success[100] }}
                >
                  <CheckCircle className="h-4 w-4" style={{ color: colors.semantic.success[600] }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    Inventory audit
                  </p>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    Weekly inventory check - Friday 10:00 AM
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
            Quick Actions
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="p-4 rounded-lg border-2 border-dashed hover:bg-opacity-50 transition-colors"
              style={{ 
                borderColor: colors.border.secondary,
                color: colors.text.primary
              }}
            >
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Product</p>
            </button>

            <button 
              className="p-4 rounded-lg border-2 border-dashed hover:bg-opacity-50 transition-colors"
              style={{ 
                borderColor: colors.border.secondary,
                color: colors.text.primary
              }}
            >
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Manage Users</p>
            </button>

            <button 
              className="p-4 rounded-lg border-2 border-dashed hover:bg-opacity-50 transition-colors"
              style={{ 
                borderColor: colors.border.secondary,
                color: colors.text.primary
              }}
            >
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">View Calendar</p>
            </button>

            <button 
              className="p-4 rounded-lg border-2 border-dashed hover:bg-opacity-50 transition-colors"
              style={{ 
                borderColor: colors.border.secondary,
                color: colors.text.primary
              }}
            >
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">View Reports</p>
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
