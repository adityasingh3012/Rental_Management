import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
  roles?: string[]; // Which user roles can see this item
}

export interface SidebarProps {
  items: SidebarItem[];
  userRole?: string;
  isOpen: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  variant?: 'default' | 'floating';
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  userRole,
  isOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
  className,
  variant = 'default',
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isItemVisible = (item: SidebarItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    return userRole && item.roles.includes(userRole);
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    if (!isItemVisible(item)) return null;

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const IconComponent = item.icon;

    const handleClick = () => {
      if (hasChildren) {
        toggleExpanded(item.id);
      } else if (item.onClick) {
        item.onClick();
      } else if (item.href) {
        window.location.href = item.href;
      }
    };

    const itemClasses = cn(
      'group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
      level > 0 && 'ml-4',
      {
        'bg-primary-100 text-primary-900 border-r-2 border-primary-500': item.active,
        'text-gray-700 hover:bg-gray-100 hover:text-gray-900': !item.active,
        'justify-center': collapsed && level === 0,
        'cursor-pointer': hasChildren || item.onClick || item.href,
      }
    );

    return (
      <div key={item.id}>
        <button
          onClick={handleClick}
          className={itemClasses}
          title={collapsed ? item.label : undefined}
        >
          {IconComponent && (
            <IconComponent 
              className={cn(
                'flex-shrink-0 w-5 h-5',
                collapsed ? '' : 'mr-3',
                item.active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
              )} 
            />
          )}
          
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              
              {item.badge && (
                <span className={cn(
                  'ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full',
                  item.active 
                    ? 'bg-primary-200 text-primary-800' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                )}>
                  {item.badge}
                </span>
              )}
              
              {hasChildren && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              )}
            </>
          )}
        </button>

        {/* Submenu */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarClasses = cn(
    'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
    {
      // Desktop styles when closed
      'hidden lg:flex': !isOpen,
      
      // Width based on collapsed state
      'w-64': !collapsed && !isOpen, // Desktop normal width when closed
      'w-16': collapsed && !isOpen,  // Desktop collapsed width when closed
      
      // Mobile styles when open
      'fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto w-64': isOpen,
      
      // Variant styles
      'shadow-lg lg:shadow-none': variant === 'floating' || isOpen,
    },
    className
  );

  const contentClasses = cn(
    'flex-1 flex flex-col min-h-0',
    {
      'px-2 py-4': true,
      'items-center': collapsed,
    }
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Mobile close button */}
        {isOpen && onClose && (
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="rounded-md p-2 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Sidebar content */}
        <div className={contentClasses}>
          <nav className="flex-1 space-y-2">
            {items.map(item => renderSidebarItem(item))}
          </nav>

          {/* Collapse toggle for desktop */}
          {onToggleCollapse && (
            <div className="hidden lg:block mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={onToggleCollapse}
                className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 rotate-90" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Default navigation items for rental management
export const defaultSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/',
    active: true,
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    children: [
      { id: 'all-products', label: 'All Products', href: '/products' },
      { id: 'add-product', label: 'Add Product', href: '/products/new' },
      { id: 'categories', label: 'Categories', href: '/products/categories' },
    ],
  },
  {
    id: 'rentals',
    label: 'Rentals',
    icon: CreditCard,
    children: [
      { id: 'active-rentals', label: 'Active Rentals', href: '/rentals/active', badge: 5 },
      { id: 'rental-history', label: 'History', href: '/rentals/history' },
      { id: 'new-rental', label: 'New Rental', href: '/rentals/new' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    href: '/customers',
    roles: ['admin', 'staff'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    roles: ['admin'],
  },
];

export default Sidebar;
