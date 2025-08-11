import React from 'react';
import { 
  DocumentTextIcon, 
  TruckIcon, 
  PrinterIcon,
  ArrowPathIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { RentalStatus } from '../../types/rental';

interface RentalOrderActionsProps {
  rentalStatus: RentalStatus;
  onCreateInvoice: () => void;
  onCreateDelivery: () => void;
  onCreatePickup: () => void;
  onPrint: () => void;
  onConvertToQuotation: () => void;
  onConvertToRentalOrder: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const RentalOrderActions: React.FC<RentalOrderActionsProps> = ({
  rentalStatus,
  onCreateInvoice,
  onCreateDelivery,
  onCreatePickup,
  onPrint,
  onConvertToQuotation,
  onConvertToRentalOrder,
  loading = false,
  disabled = false
}) => {
  const getAvailableActions = () => {
    const actions = [];

    // Always available actions
    actions.push({
      id: 'print',
      label: 'Print',
      icon: PrinterIcon,
      onClick: onPrint,
      variant: 'outline' as const
    });

    // Status-specific actions
    if (rentalStatus === 'quotation') {
      actions.push({
        id: 'convert-rental',
        label: 'Rental Order',
        icon: ArrowPathIcon,
        onClick: onConvertToRentalOrder,
        variant: 'primary' as const
      });
    }

    if (rentalStatus === 'reserved' || rentalStatus === 'pickedup') {
      actions.push({
        id: 'create-invoice',
        label: 'Invoice',
        icon: CurrencyDollarIcon,
        onClick: onCreateInvoice,
        variant: 'secondary' as const
      });
    }

    if (rentalStatus === 'reserved') {
      actions.push({
        id: 'create-delivery',
        label: '📦 Delivery',
        icon: TruckIcon,
        onClick: onCreateDelivery,
        variant: 'outline' as const,
        special: true
      });
    }

    if (rentalStatus === 'pickedup') {
      actions.push({
        id: 'create-pickup',
        label: 'Pickup',
        icon: TruckIcon,
        onClick: onCreatePickup,
        variant: 'outline' as const
      });
    }

    // Conversion actions
    if (rentalStatus !== 'quotation') {
      actions.push({
        id: 'convert-quotation',
        label: 'Quotation',
        icon: DocumentTextIcon,
        onClick: onConvertToQuotation,
        variant: 'outline' as const
      });
    }

    return actions;
  };

  const actions = getAvailableActions();

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            onClick={action.onClick}
            variant={action.variant}
            disabled={disabled || loading}
            loading={loading}
            size="sm"
            className={action.special ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' : ''}
          >
            {typeof action.label === 'string' && action.label.includes('📦') ? (
              <>
                <span className="mr-1">📦</span>
                Delivery
              </>
            ) : (
              <>
                <Icon className="w-4 h-4 mr-1" />
                {action.label}
              </>
            )}
          </Button>
        );
      })}
    </div>
  );
};