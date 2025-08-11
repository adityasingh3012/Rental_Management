import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
}

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses = [
      'border rounded-lg transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-secondary-400',
    ];

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const stateClasses = error
      ? [
          'border-red-300 text-red-900',
          'focus:border-red-500 focus:ring-red-500',
          'bg-red-50',
        ]
      : [
          'border-secondary-300 text-secondary-900',
          'focus:border-primary-500 focus:ring-primary-500',
          'bg-white',
        ];

    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const inputClasses = clsx(
      baseClasses,
      sizeClasses[size],
      stateClasses,
      {
        'w-full': fullWidth,
        'pl-10': LeftIcon,
        'pr-10': RightIcon,
      },
      className
    );

    const iconClasses = clsx(
      'absolute top-1/2 transform -translate-y-1/2 text-secondary-400',
      iconSizeClasses[size]
    );

    return (
      <div className={clsx('flex flex-col', { 'w-full': fullWidth })}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LeftIcon className={iconClasses} />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          
          {RightIcon && !error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <RightIcon className={iconClasses} />
            </div>
          )}
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className={clsx(iconClasses, 'text-red-500')} />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="mt-1 text-sm text-secondary-500" id={`${inputId}-hint`}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPasswordToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          showPasswordToggle
            ? () => (
                <button
                  type="button"
                  className="p-1 hover:bg-secondary-100 rounded"
                  onClick={togglePassword}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-secondary-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-secondary-500" />
                  )}
                </button>
              )
            : undefined
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { Input as default, PasswordInput };
