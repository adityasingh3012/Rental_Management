import React from 'react';
import { Wrench, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { Card } from '../../common/Card';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const InventoryManagement: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          Inventory Management
        </h1>
        <p className="text-sm" style={{ color: colors.text.secondary }}>
          Track and manage your rental inventory status
        </p>
      </div>

      {/* Inventory Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.semantic.success[100] }}
              >
                <CheckCircle className="h-5 w-5" style={{ color: colors.semantic.success[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Available</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>156</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.brand.primary[100] }}
              >
                <Package className="h-5 w-5" style={{ color: colors.brand.primary[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Rented Out</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>42</p>
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
                <Wrench className="h-5 w-5" style={{ color: colors.semantic.warning[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Maintenance</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>8</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.semantic.danger[100] }}
              >
                <AlertTriangle className="h-5 w-5" style={{ color: colors.semantic.danger[600] }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: colors.text.secondary }}>Out of Order</p>
                <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>3</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
            Inventory Status Overview
          </h3>
        </Card.Header>
        <Card.Body>
          <p style={{ color: colors.text.secondary }}>
            Detailed inventory management features will be implemented here, including:
          </p>
          <ul className="mt-4 space-y-2" style={{ color: colors.text.secondary }}>
            <li>• Real-time inventory tracking</li>
            <li>• Maintenance scheduling</li>
            <li>• Item condition reports</li>
            <li>• Stock alerts and notifications</li>
            <li>• Return processing</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};
