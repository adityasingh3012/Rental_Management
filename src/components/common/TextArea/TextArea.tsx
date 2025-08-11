import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../utils/cn';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  autoResize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = false,
      autoResize = false,
      maxLength,
      showCharCount = false,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const currentLength = typeof value === 'string' ? value.length : 0;

    const baseClasses = [
      'border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400',
      'resize-none',
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

    const textareaClasses = cn(
      baseClasses,
      sizeClasses[size],
      stateClasses,
      widthClasses,
      autoResize && 'resize-none',
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
      
      if (autoResize) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
      if (autoResize && ref && 'current' in ref && ref.current) {
        const textarea = ref.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize, ref]);

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />

        <div className="flex justify-between items-center mt-1">
          <div>
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {error}
              </p>
            )}
            
            {hint && !error && (
              <p className="text-sm text-gray-500">{hint}</p>
            )}
          </div>
          
          {showCharCount && maxLength && (
            <p className={cn(
              'text-xs',
              currentLength > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-400',
              currentLength >= maxLength ? 'text-red-500' : ''
            )}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
