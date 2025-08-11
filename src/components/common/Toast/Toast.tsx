import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const IconComponent = icons[toast.type];

  const baseClasses = [
    'relative flex w-full max-w-sm items-center space-x-3 rounded-lg border p-4 shadow-lg',
    'transform transition-all duration-300 ease-in-out',
    'animate-in slide-in-from-right-full',
  ];

  const typeClasses = {
    success: 'bg-white border-green-200 text-green-800',
    error: 'bg-white border-red-200 text-red-800',
    warning: 'bg-white border-yellow-200 text-yellow-800',
    info: 'bg-white border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const toastClasses = cn(baseClasses, typeClasses[toast.type]);

  React.useEffect(() => {
    if (!toast.persistent && toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, toast.persistent, onRemove]);

  return (
    <div className={toastClasses}>
      <div className="flex-shrink-0">
        <IconComponent className={cn('h-5 w-5', iconColors[toast.type])} />
      </div>
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-medium text-gray-900 truncate">
            {toast.title}
          </p>
        )}
        <p className={cn('text-sm text-gray-600', toast.title && 'mt-1')}>
          {toast.message}
        </p>
      </div>
      
      <div className="flex-shrink-0">
        <button
          type="button"
          className="inline-flex rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => onRemove(toast.id)}
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastContainerProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      
      {/* Toast Container */}
      <div
        className="fixed top-4 right-4 z-50 space-y-2"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Helper hooks for different toast types
export const useToastHelpers = () => {
  const { addToast } = useToast();

  return {
    success: (message: string, title?: string, options?: Partial<Toast>) =>
      addToast({ type: 'success', message, title, ...options }),
    
    error: (message: string, title?: string, options?: Partial<Toast>) =>
      addToast({ type: 'error', message, title, ...options }),
    
    warning: (message: string, title?: string, options?: Partial<Toast>) =>
      addToast({ type: 'warning', message, title, ...options }),
    
    info: (message: string, title?: string, options?: Partial<Toast>) =>
      addToast({ type: 'info', message, title, ...options }),
  };
};
