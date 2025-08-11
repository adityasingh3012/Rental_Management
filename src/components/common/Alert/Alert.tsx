import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  icon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  closable = false,
  onClose,
  className,
  icon = true,
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const IconComponent = icons[variant];

  const baseClasses = [
    'relative rounded-lg border p-4',
    'transition-all duration-200',
  ];

  const variantClasses = {
    success: [
      'bg-green-50 border-green-200 text-green-800',
      'dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    ],
    error: [
      'bg-red-50 border-red-200 text-red-800',
      'dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    ],
    warning: [
      'bg-yellow-50 border-yellow-200 text-yellow-800',
      'dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    ],
    info: [
      'bg-blue-50 border-blue-200 text-blue-800',
      'dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    ],
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  };

  const alertClasses = cn(
    baseClasses,
    variantClasses[variant],
    className
  );

  return (
    <div className={alertClasses} role="alert">
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0">
            <IconComponent 
              className={cn('h-5 w-5', iconColors[variant])} 
              aria-hidden="true" 
            />
          </div>
        )}
        
        <div className={cn('flex-1', icon && 'ml-3')}>
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          
          <div className={cn('text-sm', title && 'mt-1')}>
            {children}
          </div>
        </div>
        
        {closable && onClose && (
          <div className="flex-shrink-0 ml-3">
            <button
              type="button"
              className={cn(
                'inline-flex rounded-md p-1.5',
                'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                variant === 'success' && 'text-green-500 hover:bg-green-100 focus:ring-green-600',
                variant === 'error' && 'text-red-500 hover:bg-red-100 focus:ring-red-600',
                variant === 'warning' && 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600',
                variant === 'info' && 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
              )}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
