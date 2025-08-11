import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      min-h-screen 
      bg-white dark:bg-dark-900
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};