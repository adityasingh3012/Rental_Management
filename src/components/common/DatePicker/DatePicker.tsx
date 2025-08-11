import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showTime?: boolean;
  minDate?: string;
  maxDate?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = false,
      showTime = false,
      minDate,
      maxDate,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;
    const [isFocused, setIsFocused] = useState(false);

    const baseClasses = [
      'border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400',
      'pr-10', // Space for icon
    ];

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
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
            type={showTime ? 'datetime-local' : 'date'}
            className={inputClasses}
            min={minDate}
            max={maxDate}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {showTime ? (
              <Clock className={cn(
                'h-4 w-4 transition-colors duration-200',
                isFocused ? 'text-primary-500' : 'text-gray-400'
              )} />
            ) : (
              <Calendar className={cn(
                'h-4 w-4 transition-colors duration-200',
                isFocused ? 'text-primary-500' : 'text-gray-400'
              )} />
            )}
          </div>
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

DatePicker.displayName = 'DatePicker';

export default DatePicker;
