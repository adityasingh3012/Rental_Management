import React from 'react';
import { clsx } from 'clsx';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export interface LoadingDotsProps {
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
  };

  return (
    <svg
      className={clsx(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const LoadingDots: React.FC<LoadingDotsProps> = ({
  color = 'primary',
  className,
}) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    white: 'bg-white',
  };

  return (
    <div className={clsx('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={clsx(
            'h-2 w-2 rounded-full animate-pulse',
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '0.8s',
          }}
        />
      ))}
    </div>
  );
};

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  className,
}) => {
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={clsx(
        'bg-secondary-200 animate-pulse',
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
};

// Full page loading component
export interface FullPageLoadingProps {
  message?: string;
  showSpinner?: boolean;
}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({
  message = 'Loading...',
  showSpinner = true,
}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        {showSpinner && (
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
        )}
        <p className="text-lg text-secondary-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

// Inline loading component
export interface InlineLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const InlineLoading: React.FC<InlineLoadingProps> = ({
  size = 'md',
  message,
  className,
}) => {
  return (
    <div className={clsx('flex items-center justify-center p-4', className)}>
      <LoadingSpinner size={size} className="mr-2" />
      {message && (
        <span className="text-secondary-600 font-medium">{message}</span>
      )}
    </div>
  );
};

// Loading overlay for containers
export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  children,
  className,
}) => {
  return (
    <div className={clsx('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-2" />
            <p className="text-secondary-600 font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export {
  LoadingSpinner,
  LoadingDots,
  LoadingSkeleton,
  FullPageLoading,
  InlineLoading,
  LoadingOverlay,
};
