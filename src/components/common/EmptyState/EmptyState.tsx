import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Button from '../Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  illustration?: string; // URL to illustration image
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: IconComponent,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
  illustration,
}) => {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'w-12 h-12',
      title: 'text-lg',
      description: 'text-sm',
      spacing: 'space-y-3',
    },
    md: {
      container: 'py-12',
      icon: 'w-16 h-16',
      title: 'text-xl',
      description: 'text-base',
      spacing: 'space-y-4',
    },
    lg: {
      container: 'py-16',
      icon: 'w-20 h-20',
      title: 'text-2xl',
      description: 'text-lg',
      spacing: 'space-y-6',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      currentSize.container,
      currentSize.spacing,
      className
    )}>
      {/* Icon or Illustration */}
      <div className="flex-shrink-0">
        {illustration ? (
          <img
            src={illustration}
            alt=""
            className={cn('mx-auto', currentSize.icon)}
          />
        ) : IconComponent ? (
          <IconComponent 
            className={cn(
              'mx-auto text-gray-400',
              currentSize.icon
            )} 
          />
        ) : (
          <div className={cn(
            'mx-auto rounded-full bg-gray-100 flex items-center justify-center',
            currentSize.icon
          )}>
            <svg
              className={cn('text-gray-400', size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-sm mx-auto">
        <h3 className={cn(
          'font-semibold text-gray-900',
          currentSize.title
        )}>
          {title}
        </h3>
        
        {description && (
          <p className={cn(
            'text-gray-500 mt-2',
            currentSize.description
          )}>
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <Button
              variant={action.variant || 'primary'}
              onClick={action.onClick}
              size={size}
            >
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
              size={size}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
