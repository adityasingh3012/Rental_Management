import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error';
}

export const Textarea: React.FC<TextareaProps> = ({
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
    resize-vertical
  `;

  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600 bg-white',
    error: 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
  };

  return (
    <textarea
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};