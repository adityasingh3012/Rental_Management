import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black bg-opacity-50 backdrop-blur-sm',
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          'bg-white rounded-lg shadow-xl',
          'transform transition-all duration-300 ease-out',
          'max-h-[90vh] overflow-hidden',
          'w-full',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <ModalHeader onClose={onClose} showCloseButton={showCloseButton}>
            <h2 className="text-xl font-semibold text-secondary-900">{title}</h2>
          </ModalHeader>
        )}
        
        {!title && showCloseButton && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-secondary-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-secondary-500" />
            </button>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  onClose,
  showCloseButton = true,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between p-6 border-b border-secondary-200',
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full hover:bg-secondary-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-secondary-500" />
        </button>
      )}
    </div>
  );
};

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={clsx('p-6 overflow-y-auto', className)}>{children}</div>
  );
};

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-end space-x-3 p-6 border-t border-secondary-200 bg-secondary-50',
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component pattern
const ModalWithSubComponents = Modal as typeof Modal & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

ModalWithSubComponents.Header = ModalHeader;
ModalWithSubComponents.Body = ModalBody;
ModalWithSubComponents.Footer = ModalFooter;

export { ModalWithSubComponents as default, Modal, ModalHeader, ModalBody, ModalFooter };
