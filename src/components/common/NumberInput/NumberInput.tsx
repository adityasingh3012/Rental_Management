import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showControls?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = false,
      showControls = true,
      min = 0,
      max,
      step = 1,
      precision = 0,
      className,
      id,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
  const inputId = id || `number-input-${Math.random().toString(36).substr(2, 9)}`;    const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : (value as number) || 0;

    const baseClasses = [
      'border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400',
      'text-center',
    ];

    const sizeClasses = {
      sm: showControls ? 'px-8 py-1.5 text-sm' : 'px-3 py-1.5 text-sm',
      md: showControls ? 'px-10 py-2 text-sm' : 'px-4 py-2 text-sm',
      lg: showControls ? 'px-12 py-3 text-base' : 'px-4 py-3 text-base',
    };

    const stateClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400';

    const widthClasses = fullWidth ? 'w-full' : 'w-auto';

    const inputClasses = cn(
      baseClasses,
      sizeClasses[size],
      stateClasses,
      widthClasses,
      className
    );

    const formatValue = (val: number): string => {
      return precision > 0 ? val.toFixed(precision) : val.toString();
    };

    const handleIncrement = () => {
      if (disabled) return;
      const newValue = Math.min(currentValue + step, max ?? Infinity);
      const event = {
        target: { value: formatValue(newValue) }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const handleDecrement = () => {
      if (disabled) return;
      const newValue = Math.max(currentValue - step, min);
      const event = {
        target: { value: formatValue(newValue) }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numValue = parseFloat(inputValue);
      
      if (inputValue === '' || (!isNaN(numValue) && numValue >= min && (max === undefined || numValue <= max))) {
        onChange?.(e);
      }
    };

    const buttonSize = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    };

    const iconSize = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="number"
            className={inputClasses}
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            {...props}
          />
          
          {showControls && (
            <>
              <button
                type="button"
                className={cn(
                  'absolute left-1 top-1/2 -translate-y-1/2',
                  'flex items-center justify-center',
                  'rounded-md border border-gray-300 bg-white',
                  'hover:bg-gray-50 active:bg-gray-100',
                  'transition-colors duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  buttonSize[size]
                )}
                onClick={handleDecrement}
                disabled={disabled || currentValue <= min}
                tabIndex={-1}
              >
                <Minus className={iconSize[size]} />
              </button>
              
              <button
                type="button"
                className={cn(
                  'absolute right-1 top-1/2 -translate-y-1/2',
                  'flex items-center justify-center',
                  'rounded-md border border-gray-300 bg-white',
                  'hover:bg-gray-50 active:bg-gray-100',
                  'transition-colors duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  buttonSize[size]
                )}
                onClick={handleIncrement}
                disabled={disabled || (max !== undefined && currentValue >= max)}
                tabIndex={-1}
              >
                <Plus className={iconSize[size]} />
              </button>
            </>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span className="text-red-500">•</span>
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
