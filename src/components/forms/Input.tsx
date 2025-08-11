import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = `
    w-full px-3 py-2 
    border rounded-lg text-sm 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:bg-gray-700 dark:text-white
  `;

  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600 bg-white',
    error: 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
  };

  return (
    <input
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};