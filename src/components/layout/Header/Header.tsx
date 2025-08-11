import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import Button from '../../common/Button';
import { ThemeToggle } from '../../common/ThemeToggle';

export interface HeaderProps {
  logo?: {
    src?: string;
    text?: string;
    href?: string;
    onClick?: () => void;
  };
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notifications?: {
    count: number;
    onClick?: () => void;
  };
  onMenuToggle?: () => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  logo = { text: 'RentalApp' },
  user,
  notifications,
  onMenuToggle,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  className,
  fixed = true,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleLogoClick = () => {
    if (logo.onClick) {
      logo.onClick();
    } else if (logo.href) {
      window.location.href = logo.href;
    }
  };

  const headerClasses = cn(
    'bg-background border-b border-border shadow-soft',
    'transition-colors duration-200',
    fixed && 'fixed top-0 left-0 right-0 z-40',
    className
  );

  return (
    <header className={headerClasses}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt="Logo"
                  className="h-8 w-auto"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-medium">
                    <span className="text-primary-foreground font-bold text-sm">R</span>
                  </div>
                  {logo.text && (
                    <span className="text-xl font-bold text-foreground hidden sm:block">
                      {logo.text}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center section - Search */}
          {showSearch && (
            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-input bg-background py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle size="sm" />

            {/* Mobile search button */}
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Notifications */}
            {notifications && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={notifications.onClick}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.count > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-error-foreground bg-error rounded-full min-w-[1.25rem] h-5 shadow-md">
                      {notifications.count > 99 ? '99+' : notifications.count}
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* User menu */}
            {user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-accent/50"
                >
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center border border-border">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-foreground">
                        {user.name}
                      </div>
                      {user.role && (
                        <div className="text-xs text-muted-foreground">
                          {user.role}
                        </div>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </Button>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </button>
                    
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                    
                    <hr className="my-1" />
                    
                    <button className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
