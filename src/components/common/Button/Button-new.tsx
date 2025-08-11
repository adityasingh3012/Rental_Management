import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'premium';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-95 transform-gpu',
      'font-medium tracking-wide',
    ];

    const variantClasses = {
      primary: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 hover:shadow-lg',
        'focus:ring-primary/50',
        'shadow-md hover:shadow-primary/25',
        'border border-primary/20',
      ],
      secondary: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/80 hover:shadow-md',
        'focus:ring-secondary/50',
        'border border-border',
        'shadow-sm',
      ],
      success: [
        'bg-success text-success-foreground',
        'hover:bg-success/90 hover:shadow-lg',
        'focus:ring-success/50',
        'shadow-md hover:shadow-success/25',
        'border border-success/20',
      ],
      warning: [
        'bg-warning text-warning-foreground',
        'hover:bg-warning/90 hover:shadow-lg',
        'focus:ring-warning/50',
        'shadow-md hover:shadow-warning/25',
        'border border-warning/20',
      ],
      danger: [
        'bg-error text-error-foreground',
        'hover:bg-error/90 hover:shadow-lg',
        'focus:ring-error/50',
        'shadow-md hover:shadow-error/25',
        'border border-error/20',
      ],
      ghost: [
        'bg-transparent text-foreground',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:ring-ring/50',
        'border border-transparent',
      ],
      outline: [
        'bg-transparent border border-primary text-primary',
        'hover:bg-primary hover:text-primary-foreground',
        'focus:ring-primary/50',
        'shadow-sm hover:shadow-md',
      ],
      premium: [
        'bg-gradient-to-r from-primary via-primary/90 to-accent',
        'text-white font-semibold',
        'hover:from-primary/90 hover:via-primary/80 hover:to-accent/90',
        'hover:shadow-xl hover:shadow-primary/30',
        'focus:ring-primary/50',
        'border border-primary/30',
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
      ],
    };

    const sizeClasses = {
      xs: ['px-2 py-1 text-xs', 'gap-1', 'min-h-[1.75rem]'],
      sm: ['px-3 py-1.5 text-sm', 'gap-1.5', 'min-h-[2rem]'],
      md: ['px-4 py-2 text-sm', 'gap-2', 'min-h-[2.5rem]'],
      lg: ['px-6 py-3 text-base', 'gap-2.5', 'min-h-[3rem]'],
      xl: ['px-8 py-4 text-lg', 'gap-3', 'min-h-[3.5rem]'],
    };

    const iconSizeClasses = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    };

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      {
        'w-full': fullWidth,
        'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading,
      },
      className
    );

    const iconClasses = iconSizeClasses[size];

    const LoadingSpinner = ({ className }: { className: string }) => (
      <svg
        className={cn('animate-spin', className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
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

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner className={iconClasses} />
            <span className="sr-only">Loading...</span>
            {size !== 'xs' && <span>Loading...</span>}
          </>
        ) : (
          <>
            {LeftIcon && (
              <LeftIcon 
                className={iconClasses} 
                aria-hidden="true" 
              />
            )}
            <span>{children}</span>
            {RightIcon && (
              <RightIcon 
                className={iconClasses} 
                aria-hidden="true" 
              />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
