import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import Header, { HeaderProps } from '../Header';
import Sidebar, { SidebarProps, defaultSidebarItems } from '../Sidebar';
import Footer, { FooterProps } from '../Footer';

export interface LayoutProps {
  children: React.ReactNode;
  header?: Partial<HeaderProps> | false;
  sidebar?: Partial<SidebarProps> | false;
  footer?: Partial<FooterProps> | false;
  className?: string;
  contentClassName?: string;
  variant?: 'default' | 'fullscreen' | 'centered';
  showLoadingOverlay?: boolean;
  loadingMessage?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header = {},
  sidebar = {},
  footer = {},
  className,
  contentClassName,
  variant = 'default',
  showLoadingOverlay = false,
  loadingMessage = 'Loading...',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const showHeader = header !== false;
  const showSidebar = sidebar !== false && variant !== 'fullscreen';
  const showFooter = footer !== false && variant !== 'fullscreen';

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Default props for components
  const defaultHeaderProps: Partial<HeaderProps> = {
    onMenuToggle: handleMenuToggle,
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    },
    notifications: {
      count: 3,
    },
    ...header,
  };

  const defaultSidebarProps: Partial<SidebarProps> = {
    items: defaultSidebarItems,
    isOpen: isSidebarOpen,
    onClose: handleSidebarClose,
    collapsed: isSidebarCollapsed,
    onToggleCollapse: handleSidebarToggleCollapse,
    userRole: 'admin',
    ...sidebar,
  };

  const defaultFooterProps: Partial<FooterProps> = {
    variant: 'minimal',
    ...footer,
  };

  const layoutClasses = cn(
    'min-h-screen flex flex-col bg-gray-50',
    className
  );

  const contentWrapperClasses = cn(
    'flex flex-1',
    showHeader && 'pt-16', // Account for fixed header
  );

  const mainContentClasses = cn(
    'flex-1 flex flex-col min-w-0',
    {
      // Default layout with sidebar
      'lg:ml-64': showSidebar && !isSidebarCollapsed && variant === 'default',
      'lg:ml-16': showSidebar && isSidebarCollapsed && variant === 'default',
      
      // Centered layout
      'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': variant === 'centered',
      
      // Fullscreen layout
      'w-full': variant === 'fullscreen',
    }
  );

  const contentClasses = cn(
    'flex-1 p-6',
    {
      'p-0': variant === 'fullscreen',
      'py-8': variant === 'centered',
    },
    contentClassName
  );

  return (
    <div className={layoutClasses}>
      {/* Header */}
      {showHeader && <Header {...(defaultHeaderProps as HeaderProps)} />}

      <div className={contentWrapperClasses}>
        {/* Sidebar */}
        {showSidebar && <Sidebar {...(defaultSidebarProps as SidebarProps)} />}

        {/* Main content area */}
        <main className={mainContentClasses}>
          <div className={contentClasses}>
            {children}
          </div>

          {/* Footer */}
          {showFooter && <Footer {...(defaultFooterProps as FooterProps)} />}
        </main>
      </div>

      {/* Loading overlay */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="text-sm text-gray-600">{loadingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Specialized layout components for different contexts
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout
    sidebar={{
      userRole: 'admin',
      items: defaultSidebarItems,
    }}
    header={{
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Administrator',
      },
    }}
  >
    {children}
  </Layout>
);

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout
    sidebar={{
      userRole: 'customer',
      items: defaultSidebarItems.filter(item => 
        !item.roles || item.roles.includes('customer')
      ),
    }}
    header={{
      user: {
        name: 'Customer User',
        email: 'customer@example.com',
        role: 'Customer',
      },
    }}
  >
    {children}
  </Layout>
);

export const StaffLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout
    sidebar={{
      userRole: 'staff',
      items: defaultSidebarItems.filter(item => 
        !item.roles || item.roles.includes('staff')
      ),
    }}
    header={{
      user: {
        name: 'Staff Member',
        email: 'staff@example.com',
        role: 'Staff',
      },
    }}
  >
    {children}
  </Layout>
);

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout
    variant="centered"
    header={false}
    sidebar={false}
    footer={{ variant: 'minimal' }}
    className="bg-gray-100"
  >
    {children}
  </Layout>
);

export default Layout;
