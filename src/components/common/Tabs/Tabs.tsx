import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  variant: 'default' | 'pills' | 'underline';
  size: 'sm' | 'md' | 'lg';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs container
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const activeTab = value !== undefined ? value : internalValue;
  
  const handleTabChange = (tabId: string) => {
    if (value === undefined) {
      setInternalValue(tabId);
    }
    onValueChange?.(tabId);
  };

  return (
    <TabsContext.Provider 
      value={{ 
        activeTab, 
        setActiveTab: handleTabChange, 
        variant, 
        size 
      }}
    >
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tab List container
export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  justify?: 'start' | 'center' | 'end' | 'between';
}

const TabList: React.FC<TabListProps> = ({ 
  children, 
  className,
  justify = 'start'
}) => {
  const { variant } = useTabs();

  const baseClasses = 'flex';
  
  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'bg-gray-100 p-1 rounded-lg',
    underline: 'border-b border-gray-200',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        justifyClasses[justify],
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
};

// Individual Tab trigger
export interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  badge?: string | number;
  icon?: React.ComponentType<{ className?: string }>;
}

const TabTrigger: React.FC<TabTriggerProps> = ({
  value,
  children,
  disabled = false,
  className,
  badge,
  icon: IconComponent,
}) => {
  const { activeTab, setActiveTab, variant, size } = useTabs();
  
  const isActive = activeTab === value;

  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    default: {
      base: 'border-b-2 -mb-px',
      active: 'border-primary-500 text-primary-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    pills: {
      base: 'rounded-md',
      active: 'bg-white text-primary-600 shadow-sm',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-white/50',
    },
    underline: {
      base: 'border-b-2 -mb-px',
      active: 'border-primary-500 text-primary-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700',
    },
  };

  const currentVariant = variantClasses[variant];
  const stateClasses = isActive ? currentVariant.active : currentVariant.inactive;

  const tabClasses = cn(
    baseClasses,
    sizeClasses[size],
    currentVariant.base,
    stateClasses,
    className
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      className={tabClasses}
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
    >
      {IconComponent && (
        <IconComponent className={cn(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3 mr-1.5' : 
          size === 'md' ? 'w-4 h-4 mr-2' : 
          'w-5 h-5 mr-2'
        )} />
      )}
      
      <span>{children}</span>
      
      {badge && (
        <span className={cn(
          'ml-2 inline-flex items-center justify-center',
          'rounded-full text-xs font-medium',
          size === 'sm' ? 'px-1.5 py-0.5 min-w-[1rem] h-4' :
          size === 'md' ? 'px-2 py-0.5 min-w-[1.25rem] h-5' :
          'px-2.5 py-1 min-w-[1.5rem] h-6',
          isActive 
            ? 'bg-primary-100 text-primary-700' 
            : 'bg-gray-100 text-gray-600'
        )}>
          {badge}
        </span>
      )}
    </button>
  );
};

// Tab content panel
export interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  forceMount?: boolean;
}

const TabContent: React.FC<TabContentProps> = ({
  value,
  children,
  className,
  forceMount = false,
}) => {
  const { activeTab } = useTabs();
  
  const isActive = activeTab === value;

  if (!isActive && !forceMount) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        'focus:outline-none',
        !isActive && 'hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

// Export compound component
export default Object.assign(Tabs, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});
