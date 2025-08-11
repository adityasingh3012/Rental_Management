import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  onHomeClick?: () => void;
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  homeHref = '/',
  onHomeClick,
  separator,
  className,
}) => {
  const DefaultSeparator = separator || <ChevronRight className="w-4 h-4 text-gray-400" />;

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
    const baseClasses = [
      'text-sm font-medium transition-colors duration-150',
      'hover:text-primary-600 focus:outline-none focus:underline',
    ];

    const stateClasses = item.current || isLast
      ? 'text-gray-900 cursor-default'
      : 'text-gray-500 hover:text-gray-700 cursor-pointer';

    const itemClasses = cn(baseClasses, stateClasses);

    const content = (
      <span className={itemClasses}>
        {item.label}
      </span>
    );

    if (item.current || isLast) {
      return content;
    }

    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={item.onClick}
          className={itemClasses}
        >
          {item.label}
        </button>
      );
    }

    if (item.href) {
      return (
        <a href={item.href} className={itemClasses}>
          {item.label}
        </a>
      );
    }

    return content;
  };

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {showHome && (
          <li>
            <div className="flex items-center">
              {onHomeClick ? (
                <button
                  type="button"
                  onClick={onHomeClick}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
                >
                  <span className="sr-only">Home</span>
                  <Home className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={homeHref}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
                >
                  <span className="sr-only">Home</span>
                  <Home className="w-4 h-4" />
                </a>
              )}
            </div>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showSeparator = showHome || index > 0;

          return (
            <li key={index} className="flex items-center">
              {showSeparator && (
                <div className="mr-2">
                  {DefaultSeparator}
                </div>
              )}
              {renderItem(item, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
