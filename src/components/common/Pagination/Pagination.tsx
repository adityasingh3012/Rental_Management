import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Button from '../Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  boundaryCount = 1,
  size = 'md',
  className,
  disabled = false,
}) => {
  // Generate page numbers to display
  const generatePageNumbers = (): (number | string)[] => {
    const range = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, totalPages));
    const endPages = range(
      Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
      totalPages
    );

    const siblingsStart = Math.max(
      Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
    );

    const pages: (number | string)[] = [];

    // Add start pages
    pages.push(...startPages);

    // Add gap before siblings if needed
    if (siblingsStart > boundaryCount + 2) {
      pages.push('start-ellipsis');
    } else if (boundaryCount + 1 < siblingsStart - 1) {
      pages.push(boundaryCount + 1);
    }

    // Add sibling pages
    if (siblingsStart <= siblingsEnd) {
      pages.push(...range(siblingsStart, siblingsEnd));
    }

    // Add gap after siblings if needed
    if (siblingsEnd < totalPages - boundaryCount - 1) {
      pages.push('end-ellipsis');
    } else if (siblingsEnd + 1 < totalPages - boundaryCount) {
      pages.push(siblingsEnd + 1);
    }

    // Add end pages
    pages.push(...endPages);

    return Array.from(new Set(pages)); // Remove duplicates
  };

  const pages = generatePageNumbers();

  const buttonSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  } as const;

  const renderPageButton = (page: number | string, index: number) => {
    if (typeof page === 'string') {
      return (
        <span
          key={index}
          className="flex items-center justify-center px-2"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </span>
      );
    }

    const isActive = page === currentPage;

    return (
      <Button
        key={page}
        variant={isActive ? 'primary' : 'ghost'}
        size={buttonSize[size]}
        onClick={() => onPageChange(page)}
        disabled={disabled}
        className={cn(
          'min-w-[2.5rem]',
          !isActive && 'hover:bg-gray-100'
        )}
      >
        {page}
      </Button>
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={cn('flex items-center justify-center space-x-1', className)}
      aria-label="Pagination"
    >
      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(1)}
          disabled={disabled || currentPage === 1}
          className="hover:bg-gray-100"
        >
          First
        </Button>
      )}

      {showPrevNext && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className="hover:bg-gray-100"
          leftIcon={ChevronLeft}
        >
          Previous
        </Button>
      )}

      <div className="flex items-center space-x-1">
        {pages.map((page, index) => renderPageButton(page, index))}
      </div>

      {showPrevNext && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          className="hover:bg-gray-100"
          rightIcon={ChevronRight}
        >
          Next
        </Button>
      )}

      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          className="hover:bg-gray-100"
        >
          Last
        </Button>
      )}
    </nav>
  );
};

// Simple pagination info component
export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn('text-sm text-gray-700', className)}>
      Showing <span className="font-medium">{startItem}</span> to{' '}
      <span className="font-medium">{endItem}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </div>
  );
};

export default Pagination;
